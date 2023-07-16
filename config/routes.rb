Rails.application.routes.draw do
  # Define your error handling route using additional_paths
  root 'pages#restricted_home'
  post '/api/chatbot', to: 'chatbot#reply'

  get 'errors/not_found'
  devise_for :patients, controllers: {
    omniauth_callbacks: 'patients/omniauth_callbacks',
    sessions: 'patients/sessions',
    registrations: 'patients/registrations',
    invitations: 'patients/invitations',
  }
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    invitations: 'users/invitations',
  }
  devise_for :doctors, controllers: {
    sessions: 'doctors/sessions',
    registrations: 'doctors/registrations',
    invitations: 'doctors/invitations',
  }

  authenticated :user, ->(user) { user.doctor? } do
    get '/DoctorPage', to: 'pages#doctorhome', as: :authenticated_doctor_root
  end

  authenticated :user, ->(user) { user.patient? } do
    get '/PatientPage', to: 'pages#patientshome', as: :authenticated_patient_root
  end
  devise_scope :doctor do
    get '/doctors/sign_out', to: 'doctors/sessions#destroy'
  end
  devise_scope :patient do
    get '/patients/sign_out', to: 'patients/sessions#destroy'
  end
  namespace :api do
    namespace :v1 do
      get 'groups/:speciality', to: 'groups#groups_by_speciality'
      post '/send_notifications', to: 'notifications#create'
      get '/get_rndv', to: 'notifications#index'
      get '/get_rndv2', to: 'notifications#index3'
      get '/get_notifications', to: 'notifications#index2'
      delete '/destroy', to: 'notifications#destroy'

      get '/users/:user_id/images/url', to: 'user_images#url'
      get '/doctors_list', to: 'loaddoctors#url'
      post '/user_images', to: 'user_images#create'
      post '/user_images_web', to: 'user_images_web#create'
      get '/patient_data', to: 'patientdata#patient_data'
      get '/doctor_data', to: 'doctordata#doctor_data'
      get '/notification_doctor', to: 'doctordata#notifications'
      post '/experience', to: 'experience#create'
      get '/doctors', to: 'doctorspage#index'



    end
  end
  get 'patient_page', to: 'pages#patientshome'
  get '/patient_page/search_doctors', to: 'pages#patientshome'
  get '/PatientPage/SearchDoctors', to: 'pages#patientssearche'
  get '/PatientPage/FindDoctor', to: 'pages#finddoctor'
  get '/PatientPage/SearchDoctors', to: 'search_doctors#index'

  resource :user_images, only: [:create,:url]

  get '/DoctorPage/appointments', to: 'pages#appointments'
  get '/DoctorPage/PatientList', to: 'pages#patient_list'
  get '/DoctorPage/Account', to: 'pages#Account'


  get '/DoctorPage/Map', to: 'pages#map'
  post '/get_patients', to: 'api#get_patients'
  get '/get_patients/:patient_id', to: 'api#get_patients'
  get '/img/app.png', to: 'custom#redirect_app_image'

  get '(*path)', to: 'application#render_404', constraints: lambda { |req| !req.path.starts_with?('/rails/active_storage') }

end
