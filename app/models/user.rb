class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable
  belongs_to :patient, optional: true
  has_many :images
  enum role: { patient: 0, doctor: 1 }
end
