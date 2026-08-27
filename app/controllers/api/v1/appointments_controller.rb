class Api::V1::AppointmentsController < Api::V1::BaseController

  def index
    appointments = current_account.appointments.order(:starts_at)
    render json: appointments
  end

  def show
    appointment = current_account.appointments.find(params[:id])
    render json: appointment
  end

  def create
    appointment = current_account.appointments.create!(scoped_appointment_params)
    
    render json: appointment, status: :created
  end

  def update
    appointment = current_account.appointments.find(params[:id])
    appointment.update!(scoped_appointment_params)
  
    render json: appointment
  end

  def form_data
    data = {
      customers:     current_account.customers.pluck(:id, :name).map{|id, name| { id: id, name: name }},
      professionals: current_account.professionals.pluck(:id, :name).map{|id, name| { id: id, name: name }},
      services:      current_account.services.pluck(:id, :name).map{|id, name| { id: id, name: name }}
    }

    render json: data
  end

  private

  def appointment_params
    params.require(:appointment).permit(
      :customer_id,
      :professional_id,
      :service_id,
      :price_cents,
      :status,
      :starts_at
    )
  end

  def scoped_appointment_params
    scoped_params = appointment_params
    if scoped_params[:customer_id].present?
      scoped_params[:customer_id] = current_account.customers.find(scoped_params[:customer_id]).id
    end

    if scoped_params[:professional_id].present?
      scoped_params[:professional_id] = current_account.professionals.find(scoped_params[:professional_id]).id
    end

    if scoped_params[:service_id].present?
      scoped_params[:service_id] = current_account.services.find(scoped_params[:service_id]).id
    end

    scoped_params
  end
end
