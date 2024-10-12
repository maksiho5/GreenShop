import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProivateRouter() {
    const auth = false
  return (
    auth ? <Outlet /> : <Navigate to="/" />
  )
}

export default ProivateRouter