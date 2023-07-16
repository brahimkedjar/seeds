module Api::V1
  class PatientdataController < ApplicationController
def patient_data
  if user_signed_in? && current_user.patient?
    begin
      authorize current_user, :patientshome?

      patient = Patient.find_by(id: current_user.patient_id)

      user_data = { "name": patient.name, "email": patient.email, "patient_data": patient }.to_json

      render json: user_data
    rescue Pundit::NotDefinedError
      render json: { error: "Not Found" }, status: :not_found
    end
  else
    render json: { error: "Not Found" }, status: :not_found
  end
end
end
end
