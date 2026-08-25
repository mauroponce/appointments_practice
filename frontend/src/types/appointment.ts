export interface Appointment {
  id: number
  customer_id: number
  professional_id: number
  service_id: number
  price_cents: number
  status: string
  starts_at: string
}

export interface CreateAppointmentParams {
  customer_id: number
  professional_id: number
  service_id: number
  price_cents: number
  status: string
  starts_at: string
}