import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Info from './info'
import Main from './main'

function App() {

    return (
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/info/:countryname' element={<Info />} />
        </Routes>
    )
}

export default App