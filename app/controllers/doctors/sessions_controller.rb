class Doctors::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]
  before_action :require_patient_or_doctor_signed_out!, only: [:new, :create]
  skip_before_action :verify_authenticity_token, only: [:create,:destroy]
  respond_to :json
  require 'jwt'

  def new
    super
  end
  # POST /resource/sign_in
  def create
    # Find the user by email
    doctor = Doctor.find_by(email: params[:doctor][:email])

    if doctor && doctor.valid_password?(params[:doctor][:password])
      user = User.find_by(doctor_id: doctor.id)
      if user && user.doctor?
        jwt_token = JWT.encode({ doctor_id: doctor.id }, Rails.application.secrets.secret_key_base)
        sign_in(user)
        respond_to do |format|
          format.html { redirect_to authenticated_doctor_root_path}
          format.json { render json: {  access_token: jwt_token, doctor_id: doctor.id ,doctor_name: doctor.name,
          doctor_email: doctor.email, doctor_phone: doctor.phone_number,doctor_speciality: doctor.specialite,
          doctor_address: doctor.address}, status: :ok}
        end
      else
        flash.now[:alert] = "Invalid email or password"
        render :new
      end
    else
      # Initialize a new Doctor object to prevent the form_for helper from raising an error
      @doctor = Doctor.new(doctor_params)
      flash.now[:alert] = "Invalid email or password"
      render :new
    end
  end





  def destroy
    sign_out(current_doctor)
    redirect_to new_doctor_session_path
  end

  protected



  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end
  def authenticate_user!()
    token = request.headers['Authorization']&.split(' ')&.last
    if token
      begin
        payload = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
        user_id = payload['doctor_id']
        user = User.find_by(doctor_id: user_id)
        if user
          sign_in(user)
          doctor_data = {
            user_id: patient.id,
            user_name: patient.name,
            user_email: patient.email,
            user_role: patient.phone_number
          }
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
  private

  def doctor_params
    params.require(:doctor).permit(:email, :password)
  end

end
