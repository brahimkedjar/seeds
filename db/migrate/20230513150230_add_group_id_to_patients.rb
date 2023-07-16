class AddGroupIdToPatients < ActiveRecord::Migration[7.0]
  def change
    add_column :patients, :group_id, :integer, array: true, default: [], null: true
  end
end
