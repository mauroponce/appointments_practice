import { useState } from "react"
import type { Appointment, CreateAppointmentParams } from '../types/appointment'
import { createAppointment, fetchAppointmentsFormData, updateAppointment } from '../api/appointments'

import {
  useQuery,
  useQueryClient,
  useMutation
} from '@tanstack/react-query'


interface AppointmentFormProps {
  appointment?: Appointment
}

export function AppointmentForm({ appointment }: AppointmentFormProps){
	const [ form, setForm ] = useState<CreateAppointmentParams>(() =>
    appointment
      ? {
          customer_id: appointment.customer_id,
          professional_id: appointment.professional_id,
          service_id: appointment.service_id,
          status: appointment.status,
          starts_at: appointment.starts_at.slice(0, 16)
        }
      : {
          customer_id: 0,
          professional_id: 0,
          service_id: 0,
          status: "pending",
          starts_at: ""
        }
  )

  const {
    data: formData, // Keep it undefined, type will be infered from fetchAppointmentsFormData API call (AppointmentsFormData)
    isLoading,
    error: formDataError // rename TanStack Query error to specific formDataError
  } = useQuery({
    queryKey: ["appointments", "formData"],
    // TanStack Query keys are hierarchical, invalidating "appointments" will invalidate all keys starting with "appointments"
    queryFn: fetchAppointmentsFormData
  })

	function handleChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	){
		const { name, value } = event.target;
    const numericFields = [
      "customer_id",
      "professional_id",
      "service_id"
    ]

		setForm((current) => ({
			...current,
			[name]: numericFields.includes(name)
        ? Number(value)
        : value
		}))
	}

  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: (params: CreateAppointmentParams) =>
      appointment ? updateAppointment(appointment.id, params) : createAppointment(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments", "list"]
        // We have created an appointment but we still have the same customers, professionals and services,
        // so formData remains cached, we don't invalidate ["appointments", "formData"] for this case
      })
      if (appointment) {
        queryClient.invalidateQueries({ queryKey: ["appointments", appointment.id] })
      }
      // We don't need to tell the parent that appointments collection has changed,
      // so we remove the onCreated prop function and the setAppointments call at parent level

      // Reset form (local UI state), on this mutation callback
      if (!appointment) {
        setForm({
          customer_id: 0,
          professional_id: 0,
          service_id: 0,
          status: "pending",
          starts_at: ""
        })
      }
    }
  })

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    createMutation.mutate(form) // Pass the argument that was used before: createAppointment(form)
    // .mutate is callback oriented. If we need a Promise, we use .mutateAsync
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if(!formData) {
    return null
  }

	return(
		<form onSubmit={handleSubmit}>
      <h2>{appointment ? "Edit appointment" : "Create appointment"}</h2>

      <label>
        Customer
        <select
          name="customer_id"
          value={form.customer_id}
          onChange={handleChange}
        >
          <option value={0}>-- select customer --</option>
          {formData.customers.map(customer => 
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          )}
        </select>
      </label>

      <label>
        Professional
        <select
          name="professional_id"
          value={form.professional_id}
          onChange={handleChange}
        >
          <option value={0}>-- select professional --</option>
          {formData.professionals.map(professional => 
            <option key={professional.id} value={professional.id}>{professional.name}</option>
          )}
        </select>
      </label>

      <label>
        Service
        <select
          name="service_id"
          value={form.service_id}
          onChange={handleChange}
        >
          <option value={0}>-- select service --</option>
          {formData.services.map(service => 
            <option key={service.id} value={service.id}>{service.name}</option>
          )}
        </select>
      </label>

      <label>
        Starts at
        <input
          type="datetime-local"
          name="starts_at"
          value={form.starts_at}
          onChange={handleChange}
        />
      </label>

      <label>
        Status
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>

      {formDataError && (
        <p>{formDataError.message}</p>
      )}

      {createMutation.isError && (
        <p>{createMutation.error.message}</p>
      )}

      <button type="submit" disabled={createMutation.isPending}>
        {createMutation.isPending ? "Saving" : appointment ? "Save changes" : "Create"}
      </button>
    </form>
	)
}
