class Api::V1::AppointmentsController < Api::V1::BaseController

  def index
    appointments = Appointment.order(:starts_at)
    render json: appointments
  end

  def show
    appointment = Appointment.find(params[:id])
    render json: appointment
  end

  def create
    appointment = Appointment.create!(appointment_params)
    
    render json: appointment, status: :created
  end

  def update
    appointment = Appointment.find(params[:id])
    appointment.update!(appointment_params)
    render json: appointment
  end

  private
  def appointment_params
    params.require(:appointment).permit(
      :account_id,
      :customer_id,
      :professional_id,
      :service_id,
      :price_cents,
      :status,
      :starts_at
    )
  end
end
