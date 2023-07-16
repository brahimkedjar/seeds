class CreateGroupsTable < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.bigint :group_id
      t.float :latitude
      t.float :longitude
      t.string :speciality
      t.string :baladia
      t.belongs_to :doctor, foreign_key: true
      t.belongs_to :patient, foreign_key: true
      t.timestamps
    end
  end
end
