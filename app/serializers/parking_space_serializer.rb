class ParkingSpaceSerializer < ActiveModel::Serializer
  attributes :id, :space_number

  belongs_to :car
  belongs_to :user
end