
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import UpcomingEvents from './components/UpcomingEvents';
import MenuPreview from './components/MenuPreview';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-herz-black text-herz-cream selection:bg-herz-gold selection:text-herz-black font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <UpcomingEvents />
        <Events />
        <MenuPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
