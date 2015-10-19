class CreateDataSources < ActiveRecord::Migration
  def change
    create_table :data_sources do |t|
      t.string :name, null: false
      t.string :url, null: false
      t.text :description
      t.integer :user_id, null: false
      t.boolean :public, default: false

      t.timestamps null: false
    end

    add_index :data_sources, :user_id
  end
end
