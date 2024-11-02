import { useState } from 'react'

import './App.css'
import TestHeader from'./component/text'
import Footer from './jooter'
import Navigation from './pages/auth/Navigation'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
<Navigation />

  </div>
  )
}

export default App
