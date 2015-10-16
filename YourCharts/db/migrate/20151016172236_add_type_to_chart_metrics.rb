class AddTypeToChartMetrics < ActiveRecord::Migration
  def change
    add_column :chart_metrics, :chart_type, :string
  end
end
