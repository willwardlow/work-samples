class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  #GET /users
  def index
    @users = User.all
    render json: @users, include: [:organization, :shifts]
  end

  #SHOW /users/1
  def show
    render json: @user, include: [:organization, :shifts]
  end

  #POST /users
  def create 
    @user = User.new(user_params)

    if @user.save
      @token = encode({ id: @user.id})
      render json: {
        user: @user.attributes.except("password_digest"),
        token: @token
      }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

    #PATCH/PUT /users/1
    def update
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    #DELETE /users/1
    def destroy
      @user.destroy
    end


  private
  #Callbacks/helper functions 
  def set_user
    @user = User.find(params[:id])
  end

  #allow trusted parameters through
  def user_params
    params.require(:user).permit(:email_address, :name, :password, :organization)
  end

end
