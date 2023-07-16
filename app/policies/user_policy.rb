class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.patient?
        scope.where(role: :patient)
      elsif user.doctor?
        scope.where(role: :doctor)
      else
        scope.none
      end
    end
  end

  def new?
    user.nil?
  end

  def create?
    user.nil?
  end

  def dashboard?
    user.doctor?
  end

  def patientshome?
    user.patient?
  end

  def doctorshome?
    user.doctor?
  end

  def show?
    user.admin? || user.superadmin? || user == record
  end

  def update?
    user.admin? || user.superadmin? || user == record
  end

  def destroy?
    user.admin? || user.superadmin?
  end
end
