# require 'pry'

class CarsController < ApplicationController

  def index
    cars = Car.registered_owner

    respond_to do |format|
      format.html
      format.json { render json: cars }
    end
  end

  def new
    @car = Car.new

    respond_to do |format|
      format.html
      format.json { render json: @car }
    end
  end

  def create
    car = current_user.cars.build(car_params)

    respond_to do |format|
      format.html {
        if car.save
          redirect_to cars_path
        else
          render 'new'
        end
      }
      format.json {
        if car.save
          render json: car, status: 201
        else
          render json: car.errors, status: 422
        end
      }
    end
  end

  def show
    @car = current_user.cars.find_by(id: params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @car }
    end
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
