import { useState } from "react"
import type { Appointment, CreateAppointmentParams } from '../types/appointments'
import { createAppointment } from '../api/appointments'

interface AppointmentFormProps {
  onCreated: (appointment: Appointment) => void
}

export function AppointmentForm(
  { onCreated }: AppointmentFormProps
){
	const [ form, setForm ] = useState<CreateAppointmentParams>({
		customer_id: 2,
	  professional_id: 3,
	  service_id: 3,
	  price_cents: 20000,
	  status: "pending",
	  starts_at: "2026-08-30T15:00:00-03:00"
	})

	const { error, setError } = useState<string | null>(null)
  const { submitting, setSubmitting } = useState(false)

	function handleChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	){
		const { name, value } = event.target;
		setForm((current) => ({
			...current,
			[name]: name.endsWith('_id') ? Number(value) : value
		}))
	}

  async function handleSubmit(e) {
    e.preventDefault()
    const appointment = await createAppointment(form)
    onCreated(appointment)
    console.log("handleSubmit called")
  }

	return(
		<form onSubmit={handleSubmit}>
      <h2>Create appointment</h2>

      <label>
        Customer ID
        <input
          type="number"
          name="customer_id"
          value={form.customer_id}
          onChange={handleChange}
        />
      </label>

      <label>
        Professional ID
        <input
          type="number"
          name="professional_id"
          value={form.professional_id}
          onChange={handleChange}
        />
      </label>

      <label>
        Service ID
        <input
          type="number"
          name="service_id"
          value={form.service_id}
          onChange={handleChange}
        />
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
        Price
        <input
          type="number"
          name="price_cents"
          value={form.price_cents}
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

      {error && <p>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Creating..." : "Create appointment"}
      </button>
    </form>
	)
}