module Api
  module V1
  class UserImagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create
  skip_before_action :configure_sign_up_params,only: :create
  before_action :authenticate_user!
  respond_to :json

  #save image to database
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

def authenticate_user!()
  token = request.headers['Authorization']&.split(' ')&.last
  if token
    begin
      payload = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
      user_id = payload['doctor_id']
      user = User.find_by(doctor_id: user_id)
      if user
        sign_in(user)
        session[:access_token] = token
      else
        render json: { error: 'Invalid access token' }, status: :unauthorized
      end
    rescue JWT::DecodeError
      render json: { error: 'Invalid access token' }, status: :unauthorized
    end
  else
    render json: { error: 'Missing access token' }, status: :unauthorized
  end
end
end
end

end
