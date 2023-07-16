module Api
  module V1
    class UserImagesWebController < ApplicationController
      skip_before_action :verify_authenticity_token
      skip_before_action :configure_sign_up_params, only: :create
      respond_to :json

      # save image to database
      def create
        user_id_for_image = current_user.id
        previous_image = Image.find_by(user_id: user_id_for_image)

        if previous_image
          previous_image.update(image: params[:image])
          render json: { id: previous_image.id, image_url: url_for(previous_image.image) }, status: :ok
        else
          image = current_user.images.new(image: params[:image])
          if image.save
            render json: { id: image.id, image_url: url_for(image.image) }, status: :created
          else
            render json: { errors: image.errors.full_messages }, status: :unprocessable_entity
          end
        end
      end

      def url
        user = User.find_by(doctor_id: params[:user_id])
        if user
          image = user.images.find_by(user_id: user.id)
          if image
            render json: { image_url: url_for(image.image) }, status: :ok
          else
            render json: { errors: 'Image not found' }, status: :not_found
          end
        else
          render json: { errors: 'User not found' }, status: :not_found
        end
      end
    end
  end
end
