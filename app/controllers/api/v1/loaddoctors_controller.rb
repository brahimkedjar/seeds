class Api::V1::LoaddoctorsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def url
    user = current_patient
    # Get all the doctors
    doctors = Doctor.all

    if doctors.empty?
      return render json: { errors: 'No doctors found' }, status: :not_found
    end

    # Map the doctors to an array of objects containing their name, speciality, and image URL
    doctors_data = doctors.map do |doctor|
      user1 = User.find_by(doctor_id: doctor.id)
      image = nil
      if user1
        user_id = user1.id
        image = Image.find_by(user_id: user_id)
      end
      {
        name: doctor.name,
        specialite: doctor.specialite,
        image_url: image ? url_for(image.image) : nil,
        address: doctor.address,
        phone_number: doctor.phone_number,
        email: doctor.email,
        doctorid: doctor.id
      }
    end

    # Return the doctors data as JSON
    render json: doctors_data, status: :ok
  end
end
