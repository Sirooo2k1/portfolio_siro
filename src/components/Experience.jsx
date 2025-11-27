import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { instagramSquare, facebook, line } from "../assets";
import { useLanguage } from "../utils/language";
import { t } from "../utils/translations";

const ExperienceCard = ({ experience, index }) => {
    const { language } = useLanguage();
    const isLeftColumn = index % 2 === 0;
    // Create ID from category for scrolling
    const categoryId = experience.date.replace("Category: ", "").toLowerCase().replace(/\s+/g, "-");
    
    // Get localized content
    const getLocalizedTitle = () => {
      if (experience.titleByLanguage && experience.titleByLanguage[language]) {
        return experience.titleByLanguage[language];
      }
      return experience.title;
    };
    
    const getLocalizedCompanyName = () => {
      if (experience.companyNameByLanguage && experience.companyNameByLanguage[language]) {
        return experience.companyNameByLanguage[language];
      }
      return experience.company_name;
    };
    
    const getLocalizedDate = () => {
      if (experience.dateByLanguage && experience.dateByLanguage[language]) {
        return experience.dateByLanguage[language];
      }
      // Translate category in date
      const dateStr = experience.date;
      if (dateStr.includes("Category: ")) {
        const category = dateStr.replace("Category: ", "");
        let translatedCategory = category;
        if (category === "My Journey") translatedCategory = t('blogCategories.myJourney', language);
        else if (category === "Life in Japan") translatedCategory = t('blogCategories.lifeInJapan', language);
        else if (category === "Cooking") translatedCategory = t('blogCategories.cooking', language);
        else if (category === "Explore & Travel") translatedCategory = t('blogCategories.exploreTravel', language);
        return `Category: ${translatedCategory}`;
      }
      return experience.date;
    };
    
    const getLocalizedPoints = () => {
      if (experience.pointsByLanguage && experience.pointsByLanguage[language]) {
        return experience.pointsByLanguage[language];
      }
      return experience.points;
    };
    
    const localizedTitle = getLocalizedTitle();
    const localizedCompanyName = getLocalizedCompanyName();
    const localizedDate = getLocalizedDate();
    const localizedPoints = getLocalizedPoints();
    return (
      <VerticalTimelineElement
        id={`blog-${categoryId}-${index}`}
        contentStyle={{
          background: "#F3F0EB",
          color: "#111827",
          borderRadius: "24px",
          border: "1px solid #E2DCD4",
          boxShadow: "0 25px 60px -35px rgba(15, 23, 42, 0.35)",
          padding: "28px",
          position: "relative",
        }}
        contentArrowStyle={{ borderRight: "7px solid #F3F0EB" }}
        date={
          <div className={`hidden md:flex items-center h-full w-full ${isLeftColumn ? "justify-end pr-7" : "justify-start pl-7"}`}>
            <span className='flex items-center justify-center px-8 py-3 rounded-3xl bg-[#F2E8C6] text-[#5B21B6] font-semibold text-lg shadow-sm whitespace-nowrap -mt-4 md:-mt-3 lg:-mt-5' style={{ width: 'calc(100% - 56px)' }}>
              {localizedDate}
            </span>
          </div>
        }
        iconStyle={{ 
          background: experience.iconBg, 
          border: "2px solid #D1D5DB",
          boxShadow: "0 0 0 2px #FFFFFF",
          ...(experience.company_name === "Why Did I Even Study Abroad?" || experience.company_name === "The Decision That Changed My Life" || experience.company_name === "The simple joys of cooking" || experience.company_name === "Unforgettable Journeys" ? { borderRadius: "50%" } : {})
        }}
        icon={
          <div className='flex justify-center items-center w-full h-full'>
            <img
              src={experience.icon}
              alt={experience.company_name}
              className={`${
                experience.company_name === "Why Did I Even Study Abroad?" 
                  ? 'w-[85%] h-[85%] rounded-full object-cover' 
                  : experience.company_name === "The simple joys of cooking" || experience.company_name === "Unforgettable Journeys"
                    ? 'w-[85%] h-[85%] rounded-full object-cover object-center'
                  : experience.company_name === "The Decision That Changed My Life"
                    ? 'w-[85%] h-[85%] rounded-full object-cover' 
                    : 'w-[60%] h-[60%] object-contain'
              }`}
              style={experience.company_name === "The simple joys of cooking" || experience.company_name === "Unforgettable Journeys" ? { 
                objectPosition: 'center center',
                display: 'block',
                margin: '0 auto'
              } : {}}
            />
          </div>
        }
      >
        <div className='text-center'>
          <h3 className='text-black text-base md:text-lg lg:text-xl xl:text-[24px] font-bold'>{localizedTitle}</h3>
          <p
            className='text-black text-xs md:text-sm lg:text-base xl:text-[16px] font-semibold'
            style={{ margin: 0 }}
          >
            {localizedCompanyName}
          </p>
        </div>
  
        <ul className='mt-3 md:mt-4 lg:mt-5 list-none space-y-1 md:space-y-1.5 lg:space-y-2'>
          {localizedPoints.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className='text-text-dark text-xs md:text-sm lg:text-[14.5px] xl:text-[15px] leading-relaxed tracking-wide mx-auto'
              style={{ 
                textIndent: index === 0 ? '1.5rem' : '0',
                maxWidth: 'fit-content',
                textAlign: 'left',
                width: 'fit-content'
              }}
            >
              {point}
            </li>
          ))}
        </ul>

        {/* READ MORE Button */}
        {(() => {
          // Map company names to blog slugs
          const blogSlugMap = {
            "Why Did I Even Study Abroad?": "why-did-i-even-study-abroad",
            "The Decision That Changed My Life": "the-decision-that-changed-my-life",
            "The simple joys of cooking": "the-art-of-cooking",
            "Unforgettable Journeys": "exploring-the-world",
          };
          
          const slug = blogSlugMap[experience.company_name];
          
          return slug ? (
            <div className='mt-3 md:mt-4 lg:mt-5 xl:mt-6 flex justify-center'>
              <Link
                to={`/blog/${slug}`}
                className='flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3 bg-[#F3F0EB] hover:bg-[#E8E3DC] transition-colors rounded-lg text-black font-semibold text-[10px] md:text-xs lg:text-sm uppercase tracking-wide'
              >
                <span>{t('experience.readMore', language)}</span>
                <span className='text-black text-lg'>➞</span>
              </Link>
            </div>
          ) : null;
        })()}
      </VerticalTimelineElement>
    );
  
};

