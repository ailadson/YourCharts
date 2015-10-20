## Moved to bottom of data_table controller for scoping reasons ##

# class SurrogateFactory
#   def self.build_surrogate
#     klass = Class.new do
#       def self.populate_table(data)
#         data.each do |datum|
#           model = self.new
#
#           datum[1].each do |key, val|
#             model[key.to_sym] = val
#           end
#
#           model.save!
#         end
#       end
#     end
#     "hey--------"
#     # p klass
#     # klass.ancestors.unshift(ActiveRecord::Base)
#     # p klass
#     # klass
#   end
# end
