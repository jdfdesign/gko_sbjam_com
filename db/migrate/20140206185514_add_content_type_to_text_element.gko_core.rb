# This migration comes from gko_core (originally 20131031072100)
class AddContentTypeToTextElement < ActiveRecord::Migration
  def change
    add_column :text_elements, :value_type, :string unless column_exists?(:text_elements, :value_type)
    rename_column :text_elements, :content, :value if column_exists?(:text_elements, :content)
    rename_column :text_elements, :name, :key if column_exists?(:text_elements, :name)
    rename_column :text_element_translations, :content, :value if column_exists?(:text_element_translations, :content)
  end
end