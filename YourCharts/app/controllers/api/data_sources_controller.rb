require "uri"
require "net/https"

class Api::DataSourcesController < ApplicationController
  def index
    @data_sources = current_user.data_sources
    render json: @data_sources
  end

  def create
    @data_source = DataSource.new(data_source_params)
    @data_source.user_id = current_user.id

    if @data_source.save
      render json: @data_source
    else
      render json: @data_source.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
  end

  def destroy
  end

  private
  def data_source_params
    params.require(:data_source).permit(:name, :url, :description, :public)
  end
end
