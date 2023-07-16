module Api::V1
  class DoctordataController < ApplicationController
    def doctor_data
      if user_signed_in? && current_user.doctor?
        begin
          authorize current_user, :doctorshome?

          doctor = Doctor.find_by(id: current_user.doctor_id)
          user = User.find_by(doctor_id: doctor.id)
          image = user.images.find_by(user_id: user.id)

          if image.present?
            doctor_data = { "image_url": url_for(image.image), "email": doctor.email, "doctor_data": doctor }.to_json
          else
            doctor_data = { "email": doctor.email, "doctor_data": doctor }.to_json
          end

          render json: doctor_data
        rescue Pundit::NotDefinedError
          render json: { error: "Not Found" }, status: :not_found
        end
      else
        render json: { error: "Not Found" }, status: :not_found
      end
    end

def notifications
  if user_signed_in? && current_user.doctor?
    begin
      authorize current_user, :doctorshome?

      doctor = Doctor.find_by(id: current_user.doctor_id)
      puts(doctor.id)
      user = Notification.where(doctor_id: doctor.id)
      doctor_data = {  "notifications": user }.to_json

      render json: doctor_data
    rescue Pundit::NotDefinedError
      render json: { error: "Not Found" }, status: :not_found
    end
  else
    render json: { error: "Not Found" }, status: :not_found
  end
end

end
end
