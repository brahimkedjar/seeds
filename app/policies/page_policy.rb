class PagePolicy < ApplicationPolicy
  def home?
    user.present?
  end
end
