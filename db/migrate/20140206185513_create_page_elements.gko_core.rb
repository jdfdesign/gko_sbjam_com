# This migration comes from gko_core (originally 20131001105105)
class CreatePageElements < ActiveRecord::Migration
  def change
    unless table_exists?(:text_elements)
      create_table :text_elements do |t|
        t.integer :section_id
        t.string :name
        t.text :content
        t.integer :position, :default => 1
      end
    
      add_index :text_elements, [:section_id]
      add_index :text_elements, [:name]
    end
    
    unless table_exists?(:text_element_translations) 
      create_table :text_element_translations do |t|
        t.integer :text_element_id
        t.string :locale
        t.text  :content
        t.timestamps
      end
    
      add_index :text_element_translations, [:locale, :text_element_id]
    end
  end
end