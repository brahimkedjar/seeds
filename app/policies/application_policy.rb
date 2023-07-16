class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    raise Pundit::NotAuthorizedError, "must be logged in" unless user
    @user = user
    @record = record
  end

  def index?
    browser?
  end

  def show?
    owner? || updater?
  end

  def create?
    updater?
  end

  def new?
    create?
  end

  def update?
    owner? || updater?
  end

  def edit?
    updater?
  end

  def destroy?
    owner? || updater?
  end

  def owner?
    user.id == record.user_id
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope
    end
  end

  protected
  def updater?
    user.role == "doctor" || user.role == "patient"
  end

  def browser?
    owner? || updater?
  end
end
