import React, { useEffect, useRef } from "react";
import Tilt from "./Tilt";
import { motion } from "framer-motion";
import { useBackgroundContext } from "../utils/background.jsx";
import { useLanguage } from "../utils/language";
import { t } from "../utils/translations";
import { gsap, ScrollTrigger } from "gsap/all";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, zoomIn } from "../utils/motion";
import { me, github, instagram, outlook } from "../assets";

const ServiceCard = ({ index, title, icon }) => {
  const { language } = useLanguage();
  
  const getServiceTranslation = (serviceTitle) => {
    if (serviceTitle === "AR/VR Developer") return t('services.arvrDeveloper', language);
    if (serviceTitle === "Unity Developer") return t('services.unityDeveloper', language);
    if (serviceTitle === "Software Engineer") return t('services.softwareEngineer', language);
    if (serviceTitle === "Generative AI Engineer") return t('services.generativeAIEngineer', language);
    return serviceTitle;
  };
  
  return (
    <div className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="w-full p-[1px] rounded-[20px]"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-white rounded-[20px] py-5 px-12 h-[280px] flex flex-col border border-cream-300 shadow-md"
        >
          <div className="flex-1 flex items-center justify-center">
            <img src={icon} alt={title} className="w-22 h-22 object-contain" />
          </div>

          <h3 className="text-black text-[20px] font-bold text-center leading-tight h-[60px] flex items-center justify-center">
            {getServiceTranslation(title)}
          </h3>
        </div>
      </motion.div>
    </div>
  );
};

