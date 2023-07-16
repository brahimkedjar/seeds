class PagesController < ApplicationController
  def dashboard
    if user_signed_in? && current_user.doctor?
      begin
        authorize current_user, :dashboard?
        respond_to do |format|
          format.html
        end
      rescue Pundit::NotDefinedError
        redirect_to errors_not_found_path, alert: "Not Found"
      end
    else
      redirect_to errors_not_found_path, alert: "Not Found"
    end
  end

  def restricted_home
    @is_chat_open = false # Replace with the actual logic to determine the value
    @messages = [
      { role: 'user', content: 'Hello' },
      { role: 'chatbot', content: 'Hi there!' },
      # Add more messages as needed
    ]
    if user_signed_in?
      if current_user.doctor?
        redirect_to authenticated_doctor_root_path
      elsif current_user.patient?
        redirect_to authenticated_patient_root_path
      end
    else
      render 'index'
    end
  end

  def index
    # Your home page logic here
  end

  def patientshome
    if user_signed_in? && current_user.patient?
      begin
        authorize current_user, :patientshome?
        respond_to do |format|
          format.html
        end
      rescue Pundit::NotDefinedError
        redirect_to errors_not_found_path, alert: "Not Found"
      end
    else
      redirect_to errors_not_found_path, alert: "Not Found"
    end
  end



  def patientssearche
    if user_signed_in? && current_user.patient?
      begin
        authorize current_user, :patientshome?
        respond_to do |format|
          format.html
        end
      rescue Pundit::NotDefinedError
        # Redirect to error page or handle the error as desired
        redirect_to errors_not_found_path, alert: "Not Found"
      end
    else
      # Redirect to error page or handle the error as desired
      redirect_to errors_not_found_path, alert: "Not Found"
    end
  end

  def finddoctor
    if user_signed_in? && current_user.patient?
      begin
        authorize current_user, :patientshome?
        respond_to do |format|
          format.html
        end
      rescue Pundit::NotDefinedError
        # Redirect to error page or handle the error as desired
        redirect_to errors_not_found_path, alert: "Not Found"
      end
    else
      # Redirect to error page or handle the error as desired
      redirect_to errors_not_found_path, alert: "Not Found"
    end
  end

  def doctorhome
    if user_signed_in? && current_user.doctor?
      begin
        authorize current_user, :doctorshome?
        respond_to do |format|
          format.html
        end
      rescue Pundit::NotDefinedError
        redirect_to errors_not_found_path, alert: "Not Found"
      end
    else
      redirect_to errors_not_found_path, alert: "Not Found"
    end
  end

  def appointments
    if user_signed_in? && current_user.doctor?
      begin
        authorize current_user, :doctorshome?
        respond_to do |format|
          format.html
        end
      rescue Pundit::NotDefinedError
        redirect_to errors_not_found_path, alert: "Not Found"
      end
    else
      redirect_to errors_not_found_path, alert: "Not Found"
    end
  end

  def patient_list
    if user_signed_in? && current_user.doctor?
      begin
        authorize current_user, :doctorshome?
        respond_to do |format|
          format.html
        end
      rescue Pundit::NotDefinedError
        redirect_to errors_not_found_path, alert: "Not Found"
      end
    else
      redirect_to errors_not_found_path, alert: "Not Found"
    end
  end

  def Account
    if user_signed_in? && current_user.doctor?
      begin
        authorize current_user, :doctorshome?
        respond_to do |format|
          format.html
        end
      rescue Pundit::NotDefinedError
        redirect_to errors_not_found_path, alert: "Not Found"
      end
    else
      redirect_to errors_not_found_path, alert: "Not Found"
    end
  end

  def map
    if user_signed_in? && current_user.doctor?
      begin
        authorize current_user, :doctorshome?
        respond_to do |format|
          format.html
        end
      rescue Pundit::NotDefinedError
        redirect_to errors_not_found_path, alert: "Not Found"
      end
    else
      redirect_to errors_not_found_path, alert: "Not Found"
    end
  end




end



