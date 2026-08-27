import { useState, useEffect } from 'react'
import './App.css'
import type { Appointment } from './types/appointment'
import { fetchAppointments } from './api/appointments'
import { AppointmentList } from './components/AppointmentList'
import { AppointmentForm } from './components/AppointmentForm'

import { useQuery } from '@tanstack/react-query'

function App() {
  const {
    data: appointments = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["appointments"], // The cached resource
    queryFn: fetchAppointments // How to fetch that resource
  })

  function handleAppointmentCreated(
    appointment: Appointment
  ) {
    setAppointments([appointment, ...appointments])
  }

  if(isLoading) {
    return <p>Loading appointments...</p>
  }

  if(error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      <section id="center">
        <h1>Appointments</h1>
        <AppointmentForm onCreated={handleAppointmentCreated} />
        <AppointmentList appointments={appointments} />
        
      </section>
    </>
  )
}

export default App
