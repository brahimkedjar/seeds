class AddOnesignalPlayerIdToPatients < ActiveRecord::Migration[7.0]
  def change
    add_column :patients, :onesignal_player_id, :string
  end
end
