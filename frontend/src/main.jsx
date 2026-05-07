import { createRoot } from 'react-dom/client'
import './index.css'
import Roots from './Roots'

import { AppProvider } from './contexts/appContext/AppProvider.jsx'




createRoot(document.getElementById('root')).render(
  <AppProvider>
    <Roots/>
  </AppProvider>
)
