import { useReducer } from 'react'
import { contactReducer } from './ContactReducer';
import { Context } from './ContactContext';


export const ContactProvider = ({children}) => {
  const [store, dispatch] = useReducer(contactReducer, { user: { slug:"", id: null }, contacts: [] });

  return (
    <Context.Provider value={{store, dispatch}}>
      {children}
    </Context.Provider>
  )
}
