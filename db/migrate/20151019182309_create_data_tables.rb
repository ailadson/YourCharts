class CreateDataTables < ActiveRecord::Migration
  def change
    create_table :data_tables do |t|
      t.string :table_name, null: false
      t.integer :data_id, null: false

      t.timestamps null: false
    end

    add_index :data_tables, :data_id
  end
end