const About = () => {
  const { setCurrentBG } = useBackgroundContext();
  const { language } = useLanguage();
  const aboutRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Đồng bộ đổi màu với Navbar - cùng điều kiện scrollTop > 100
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Cùng điều kiện với Navbar: scrollTop > 100
      if (scrollTop > 100) {
        setCurrentBG("#FAFCC6");
      } else {
        setCurrentBG("#050816");
      }
    };

    // Kiểm tra ngay khi mount (cho trường hợp hash navigation)
    handleScroll();
    
    // Lắng nghe sự kiện scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setCurrentBG]);

  return (
    <>
      <div ref={aboutRef} className="w-full">
        <motion.div variants={textVariant()} ref={textRef}>
          <div variants={textVariant()}>
            <h2 className="font-heading text-black font-black md:text-[55px] lg:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] leading-tight tracking-wide mb-6 md:mb-7 lg:mb-10">{t('about.title', language)}</h2>
          </div>
        </motion.div>

        <div
          variants={fadeIn("", "", 0.1, 1)}
          className="flex items-start min-[1000px]:flex-row flex-col-reverse gap-8 md:gap-10 lg:gap-16 mt-8 md:mt-10 lg:mt-12"
        >
          <motion.div
            variants={fadeIn("", "", 0.1, 1)}
            className="flex-1 min-[1000px]:max-w-[50%] w-full"
          >
            {/* Left Column - Text */}
            <div className="flex flex-col items-start space-y-5 md:space-y-5.5 lg:space-y-6 pr-0 min-[1000px]:pr-4">
              <p className="text-text-dark text-[17px] md:text-[17px] lg:text-[18px] leading-[1.75] tracking-normal w-full max-w-none">
                {t('about.paragraph1', language)}
              </p>
              <p className="text-text-dark text-[17px] md:text-[17px] lg:text-[18px] leading-[1.75] tracking-normal w-full max-w-none">
                {t('about.paragraph2', language)}
              </p>
              <p className="text-text-dark text-[17px] md:text-[17px] lg:text-[18px] leading-[1.75] tracking-normal w-full max-w-none">
                {t('about.paragraph3', language)}{" "}
                <a href="mailto:sirogamer2001@gmail.com" className="text-[#374151] hover:text-[#1F2937] font-medium transition-colors underline-offset-2">
                  <u>{t('about.emailLink', language)}</u>
                </a>{" "}
                {t('about.paragraph3End', language)}
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={fadeIn("", "", 0.1, 1)}
            className="flex-shrink-0 min-[1000px]:max-w-[45%] w-full flex justify-center min-[1000px]:justify-end"
          >
            {/* Right Column - Photo */}
            <div className="xs:w-[350px] xs:h-[350px] md:w-[380px] md:h-[380px] lg:w-[350px] lg:h-[350px] w-full max-w-[380px] md:max-w-[380px] lg:max-w-[350px]">
              <div className="w-full bg-white rounded-[28px] p-2 shadow-lg border border-cream-300 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-white rounded-[22px] aspect-square flex justify-center items-center overflow-hidden relative">
                  <div 
                    className="w-full h-full rounded-[20px] overflow-hidden"
                    style={{
                      backgroundImage: `url(${me})`,
                      backgroundPosition: '88% 32%',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      transform: 'scale(1.2)',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.25)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1.2)'}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="flex mt-12 md:mt-14 lg:mt-20 gap-4 md:gap-4.5 lg:gap-5 flex-wrap justify-center min-[1000px]:justify-start items-center"
        >
          {/* Instagram Button */}
          <Tilt>
            <div className="green-pink-gradient p-[1px] rounded-full shadow-lg flex justify-center items-center cursor-pointer select-none overflow-hidden hover:shadow-xl transition-shadow w-[180px] md:w-[190px] lg:w-[180px]">
              <a
                href="https://www.instagram.com/ssiiroo09.29/?igsh=emZkOG1neW5hcnht&utm_source=qr#"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <div className="green-pink-gradient rounded-full px-4 py-2.5 flex justify-evenly items-center gap-2 overflow-hidden w-full">
                  <div className="w-[38px] h-[38px] rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img
                      src={instagram}
                      alt="Instagram Logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <p className="text-[18px] md:text-[19px] lg:text-[20px] text-white font-semibold whitespace-nowrap">Instagram</p>
                </div>
              </a>
            </div>
          </Tilt>

          {/* GitHub Button */}
          <Tilt>
            <div className="green-pink-gradient p-[1px] rounded-full shadow-lg flex justify-center items-center cursor-pointer select-none overflow-hidden hover:shadow-xl transition-shadow w-[180px] md:w-[190px] lg:w-[180px]">
              <a
                href="https://github.com/Sirooo2k1"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <div className="green-pink-gradient rounded-full px-4 py-2.5 flex justify-evenly items-center gap-2 overflow-hidden w-full">
                  <div className="w-[38px] h-[38px] rounded-full overflow-hidden flex items-center justify-center green-pink-gradient flex-shrink-0">
                    <img
                      src={github}
                      alt="GitHub Logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <p className="text-[18px] md:text-[19px] lg:text-[20px] text-white font-semibold whitespace-nowrap">GitHub</p>
                </div>
              </a>
            </div>
          </Tilt>

          {/* Email Button */}
          <Tilt>
            <div className="green-pink-gradient p-[1px] rounded-full shadow-lg flex justify-center items-center cursor-pointer select-none overflow-hidden hover:shadow-xl transition-shadow w-[180px] md:w-[190px] lg:w-[180px]">
              <a
                href="mailto:sirogamer2001@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <div className="green-pink-gradient rounded-full px-4 py-2.5 flex justify-evenly items-center gap-2 overflow-hidden w-full">
                  <div className="w-[38px] h-[38px] rounded-full overflow-hidden flex items-center justify-center green-pink-gradient flex-shrink-0">
                    <img
                      src={outlook}
                      alt="Email Logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <p className="text-[18px] md:text-[19px] lg:text-[20px] text-white font-semibold whitespace-nowrap">Email</p>
                </div>
              </a>
            </div>
          </Tilt>
        </motion.div>

        <div className="mt-20 md:mt-22 lg:mt-28 flex flex-wrap gap-6 md:gap-7 lg:gap-10 justify-center">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
