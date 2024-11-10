import { useContext } from 'react'
import { Navigate } from 'react-router'
import { Context } from '../store/ContactContext'

export const PublicRoutes = ({ children }) => {
  const { store } = useContext(Context)
  const { user } = store

  return (!user.slug)
  ? children
  : <Navigate to="/contact"  />
}
