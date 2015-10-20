class ChangePublicColumnToProcessed < ActiveRecord::Migration
  def change
    rename_column :data_sources, :public, :processed
  end
end
