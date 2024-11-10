import { useContext } from 'react'
import { Navigate } from 'react-router'
import { Context } from '../store/ContactContext'

export const PrivateRoutes = ({ children }) => {
  const { store } = useContext(Context)
  const { user } = store

  return (user.slug)
  ? children          
  : <Navigate to="/auth/login" />
}
