class Api::DataTablesController < ApplicationController
  def create
    @data_table = DataTable.new
    @data_source = DataSource.find(params[:data_id])

    @data_table.create_rdb(@data_source, params[:schema])

    #add data to the table
    surrogate = SurrogateFactory.build_surrogate
    surrogate.table_name = @data_table.table_name
    surrogate.populate_table(params[:data])

    if @data_table.save
      @data_source.processed = true
      @data_source.save!
      render json: @data_table
    else
      render json: @data_table.errors.full_messages
    end
  end
end

class SurrogateFactory
  def self.build_surrogate
    klass = Class.new(ActiveRecord::Base) do
      def self.populate_table(data)
        data.each do |datum|
          model = self.new

          datum[1].each do |key, val|
            model[key.to_sym] = val
          end

          model.save!
        end
      end
    end
    klass
  end
end
