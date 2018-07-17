require 'pry'

class CarsController < ApplicationController
  
  def index
    @cars = Car.registered_owner
  end

  def new
    @car = Car.new
  end

  def create
    @car = current_user.cars.build(car_params)
    
    if @car.save
      redirect_to cars_path
    else
      render 'new'
    end
  end

  def show
    @car = current_user.cars.find_by(id: params[:id])
  end

  def edit
    @car = current_user.cars.find_by(id: params[:id])
  end

  def update
    @car = current_user.cars.find_by(id: params[:id])
    @car.update(car_params)
    redirect_to cars_path
  end

  def destroy
    @car = current_user.cars.find_by(id: params[:id])

    if @car && logged_in?
      @car.destroy 
      redirect_to cars_path
    end
  end

  private

  def car_params
    params.permit(
      :make, 
      :model, 
      :year, 
      :color, 
      :size, 
      parking_space_attributes: [
        :space_number
      ]
    )
  end
end
