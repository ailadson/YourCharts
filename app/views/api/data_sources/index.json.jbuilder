json.array!(@data_sources) do |d_s|
  json.extract!(d_s, :id, :name, :url, :description, :public)
  json.chart_metrics d_s.metrics
end
