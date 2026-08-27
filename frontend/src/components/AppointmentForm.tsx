import { useState, useEffect } from "react"
import type { Appointment, CreateAppointmentParams } from '../types/appointments'
import { createAppointment, fetchAppointmentsFormData } from '../api/appointments'

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

	const [ error, setError ]           = useState<string | null>(null)
  const [ submitting, setSubmitting ] = useState(false)
  const [formData, setFormData]       = useState(null)

  useEffect(() =>{
    async function loadFormData() {
        const formData = await fetchAppointmentsFormData()
        setFormData(formData)
    }

    loadFormData()
  }, [])

	function handleChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	){
		const { name, value } = event.target;
		setForm((current) => ({
			...current,
			[name]: name.endsWith('_id') ? Number(value) : value
		}))
	}

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    try {
      setSubmitting(true)
      setError(null)

      const appointment = await createAppointment(form)
      onCreated(appointment)

      setForm((current) => ({
        ...current,
        price_cents: 0,
        starts_at: ""
      }))

    } catch(error) {
      if(error instanceof Error){
        setError(error.message)
      } else {
        setError("Unknown error")
      }
    } finally {
      setSubmitting(false)
    }
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
          {formData && formData["customers"].map(customer => 
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
          {formData && formData["professionals"].map(professional => 
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
          {formData && formData["services"].map(service => 
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
        { submitting ? "Creating" : "Create" }
      </button>
    </form>
	)
}