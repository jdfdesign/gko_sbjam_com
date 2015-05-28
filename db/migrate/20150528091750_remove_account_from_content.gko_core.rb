# This migration comes from gko_core (originally 20140304154500)
class RemoveAccountFromContent < ActiveRecord::Migration
  def up
    remove_column :contents, :account_id if column_exists?(:contents, :account_id)
  end
end