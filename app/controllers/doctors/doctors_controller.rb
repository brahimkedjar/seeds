class Doctors::DoctorsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.role = :doctor
    if @user.save
      # handle successful registration
    else
      # handle failed registration
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
