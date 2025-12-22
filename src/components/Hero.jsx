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

  // Smooth scroll helper - uses native smooth scroll for better performance on both desktop and mobile
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

    // Use native smooth scroll for both desktop and mobile for better performance
    // Native smooth scroll is optimized by the browser and performs better than custom animations
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });
  };

  const handleScrollClick = (e) => {
    e.preventDefault();
    smoothScrollTo('about');
  };

  useEffect(() => {
    if (!heroRef.current) return;
    
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
          <div className='w-[28px] h-[50px] md:w-[32px] md:h-[58px] lg:w-[35px] lg:h-[64px] rounded-3xl border-2 md:border-[3px] lg:border-4 border-secondary flex justify-center items-start p-1.5 md:p-2'>
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
