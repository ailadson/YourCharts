class RemoveNullFalseFromUrlDataSources < ActiveRecord::Migration
  def change
    change_column :data_sources, :url, :string, null: true
  end
end
