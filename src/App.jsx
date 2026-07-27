import React from 'react'
import Desktop from './components/layout/Desktop';
import Taskbar from './components/layout/Taskbar';

const App = () => {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <Desktop />
      <Taskbar />
    </div>
  )
}

export default App;