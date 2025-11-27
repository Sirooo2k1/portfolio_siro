import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBackgroundContext } from './utils/background.jsx'
import { About, Contact, Experience, Feedbacks, Programs, Hero, Navbar, Tech, Works, StarsCanvas, BlogPost } from "./components";
import { BsArrowUp } from 'react-icons/bs'

const App = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { appRef } = useBackgroundContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className='relative z-0 bg-primary' style={{ backgroundColor: '#FAFCC6' }} ref={appRef} >
                <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                  <Navbar />
                  <Hero />
                </div>
                <About />
                <Experience />
                <Tech />
                <Works />
                {/* <Feedbacks /> */}
                <Programs />
                <div className='relative z-0'>
                  <Contact />
                  {/* <StarsCanvas /> */}
                </div>
              </div>

              {showBackToTop && (
                <button
                  className="fixed bottom-4 right-4 p-3 rounded-full bg-[#374151] text-white shadow-lg cursor-pointer backToTop transition-colors hover:bg-[#1f2937]"
                  onClick={handleBackToTop}
                >
                  <BsArrowUp />
                </button>
              )}
            </>
          }
        />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
