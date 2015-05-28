# This migration comes from gko_core (originally 20140306071700)
class ChangeNullDefautOnPositionColumn < ActiveRecord::Migration
  def up
    change_column :image_assignments, :position, :integer, :null => true, :default => 1
    change_column :document_assignments, :position, :integer, :null => true, :default => 1
  end
end