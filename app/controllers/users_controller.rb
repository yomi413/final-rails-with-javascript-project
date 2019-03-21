class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save && !@user.email.empty? && !@user.password.empty?
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      flash.now[:error] = "Please fill in the blanks. All information is required."
      render 'new'
    end
  end

  def show
    @user = User.find_by(id: params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @user }
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :uid, :admin)
  end
end
