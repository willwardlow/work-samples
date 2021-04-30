class ShiftsController < ApplicationController
  before_action :authorize_request, only: [:show, :create, :update, :destroy]
  before_action :set_shift, only: [:show, :update, :destroy]

  def index
    @shifts=Shift.all
    render json: @shifts, include: :user
  end

  def show
    render json: @shift, include: :user
  end

  def create
    @shift = Shift.new(shift_params)
    @shift.user = @current_user

    if @shift.save
      render json: @shift, include: :user, status: :created
    else
      render json: @shift.errors, status: :unprocessable_entity
    end
  end

  def update
    if @shift.update(shift_params)
      render json: @shift, include: :user, status: :created
    else
      render json: @shift.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @shift.destroy
  end




  private
  def set_shift
    @shift = Shift.find(params[:id])
  end

  def shift_params
    params.require(:shift).permit(:user_id, :start, :finish, :break_length, :organization_id)
  end
end
