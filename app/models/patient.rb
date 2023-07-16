class Patient < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable , :omniauthable
  has_one :user
  has_many :groups
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      # Additional user attributes you want to save
    end
  end

end
