# This migration comes from gko_core (originally 20140624103300)
class AddVideoToImage < ActiveRecord::Migration
  def change
    add_column :images, :video_url, :string
  end
end