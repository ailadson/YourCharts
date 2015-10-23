class AddDataColumnToDataSources < ActiveRecord::Migration
  def change
    add_column :data_sources, :data, :text
  end
end
