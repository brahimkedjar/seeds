class AddColumnsToNotifications < ActiveRecord::Migration[7.0]
  def change
    add_column :notifications, :doctor_name, :string
    add_column :notifications, :doctor_speciality, :string
    add_column :notifications, :appointment_date, :string
    add_column :notifications, :place, :string
  end
end



