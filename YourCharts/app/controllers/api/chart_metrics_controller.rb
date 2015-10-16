class Api::ChartMetricsController < ApplicationController
  def index
    @chart_metrics = current_user.metrics
    render json: @chart_metrics
  end

  def create
    @chart_metric = ChartMetric.new(chart_metric_params)

    if @chart_metric.save
      render json: @chart_metric
    else
      render json: @chart_metric.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
  end

  private
  def chart_metric_params
    params.require(:chart_metric).permit(:name, :data_id, :chart_type, :metrics)
  end

end