const Experience = () => {
  const { language } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const timelineRef = React.useRef(null);

  useEffect(() => {
    // Set mounted immediately
    setIsMounted(true);
    
    const checkDesktop = () => {
      const newIsDesktop = window.innerWidth >= 600;
      setIsDesktop(newIsDesktop);
      // Reset isReady immediately when resizing to ensure content shows right away
      setIsReady(true);
    };
    
    // Check immediately
    checkDesktop();
    
    // Set ready immediately for initial render
    setIsReady(true);
    
    // Listen for resize
    window.addEventListener('resize', checkDesktop);
    
    return () => {
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  if (isDesktop) {  // ON DESKTOP (With Timeline Transition)
    return (
      <>
        <motion.div variants={textVariant()}>
          <h2 className={`${styles.sectionHeadText} text-center`}>
            {t('experience.title', language)}
          </h2>
        </motion.div>

        {/* Siro Branding Section */}
        <motion.div 
          variants={textVariant()}
          className="flex flex-col items-center mt-8 mb-12"
        >
          {/* KIRA Text */}
          <h3 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4 sm:mb-5 md:mb-6">
            SIRO
          </h3>
          
          {/* Decorative Line with Diamond */}
          <div className="relative w-full max-w-md flex items-center justify-center mb-6">
            <div className="absolute w-full h-[2px] bg-[#F2E8C6]" style={{ top: '50%', transform: 'translateY(-50%)' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '50%', transform: 'translate(-50%, -50%)' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 0L13.6842 8.31579L22 11L13.6842 13.6842L11 22L8.31579 13.6842L0 11L8.31579 8.31579L11 0Z" stroke="#F2E8C6" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>

          {/* SIRO PROGRAMMING Text */}
          <p className="text-black text-[10px] md:text-xs lg:text-sm xl:text-base font-lora uppercase tracking-wide mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8">
            SIRO PROGRAMMING
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-4" style={{ marginTop: '-10px' }}>
            <a 
              href="https://www.instagram.com/ssiiroo09.29/?igsh=emZkOG1neW5hcnht&utm_source=qr#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ 
                width: '35px', 
                height: '35px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img 
                src={instagramSquare} 
                alt="Instagram" 
                style={{ 
                  width: '35px', 
                  height: '35px', 
                  objectFit: 'cover',
                  display: 'block',
                  margin: '0',
                  padding: '0',
                  maxWidth: '35px',
                  maxHeight: '35px',
                  transform: 'scale(0.7)'
                }}
              />
            </a>
            <a 
              href="https://www.facebook.com/luyen.xuan.35325" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ 
                width: '35px', 
                height: '35px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img 
                src={facebook} 
                alt="Facebook" 
                style={{ 
                  width: '35px', 
                  height: '35px', 
                  objectFit: 'cover',
                  display: 'block',
                  margin: '0',
                  padding: '0',
                  maxWidth: '35px',
                  maxHeight: '35px',
                  transform: 'scale(0.7)'
                }}
              />
            </a>
            <a 
              href="https://line.me/ti/p/fLANiVUEXe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ 
                width: '35px', 
                height: '35px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img 
                src={line} 
                alt="Line" 
                style={{ 
                  width: '35px', 
                  height: '35px', 
                  objectFit: 'cover',
                  display: 'block',
                  margin: '0',
                  padding: '0',
                  maxWidth: '35px',
                  maxHeight: '35px',
                  transform: 'scale(0.7)'
                }}
              />
            </a>
          </div>

          {/* Welcome Text */}
          <motion.div 
            variants={textVariant()}
            className="mt-8 max-w-2xl mx-auto px-4"
          >
            <p className="text-black text-xs md:text-sm lg:text-base xl:text-lg font-lora leading-relaxed text-center italic px-2">
              {t('experience.welcome', language)} <span className="font-semibold">{t('experience.happyReading', language)}</span>
            </p>
          </motion.div>
        </motion.div>
  
        <div className='mt-20 flex flex-col' ref={timelineRef}>
          {isReady ? (
            <VerticalTimeline>
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={`experience-${index}`}
                  experience={experience}
                  index={index}
                />
              ))}
            </VerticalTimeline>
          ) : (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-pulse text-[#6B7280]">{t('experience.loading', language)}</div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  } else {  // ON MOBILE (No Timeline Transition)
    return (
      <>
        <motion.div variants={textVariant()}>
          <h2 className={`${styles.sectionHeadText} text-center`}>
            {t('experience.title', language)}
          </h2>
        </motion.div>

        {/* KIRA Branding Section */}
        <motion.div 
          variants={textVariant()}
          className="flex flex-col items-center mt-8 mb-12"
        >
          {/* KIRA Text */}
          <h3 className="text-black text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-wide mb-3 md:mb-4 lg:mb-5 xl:mb-6">
            KIRA
          </h3>
          
          {/* Decorative Line with Diamond */}
          <div className="relative w-full max-w-md flex items-center justify-center mb-6">
            <div className="absolute w-full h-[2px] bg-[#F2E8C6]" style={{ top: '50%', transform: 'translateY(-50%)' }}></div>
            <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '50%', transform: 'translate(-50%, -50%)' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 0L13.6842 8.31579L22 11L13.6842 13.6842L11 22L8.31579 13.6842L0 11L8.31579 8.31579L11 0Z" stroke="#F2E8C6" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>

          {/* SIRO PROGRAMMING Text */}
          <p className="text-black text-[10px] md:text-xs lg:text-sm xl:text-base font-lora uppercase tracking-wide mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8">
            SIRO PROGRAMMING
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-4" style={{ marginTop: '-10px' }}>
            <a 
              href="https://www.instagram.com/ssiiroo09.29/?igsh=emZkOG1neW5hcnht&utm_source=qr#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ 
                width: '35px', 
                height: '35px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img 
                src={instagramSquare} 
                alt="Instagram" 
                style={{ 
                  width: '35px', 
                  height: '35px', 
                  objectFit: 'cover',
                  display: 'block',
                  margin: '0',
                  padding: '0',
                  maxWidth: '35px',
                  maxHeight: '35px',
                  transform: 'scale(0.7)'
                }}
              />
            </a>
            <a 
              href="https://www.facebook.com/luyen.xuan.35325" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ 
                width: '35px', 
                height: '35px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img 
                src={facebook} 
                alt="Facebook" 
                style={{ 
                  width: '35px', 
                  height: '35px', 
                  objectFit: 'cover',
                  display: 'block',
                  margin: '0',
                  padding: '0',
                  maxWidth: '35px',
                  maxHeight: '35px',
                  transform: 'scale(0.7)'
                }}
              />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ 
                width: '35px', 
                height: '35px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img 
                src={line} 
                alt="Line" 
                style={{ 
                  width: '35px', 
                  height: '35px', 
                  objectFit: 'cover',
                  display: 'block',
                  margin: '0',
                  padding: '0',
                  maxWidth: '35px',
                  maxHeight: '35px',
                  transform: 'scale(0.7)'
                }}
              />
            </a>
          </div>

          {/* Welcome Text */}
          <motion.div 
            variants={textVariant()}
            className="mt-8 max-w-2xl mx-auto px-4"
          >
            <p className="text-black text-xs md:text-sm lg:text-base xl:text-lg font-lora leading-relaxed text-center italic px-2">
              {t('experience.welcome', language)} <span className="font-semibold">{t('experience.happyReading', language)}</span>
            </p>
          </motion.div>
        </motion.div>
  
        <div className='mt-20 flex flex-col'>
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
                index={index}
              />
            ))}
        </div>
      </>
    );
  }

};

export default SectionWrapper(Experience, "work");
