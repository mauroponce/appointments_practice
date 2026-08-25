import { useState, useEffect } from 'react'
import './App.css'
import type { Appointment } from './types/appointment'
import { fetchAppointments } from './api/appointments'
import { AppointmentList } from './components/AppointmentList'

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
        <AppointmentList appointments={appointments} />
        
      </section>
    </>
  )
}

export default App
