class CreateChartMetrics < ActiveRecord::Migration
  def change
    create_table :chart_metrics do |t|
      t.string :name, null: false
      t.text :metrics, null: false
      t.integer :data_id, null: false

      t.timestamps null: false
    end

    add_index :chart_metrics, :data_id
  end
end
