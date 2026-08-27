import type { Appointment, CreateAppointmentParams } from './types/appointment'
import { apiRequest } from './client.ts'

export async function fetchAppointments(): Promise<Appointment[]> {
  return apiRequest<Appointment[]>("appointments")
}

export async function fetchAppointment(
  id: number
): Promise<Appointment> {
  return apiRequest<Appointment>(`appointments/${id}`)
}

export async function createAppointment(
  params: CreateAppointmentParams
): Promise<Appointment> {
  return apiRequest<Appointment>("appointments", {
    method: "POST",
    body: JSON.stringify({
      appointment: params
    })
  })
}

export async function fetchAppointmentsFormData(): Promise<AppointmentsFormData> { // Todo: add type
  return apiRequest<AppointmentsFormData>("appointments/form_data")
}
