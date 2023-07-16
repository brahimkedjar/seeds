class Doctors::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]
  before_action :require_patient_or_doctor_signed_out!
  skip_before_action :verify_authenticity_token, only: [:new,:create]
  protect_from_forgery with: :null_session
  respond_to :json

  # POST /doctors/sign_in
    def new
      @controller_name = "doctors"
      @all_wilaya = [
        'Aïn Azel',
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
   @specialites = ['Anesthésiologiste',
    'Cardiologue',
    'Chirurgien',
    'Dentiste',
    'Dermatologue',
    'Endocrinologue',
    'Gastro-entérologue',
    'Gynécologue',
    'Hématologue',
    'Infectiologue',
    'Médecin généraliste',
    'Néphrologue',
    'Neurologue',
    'Oncologue',
    'Ophtalmologue',
    'Oto-rhino-laryngologiste (ORL)',
    'Pédiatre',
    'Psychiatre',
    'Radiologue',
    'Rhumatologue',
    'Urologue']
      super
    end

    def create
      @specialites = ['Anesthésiologiste',
        'Cardiologue',
        'Chirurgien',
        'Dermatologue',
        'Endocrinologue',
        'Gastro-entérologue',
        'Gynécologue',
        'Hématologue',
        'Infectiologue',
        'Médecin généraliste',
        'Néphrologue',
        'Neurologue',
        'Oncologue',
        'Ophtalmologue',
        'Oto-rhino-laryngologiste (ORL)',
        'Pédiatre',
        'Psychiatre',
        'Radiologue',
        'Rhumatologue',
            'Urologue']
      # build a new doctor with the given sign up parameters
    @doctor = Doctor.new(sign_up_params)
    # save the doctor's data to the "doctors" table
    if @doctor.save
      @user = User.create!(email: @doctor.email, password: @doctor.password,doctor_id: @doctor.id, role: :doctor)
      set_flash_message! :notice, :signed_up
      respond_to do |format|
        format.html { redirect_to new_doctor_session_path, notice: "Vous vous êtes inscrit avec succès.Veuillez vous connecter pour continuer." }
        format.json { render json: { status: :created, doctor: @doctor } }
      end
    else
      respond_to do |format|
        format.html { render :new }
      end
    end

    end

  protected

  def sign_up_params
    params.require(:doctor).permit(:name,:latitude,:longitude, :phone_number, :address, :specialite, :email, :password, :password_confirmation, :selected_wilaya => [])
  end
  def account_update_params(resource_name)
    params.require(:doctor).permit(:name, :latitude,:longitude,:phone_number, :address,:specialite, :email, :password, :password_confirmation, :selected_wilaya => [])
  end

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  end

 # The path used after sign up.
 def after_sign_up_path_for(resource)
  new_doctor_session_path
end

  private
  def authenticate_user!()
    token = request.headers['Authorization']&.split(' ')&.last
    if token
      begin
        payload = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
        user_id = payload['doctor_id']
        user = User.find_by(doctor_id: user_id)
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

