class ApplicationController < ActionController::Base
  include Pundit::Authorization
  include Devise::Controllers::Helpers
  before_action :configure_sign_up_params, only: [:create]
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def user_not_authorized
    flash[:alert] = "You are not authorized to do this task !!!"
    redirect_to root_path
  end



  def require_patient_or_doctor_signed_out!
    if user_signed_in?
      if current_user && (current_user.patient? || current_user.doctor?)
      redirect_to errors_not_found_path, alert: "You are already signed in."
    end
  end
end

def configure_sign_up_params
  devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute1, :attribute2])
end

def render_404
  render file: "#{Rails.root}/public/404.html", layout: false, status: 404
end
  protected




end

