# app/controllers/doctors_controller.rb
module Api::V1
class ExperienceController < ApplicationController
  skip_before_action :verify_authenticity_token
  skip_before_action :configure_sign_up_params

  def create
    doctor = Doctor.new(doctor_params)
    if doctor.save
      render json: doctor, status: :created
    else
      render json: { errors: doctor.errors }, status: :unprocessable_entity
    end
  end

  private

  def doctor_params
    params.permit(:experience, :numero_clinique)
  end

end
end
