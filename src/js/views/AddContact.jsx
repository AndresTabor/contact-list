import { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../commons/hooks/useForm'
import { createContact, updateContact } from '../services/contactServices'
import { Context } from '../store/ContactContext'
import { contactTypes } from '../types/types'

const initialForm = {
  name: "",
  phone: "",
  email: "",
  address: ""
}

export const AddContact = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useContext(Context)
  const { user } = store

  const { id } = useParams()
  const { formData, handleChange, preDataForm } = useForm(initialForm)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!id) {
      createContact(user.slug, formData)
      .then(resp => {
        dispatch({ type: contactTypes.CREATE, payload: { contact: resp }})
        navigate("/contact");     
      })
      .catch(console.log)
      return
    }

    updateContact(user.slug, formData)
    .then(resp => {
      dispatch({ type: contactTypes.UPDATE, payload: { contact: resp }})
      navigate("/contact");
    })
    .catch(console.log)
    
  }

  useEffect(() => {
    if (id) {
      
      const dataUser = store.contacts.find(contact => contact.id == id)      
      
      dataUser && preDataForm({
        ...dataUser
      })
      
      
    }
    
  }, []);

  return (
    <form className='w-50 m-auto' onSubmit={handleSubmit}>
      <h2 className='text-center'>{!id ? 'Add a new contact' : 'Edit contact'}</h2>
      <div className="mb-3">
        <label htmlFor="exampleInputFullName" className="form-label">Full Name</label>
        <input onChange={handleChange} defaultValue={formData.name} name="name" type="text" className="form-control" id="exampleInputFullName" aria-describedby="fullNameHelp" placeholder='Full Name' required/> 
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
        <input onChange={handleChange} defaultValue={formData.email} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
        <input onChange={handleChange} defaultValue={formData.phone} name="phone" type="tel" className="form-control" id="exampleInputPhone" placeholder='Enter phone' pattern="\d{3}-\d{2}-\d{2}-\d{2}" aria-describedby="phoneHelpBlock" maxLength={12} required/>
        <div id="phoneHelpBlock" className="form-text">
          Please, enter your phone in format XXX-XX-XX-XX.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
        <input onChange={handleChange} defaultValue={formData.address} name="address" type="text" className="form-control" id="exampleInputAddress" placeholder='Enter address' required/>
      </div>      
      <button type="submit" className="btn btn-primary w-100 mb-3">{id ? 'Update' : 'Save'}</button>
      <div>
        <Link to="/contact">or get back to contacts</Link>
      </div>
    </form>
  )
}
