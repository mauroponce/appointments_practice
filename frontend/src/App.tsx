import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import type { Appointment } from './types/appointment'
import { fetchAppointments } from './api/appointments'
import { AppointmentsPage } from './components/AppointmentsPage'

import { useQuery } from '@tanstack/react-query'

function App() {
  const {
    data: appointments = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["appointments", "list"], // The cached resource
    queryFn: fetchAppointments // How to fetch that resource
  })

  if(isLoading) {
    return <p>Loading appointments...</p>
  }

  if(error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <Routes>
      <Route path="/" element={<AppointmentsPage appointments={appointments} />} />      
    </Routes>
  )
}

export default App
