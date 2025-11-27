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
    <section ref={heroRef} className={`relative w-full h-screen mx-auto overflow-hidden`}>
      
      <MagicCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center flex-col z-10'>

        <div className="w-fit mx-auto flex items-center justify-center gap-6 bg-tertiary lg:px-7 lg:py-3 px-4 py-2 rounded-xl lg:mt-10 mt-5 max-[350px]:hidden select-none">
          <p className='text-black font-semibold'>{heroText.tryClicking}</p>
        </div>


        <a href='#about' className="w-fit mx-auto flex items-center justify-center gap-6 bg-tertiary lg:px-7 lg:py-3 px-4 py-2 rounded-xl lg:mt-10 mt-5 cursor-pointer max-[350px]:hidden select-none">
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
          <p className='text-black font-semibold'>{heroText.scrollDown}</p>
        </a>
      </div>
    </section>
  );
};

export default Hero;
