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

  def query
    #from
    @from_data_table = DataTable.find_by_data_id(params[:query][:from])

    #model
    surrogate = SurrogateFactory.build_surrogate
    surrogate.table_name = @from_data_table.table_name
    query_results = surrogate.all

    #joins

    #selection
    selections = []
    if params[:query][:selections]
      selections = params[:query][:selections].map do |s|
        selection = s[1]
        select_DT = DataTable.find_by_data_id(selection[:dataId])

        if selection[:as]
          "#{select_DT.table_name}.#{selection[:column].underscore} AS #{selection[:as]}"
        else
          "#{select_DT.table_name}.#{selection[:column].underscore}"
        end
      end
    end
    p "--------------SELECTIONS-----------"
    p selections
    p "-----------------------------"
    unless selections.empty?
      query_results = query_results.select(*selections)
    end

    #create data source
    @data_source = DataSource.new
    @data_source.name = params[:query][:name]
    @data_source.user_id = current_user.id
    @data_source.data = ActiveSupport::JSON.encode(query_results)

    if @data_source.save
      render json: @data_source
    else
      render json: @data_source.errors.full_messages
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
            model[key.underscore.to_sym] = val
          end

          model.save!
        end
      end
    end
    klass
  end
end
