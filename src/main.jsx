import { createRoot } from 'react-dom/client'
import './index.css'


import App from './js/App.jsx'
import { ContactProvider } from './js/store/ContactProvider.jsx'

createRoot(document.getElementById('root')).render(
  <ContactProvider>
    <App />
  </ContactProvider>,
)
