import { useState, useEffect } from 'react'
import './App.css'
import type { Appointment } from './types/appointment'
import { fetchAppointments } from './api/appointments'

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null)

  useEffect(() => {
    async function loadAppointments() {
      try {
        setLoading(true)

        const data = await fetchAppointments()

        setAppointments(data)
      } catch(error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadAppointments()
  }, [])// With [], useEffect runs only once when the component mounts


  if(loading) {
    return <p>Loading appointments...</p>
  }

  if(error) {
    return <p>{error}</p>
  }

  return (
    <>
      <section id="center">
        <h1>Appointments</h1>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul>
            {appointments.map(appointment => (
              <li key={appointment.id}>
                <span>${appointment.price_cents}</span>
                {" - "}
                <span>{appointment.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default App
