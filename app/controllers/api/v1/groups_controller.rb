module Api::V1
  class GroupsController < ApplicationController
    def groups_by_speciality
      groups = Group.where(speciality: params[:speciality])
      render json: groups.pluck(:id, :baladia), status: :ok
    end
  end
end
