module Api::V1
  class DoctorspageController < ApplicationController
    def index
      @doctors = Doctor.where(specialite: params[:specialty])
      images = {}
      @doctors.each do |doctor|
        user = User.find_by(doctor_id: doctor.id)
        image = Image.find_by(user_id: user.id)
        images[doctor.id] = image ? url_for(image.image) : nil
      end
      render json: { doctors: @doctors, images: images }
    end
  end

end
