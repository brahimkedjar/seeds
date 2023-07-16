class Patients::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]
  before_action :require_patient_or_doctor_signed_out!, only: [:new, :create]
  skip_before_action :verify_authenticity_token, only: [:create,:destroy]
  respond_to :json
  require 'jwt'

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  def create
    user_data = {}

    patient = Patient.find_by(email: params[:patient][:email])
    if patient && patient.valid_password?(params[:patient][:password])
      user = User.find_by(patient_id: patient.id)
      if user && user.patient?
        jwt_token = JWT.encode({ patient_id: patient.id }, Rails.application.secrets.secret_key_base)
        sign_in(user)
        user_data = {
          user_id: patient.id,
          user_name: patient.name,
          user_email: patient.email,
          user_role: patient.phone_number
        }
        respond_to do |format|
          format.html { redirect_to authenticated_patient_root_path }
          format.json { render json: {  access_token: jwt_token, patient_id: patient.id, patient_name: patient.name,
            patient_email: patient.email, patient_phone: patient.phone_number, patient_baladia: patient.baladia,
            patient_group: patient.group_id, user_data: user_data }, status: :ok}
        end
      else
        flash.now[:alert] = "Invalid email or password"
        render :new
      end
    else
      # Initialize a new Patient object to prevent the form_for helper from raising an error
      @patient = Patient.new(patient_params)
      flash.now[:alert] = "Invalid email or password"
      render :new
    end
  end



  def destroy
    sign_out(current_patient)
    redirect_to new_patient_session_path
  end

  protected

  def authenticate_user!()
    token = request.headers['Authorization']&.split(' ')&.last
    if token
      begin
        payload = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
        user_id = payload['patient_id']
        user = User.find_by(patient_id: user_id)
        if user
          sign_in(user)
          session[:access_token] = token
        else
          render json: { error: 'Invalid access token' }, status: :unauthorized
        end
      rescue JWT::DecodeError
        render json: { error: 'Invalid access token' }, status: :unauthorized
      end
    else
      render json: { error: 'Missing access token' }, status: :unauthorized
    end
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end
  private

  def patient_params
    params.require(:patient).permit(:email, :password)
  end

end
