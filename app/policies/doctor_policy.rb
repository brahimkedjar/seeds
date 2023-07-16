class DoctorPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def new?
    user.doctor?
  end

  def create?
    user.doctor?
  end

  def edit?
    user == record
  end

  def update?
    user == record
  end

  def destroy?
    user == record
  end

    def dashboard?
      user.present? && user.doctor?
    end
  end
