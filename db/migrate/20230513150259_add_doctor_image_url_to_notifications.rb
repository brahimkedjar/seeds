class AddDoctorImageUrlToNotifications < ActiveRecord::Migration[7.0]
  def change
    add_column :notifications, :doctor_image_url, :string
  end
end
