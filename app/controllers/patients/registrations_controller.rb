class Patients::RegistrationsController < Devise::RegistrationsController
  before_action :require_patient_or_doctor_signed_out!
  protect_from_forgery with: :null_session
  respond_to :json

  def new
    @controller_name = "patients"
    @selected_wilaya = [
      'Adrar' ,
      'Chlef' ,
      'Laghouat' ,
      'Oum El Bouaghi' ,
      'Batna' ,
      'Béjaïa' ,
      'Biskra' ,
      'Béchar' ,
      'Blida' ,
      'Bouira' ,
      'Tamanrasset' ,
      'Tébessa' ,
      'Tlemcen' ,
      'Tiaret' ,
      'Tizi Ouzou' ,
      'Alger' ,
      'Djelfa' ,
      'Jijel' ,
      'Sétif' ,
      'Saïda' ,
      'Skikda' ,
      'Sidi Bel Abbès' ,
      'Annaba' ,
      'Guelma' ,
      'Constantine' ,
      'Médéa' ,
      'Mostaganem' ,
      'M\'Sila' ,
      'Mascara' ,
      'Ouargla' ,
      'Oran' ,
      'El Bayadh' ,
      'Illizi' ,
      'Bordj Bou Arréridj' ,
      'Boumerdès' ,
      'El Tarf' ,
      'Tindouf' ,
      'Tissemsilt' ,
      'El Oued' ,
      'Khenchela' ,
      'Souk Ahras' ,
      'Tipaza' ,
      'Mila' ,
      'Aïn Defla' ,
      'Naâma' ,
      'Aïn Témouchent' ,
      'Ghardaïa' ,
      'Relizane'
   ]
      super
  end

  def create
    @selected_wilaya = [
      'Adrar' ,
      'Chlef' ,
      'Laghouat' ,
      'Oum El Bouaghi' ,
      'Batna' ,
      'Béjaïa' ,
      'Biskra' ,
      'Béchar' ,
      'Blida' ,
      'Bouira' ,
      'Tamanrasset' ,
      'Tébessa' ,
      'Tlemcen' ,
      'Tiaret' ,
      'Tizi Ouzou' ,
      'Alger' ,
      'Djelfa' ,
      'Jijel' ,
      'Sétif' ,
      'Saïda' ,
      'Skikda' ,
      'Sidi Bel Abbès' ,
      'Annaba' ,
      'Guelma' ,
      'Constantine' ,
      'Médéa' ,
      'Mostaganem' ,
      'M\'Sila' ,
      'Mascara' ,
      'Ouargla' ,
      'Oran' ,
      'El Bayadh' ,
      'Illizi' ,
      'Bordj Bou Arréridj' ,
      'Boumerdès' ,
      'El Tarf' ,
      'Tindouf' ,
      'Tissemsilt' ,
      'El Oued' ,
      'Khenchela' ,
      'Souk Ahras' ,
      'Tipaza' ,
      'Mila' ,
      'Aïn Defla' ,
      'Naâma' ,
      'Aïn Témouchent' ,
      'Ghardaïa' ,
      'Relizane'
   ]
   @patient = Patient.new(sign_up_params)
   # save the patient's data to the "patients" table
   if @patient.save
     @user = User.create!(email: @patient.email, password: @patient.password, patient_id: @patient.id, role: :patient)
     set_flash_message! :notice, :signed_up
     respond_to do |format|
       format.html { redirect_to     new_patient_session_path, notice: "Vous vous êtes inscrit avec succès.Veuillez vous connecter pour continuer." }
       format.json { render json: { status: :created, patient: @patient }, status: :created }
     end
   else
     clean_up_passwords @patient
     set_minimum_password_length
     respond_to do |format|
       format.html { render :new }
       format.json { render json: @patient.errors, status: :unprocessable_entity }
     end
   end



  end

  protected

  def sign_up_params
    params.require(:patient).permit(:name, :phone_number, :email, :password, :password_confirmation, :baladia, )
  end



 # The path used after sign up.
  def after_sign_up_path_for(resource)
    new_patient_session_path
  end
  private

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
end
