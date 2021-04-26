class OrganizationsController < ApplicationController
  before_action :set_organization, [:update, :destroy]
  def index
    @organizations = Organization.all
  end

  def show
    render json: @organization
  end

  def create
    @organization = Organization.new(organization_params)

    if @organization.save
      render json: @organization, status: :created
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @organization.destroy
  end

  def update
    if @organization.update(organization_params)
      render json: @organization, status: :created
    else
      render json: @organization.errors, status: :unprocessable_entity

    end
  end

  private

  def set_organization
    @organization = Organization.find(params[:id])
  end
  
  def organization_params
    params.require(:organization).permit(:name, :hourly_rate)
  end
end
