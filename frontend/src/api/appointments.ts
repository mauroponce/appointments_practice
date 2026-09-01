import type { Appointment, AppointmentsFormData, CreateAppointmentParams } from '../types/appointment'
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

export async function updateAppointment(
  id: number,
  params: CreateAppointmentParams
): Promise<Appointment> {
  return apiRequest<Appointment>(`appointments/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ appointment: params })
  })
}

export async function fetchAppointmentsFormData(): Promise<AppointmentsFormData> {
  return apiRequest<AppointmentsFormData>("appointments/form_data")
}
