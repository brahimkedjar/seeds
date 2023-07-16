# app/models/doctor.rb
class Doctor < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :confirmable
  has_one :user
  has_many :groups

end
