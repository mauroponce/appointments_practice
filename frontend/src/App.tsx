import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    console.log("Fetching appointments...")
    fetch("http://localhost:3004/api/v1/appointments", {
      headers: {
        "X-Account-Id": "2"
      }
    })
    .then(response => response.json())
    .then(data => {
      setAppointments(data)
      console.log(data)
    })
    .catch(error => {
      console.error("FETCH FAILED:", error)
    })
  }, []) // With [], useEffect runs only once when the component mounts

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
                <span>${appointment.price_cents}</span> - 
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
