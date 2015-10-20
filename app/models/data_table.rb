# == Schema Information
#
# Table name: data_tables
#
#  id         :integer          not null, primary key
#  table_name :string           not null
#  data_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class DataTable < ActiveRecord::Base
  validates :table_name, :data_id, presence: true

  belongs_to :data_source, foreign_key: :data_id, class_name: "DataSource"

  def create_rdb(source, schema)
    table_prefix = source.user.username
    table_suffix = source.name.gsub(' ', '_').downcase.to_sym

    self.table_name = "#{table_prefix}__#{table_suffix}"
    self.data_id = source.id

    TableCreator.new.createTable(self.table_name, schema)
  end
end

#helper class
class TableCreator < ActiveRecord::Migration

  def createTable(table_name, schema)
    create(table_name)
    makeColumns(table_name, schema)
  end

  def create(name)
    create_table name do |t|
      # t.timestamps
    end
  end

  def makeColumns(table, schema)
    schema.each do |col_name, col_type|
      add_column table, col_name, col_type
    end
  end
end
