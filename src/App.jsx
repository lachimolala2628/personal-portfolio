import React from 'react';
import './index.css';
import './responsive.css';
import Header from './components/Header';
import Whoami from './components/Whoami';
import Whatdoi from './components/Whatdoi';
import Whatiuse from './components/Whatiuse';
import Projects from './components/Projects';
import Canido from './components/Canido';
import Coffee from './components/Coffee';
import Footer from './components/Footer';
import Cursor from './components/Cursor';



const App = () => {
  return (
    <div className="relative min-h-screen bg-[#f1faee] px-8 text-[#457b9d]">
      <Cursor />
      <Header />
      <Whoami />
      <Whatdoi />
      <Whatiuse />
      <Projects />
      <Canido />
      <Coffee />
      <Footer />
    </div>
  );
};


export default App;
