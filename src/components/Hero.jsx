import { motion } from "framer-motion";
import { useEffect, useRef, useMemo } from "react";
import { gsap, ScrollTrigger } from "gsap/all";
import { useBackgroundContext } from "../utils/background.jsx";
import { useLanguage } from "../utils/language";
import { t } from "../utils/translations";

import { styles } from "../styles";
// import { ComputersCanvas } from "./canvas";
import { MagicCanvas } from "./canvas";

const Hero = () => {
  const { setCurrentBG } = useBackgroundContext();
  const { language } = useLanguage();
  const heroRef = useRef(null);

  // Memoize text để tránh re-render không cần thiết
  const heroText = useMemo(() => ({
    tryClicking: t('hero.tryClicking', language),
    scrollDown: t('hero.scrollDown', language),
  }), [language]);

  // Smooth scroll helper optimized for mobile/iPad
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Get navbar height
    const navbar = document.querySelector('nav');
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
    
    // Hash-span has margin-top: -100px, so actual section starts at element position + 100px
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    
    // Scroll to section start (after hash-span padding) with smaller offset for closer positioning
    const targetPosition = elementTop + 100 - navbarHeight - 30;

    // Use custom smooth scroll for mobile/iPad for better performance
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = Math.min(Math.abs(distance) * 0.4, 800); // Faster and smoother for mobile
      
      let startTime = null;
      
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      const animateScroll = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
    } else {
      // For desktop, use native smooth scroll
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      });
    }
  };

  const handleScrollClick = (e) => {
    e.preventDefault();
    smoothScrollTo('about');
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero chỉ quản lý màu khi ở trong Hero section
    // Khi rời khỏi Hero, để logic scroll chung quản lý màu
    // Chỉ chạy một lần khi mount, không phụ thuộc vào language
    const heroTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: false,
        onEnterBack: () => {
          // Chỉ đổi màu về đen khi quay lại Hero (scrollTop <= 100)
          setCurrentBG("#050816");
        },
      },
    });

    return () => {
      heroTrigger.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === heroRef.current) {
          trigger.kill();
        }
      });
    };
    // Chỉ chạy một lần khi mount, không phụ thuộc vào language hoặc setCurrentBG
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={heroRef} className={`relative w-full h-screen mx-auto overflow-hidden touch-pan-y`}>
      
      <MagicCanvas />

      <div className='absolute xs:bottom-10 bottom-32 md:bottom-12 lg:bottom-10 w-full flex justify-center items-center flex-col z-10 px-4 md:px-6 lg:px-0'>

        <div className="w-fit mx-auto flex items-center justify-center gap-3 md:gap-5 lg:gap-6 bg-tertiary px-3 py-1.5 md:px-5 md:py-2.5 lg:px-7 lg:py-3 rounded-lg md:rounded-xl lg:mt-10 mt-4 md:mt-6 lg:mt-5 max-[350px]:hidden select-none">
          <p className='text-black font-semibold text-xs md:text-sm lg:text-base'>{heroText.tryClicking}</p>
        </div>


        <a href='#about' onClick={handleScrollClick} className="w-fit mx-auto flex items-center justify-center gap-3 md:gap-5 lg:gap-6 bg-tertiary px-3 py-1.5 md:px-5 md:py-2.5 lg:px-7 lg:py-3 rounded-lg md:rounded-xl lg:mt-10 mt-3 md:mt-4 lg:mt-5 cursor-pointer max-[350px]:hidden select-none">
          <div className='w-[28px] h-[50px] md:w-[32px] md:h-[58px] lg:w-[35px] lg:h-[64px] rounded-3xl border-3 md:border-4 border-secondary flex justify-center items-start p-1.5 md:p-2'>
            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-2.5 h-2.5 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full bg-secondary mb-1'
            />
          </div>
          <p className='text-black font-semibold text-xs md:text-sm lg:text-base'>{heroText.scrollDown}</p>
        </a>
      </div>
    </section>
  );
};

export default Hero;
