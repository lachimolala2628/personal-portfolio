import React from 'react'
import Desktop from './components/layout/Desktop';
import Taskbar from './components/layout/Taskbar';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <Navbar />
      <Desktop />
      <Taskbar />
    </div>
  )
}

export default App;