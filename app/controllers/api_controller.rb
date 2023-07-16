# app/controllers/api_controller.rb
class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:get_patients]

  def get_patients
    # Retrieve group_id from request parameters
    patient_id = params[:patient_id]

    # Query your database to get patients with the given group_id
    groups = Group.where(patient_id:patient_id)
    # Extract name and baladia from groups
    response = groups.map do |group|
        puts "Name: #{group.patient.name}, Baladia: #{group.baladia}" # Added puts statement
        {
          id: group.id,
          baladia: group.baladia,
          speciality: group.speciality,
        }
    end.compact # Remove nil values
    # Render the response as JSON
    render json: response
  end
end
