module Api
  module V1
    class NotificationsController < ApplicationController
      skip_before_action :verify_authenticity_token
      skip_before_action :configure_sign_up_params
      respond_to :json
      def index
        # Retrieve group_id from patient based on patient_id
        patient = Patient.find_by(id: params[:patient_id])

        if patient.present?
          group_id = patient.group_id
          # Convert array of integers to array of strings
          group_id_str = group_id.map(&:to_s)

          # Retrieve notifications based on group_id
          notifications = Notification.where("group_id::text = ANY(ARRAY[?])", group_id_str)

          image_urls = []
          notifications.each do |notification|
            doctor_id = notification.doctor_id
            doctor = Doctor.find_by(id: doctor_id)
            user = User.find_by(doctor_id: doctor.id)
            image = Image.find_by(user_id: user.id)
            if image.present?
              image_url = url_for(image.image)
              image_urls << image_url
            else
              image_urls << nil
            end
          end

          render json: {"image_urls": image_urls, "notifications": notifications}
        else
          render json: { error: "Patient not found" }, status: :not_found
        end
      end
      def index3
        # Retrieve group_id from patient based on patient_id
        doctor = Doctor.find_by(id: params[:doctor_id])
        if doctor.present?

          notifications = Notification.where(doctor_id: doctor.id)

          render json: notifications
        else
          render json: { error: "Patient not found" }, status: :not_found
        end
      end

      def index2
        # Fetch notifications from your data source
        notifications = Notification.all # Replace with your actual implementation

        # Get the patient_id from the client request
        patient_id = params[:patient_id]

        # Check if the group_id in the Notification table is included in the group_id array of the Patient model
        notifications = notifications.select do |notification|
          Patient.where("? = ANY (group_id)", notification.group_id)&.pluck(:id).include?(patient_id.to_i)
        end

        # Render the filtered notifications as JSON
        render json: notifications
      end

      def create
        group_ids = params[:group_id].split(',')
        appointment_date = params[:appointment_date]
        doctor_name = params[:doctor_name]
        doctor_speciality = params[:doctor_speciality]
        place = params[:place]
        doctor_id = params[:doctor_id]

        patients = Patient.where('? = ANY (group_id)', group_ids)
        user = User.find_by(doctor_id: params[:doctor_id])
        image = Image.find_by(user_id: user.id)


        doctor_image_url = nil
        if image
          doctor_image_url = url_for(image.image)
        end

        patients.each do |patient|
          notification_message = "Vous avez un rendezvous avec Dr. #{doctor_name}, le #{appointment_date}"
          send_push_notification(patient, notification_message)
        end

        notification_message = "Vous avez un rendezvous avec Dr. #{doctor_name}, le #{appointment_date}"
        group_ids.each do |group_id|
          notification = Notification.find_by(group_id: group_id.to_i, doctor_id: doctor_id)
          if notification
            notification.update(doctor_name: doctor_name, doctor_speciality: doctor_speciality, appointment_date: appointment_date, place: place, message: notification_message, sent_at: Time.now)
          else
            notification = Notification.new(group_id: group_id.to_i, doctor_name: doctor_name, doctor_speciality: doctor_speciality, appointment_date: appointment_date, place: place, doctor_id: doctor_id, doctor_image_url: doctor_image_url, message: notification_message, sent_at: Time.now)
            notification.save
            Notification.where(doctor_id: doctor_id).update_all(doctor_image_url: doctor_image_url)

          end
        end

        respond_to do |format|
          format.json { render json: { message: 'Notifications sent and stored successfully' }, status: :ok }
          format.html { render plain: 'Notifications sent and stored successfully', status: :ok }
        end
      rescue => e
        # Handle any errors that may occur
        render json: { error: e.message }, status: :unprocessable_entity
      end


      def destroy
        @notification = Notification.where(doctor_id: params[:doctor_id], group_id: params[:group_id]).first
        if @notification.destroy
          render json: { message: "Notification deleted successfully" }, status: :ok
        else
          render json: { message: "Failed to delete notification" }, status: :unprocessable_entity
        end
      end




      private

      def send_push_notification(patient, message)
        # Implement your push notification logic here, using a hypothetical push notification service
        # Example:
        # push_notification_service = PushNotificationService.new
        # push_notification_service.send_notification(patient.device_token, message)
        # Update patient's notification flag, if applicable
        # patient.update(notification_sent: true)
      end
    end
  end




end
