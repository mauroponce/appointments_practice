import { useState } from "react"
import type {
  Appointment, CreateAppointmentParams, AppointmentsFormData
} from '../types/appointments'
import { createAppointment, fetchAppointmentsFormData } from '../api/appointments'

import {
  useQuery,
  useQueryClient,
  useMutation
} from '@tanstack/react-query'


export function AppointmentForm(){
	const [ form, setForm ] = useState<CreateAppointmentParams>({ // form is local state
		customer_id: 0,
	  professional_id: 0,
	  service_id: 0,
	  status: "pending",
	  starts_at: ""
	})

  const {
    data: formData = {},
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
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"]
      })
      // We don't need to tell the parent that appointments collection has changed,
      // so we remove the onCreated prop function and the setAppointments call at parent level
    }
  })

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    createMutation.mutate(form) // Pass the argument that was used before: createAppointment(form)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

	return(
		<form onSubmit={handleSubmit}>
      <h2>Create appointment</h2>

      <label>
        Customer
        <select
          name="customer_id"
          value={form.customer_id}
          onChange={handleChange}
        >
          <option value="">-- select customer --</option>
          {formData?.customers.map(customer => 
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
          <option value="">-- select professional --</option>
          {formData?.professionals.map(professional => 
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
          <option value="">-- select service --</option>
          {formData?.services.map(service => 
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

      {formDataError && <p>{formDataError}</p>}

      <button type="submit" disabled={createMutation.isPending}>
        { createMutation.isPending ? "Creating" : "Create" }
      </button>
    </form>
	)
}