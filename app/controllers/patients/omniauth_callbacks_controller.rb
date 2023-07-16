class Patients::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def instagram
    @user = Patient.from_omniauth(request.env["omniauth.auth"])
    sign_in_and_redirect @user, event: :authentication
  end
end
