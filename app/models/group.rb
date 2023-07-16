# app/models/group.rb
class Group < ApplicationRecord
  belongs_to :patient
  has_many :groups_max

end


