import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { programs } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, zoomIn } from "../utils/motion";
import { useLanguage } from "../utils/language";
import { t } from "../utils/translations";

const ProgramCard = ({
  index,
  company,
  title,
  description,
  date,
  icon,
  program, // Pass the full program object for translations
}) => {
  const { language } = useLanguage();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Get localized content
  const localizedCompany = program?.companyByLanguage?.[language] || company;
  const localizedTitle = program?.titleByLanguage?.[language] || title;
  const localizedDescription = program?.descriptionByLanguage?.[language] || description;
  
  // Calculate responsive scale values for Swinburne and freeCodeCamp
  const getSwinburneScale = () => {
    if (windowWidth < 768) return '1.1';
    if (windowWidth < 1024) return '1.3';
    return '1.2'; // Giữ nguyên như ban đầu cho desktop
  };
  
  const getFreeCodeCampScale = () => {
    if (windowWidth < 768) return '1.1';
    if (windowWidth < 1024) return '1.3';
    return '1.2'; // Giữ nguyên như ban đầu cho desktop
  };
  
  return (
  <div className='w-full min-[768px]:w-[calc((100%-0.5rem)/2)] min-[1280px]:w-[calc((100%-25px)/2)]'>
    <motion.div
      variants={fadeIn(index % 2 === 0 ? "right" : "left", "spring", (Math.floor(index / 2 ) + 1) * 0.5, 0.55)}
      className='w-full bg-cream-200 rounded-2xl md:rounded-[24px] p-1 shadow-md border border-cream-300 h-full'
    >
      <div       className={`bg-white rounded-xl md:rounded-[22px] px-4 md:px-5 lg:px-10 flex flex-col justify-between h-full ${
        index <= 5 
          ? 'py-4 md:py-4.5 lg:py-5 min-h-[220px] md:min-h-[235px] lg:min-h-[240px]' 
          : 'py-5 md:py-5.5 lg:py-6 min-h-[260px] md:min-h-[270px] lg:min-h-[280px]'
      }`}>
        <div className={`flex justify-between items-start ${
          index <= 5 
            ? 'gap-3 md:gap-3 lg:gap-5' 
            : 'gap-3 md:gap-4 lg:gap-6'
        }`}>
          <div className='flex-1 flex flex-col gap-1.5 min-w-0 overflow-visible'>
            <h3 className={`text-black font-bold break-words ${
              index <= 5 
                ? 'text-base md:text-lg lg:text-[20px] xl:text-[22px]' 
                : 'text-lg md:text-xl lg:text-[21px] xl:text-[24px]'
            }`}>{localizedTitle}</h3>
            <p className={`text-text-medium font-medium break-words ${
              index <= 5 
                ? 'text-xs md:text-sm lg:text-[14.5px] xl:text-[15px]' 
                : 'text-xs md:text-sm lg:text-[15px] xl:text-[16px]'
            }`}>{localizedCompany}</p>
          </div>

          <div className={`${
            company === 'Cybersecurity Journey' 
              ? 'w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 flex items-center justify-center overflow-hidden rounded-full flex-shrink-0' 
              : 'w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 flex items-center justify-center overflow-visible flex-shrink-0'
          }`}>
            <img
              src={icon}
              alt={`${company} logo`}
              className={`${
                company === 'Cybersecurity Journey' ? 'object-cover' : 'object-contain'
              } ${
                index <= 5 
                  ? 'w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20' 
                  : 'w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20'
              }`}
              style={company === 'Swinburne University Lecturer' ? { 
                imageRendering: 'crisp-edges',
                WebkitImageRendering: '-webkit-optimize-contrast',
                transform: `scale(${getSwinburneScale()})`,
                transformOrigin: 'center',
                filter: 'contrast(1.15) saturate(1.1)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              } : company === 'freeCodeCamp' ? {
                imageRendering: 'crisp-edges',
                WebkitImageRendering: '-webkit-optimize-contrast',
                transform: `scale(${getFreeCodeCampScale()})`,
                transformOrigin: 'center',
                filter: 'contrast(1.2) saturate(1.15) brightness(1.05)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              } : company === 'Hagoromo University' && title.includes('Game Programming') ? {
                imageRendering: 'crisp-edges',
                WebkitImageRendering: '-webkit-optimize-contrast',
                transform: 'scale(1.15)',
                transformOrigin: 'center',
                filter: 'contrast(1.1) saturate(1.1) brightness(1.02)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              } : company === 'Cybersecurity Journey' ? {
                imageRendering: 'crisp-edges',
                WebkitImageRendering: '-webkit-optimize-contrast',
                transform: 'scale(2.3)',
                transformOrigin: 'center center',
                objectPosition: 'center center',
                filter: 'contrast(1.15) saturate(1.1) brightness(1.05)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                width: '100%',
                height: '100%'
              } : company === 'AWS Learning Path' ? {
                imageRendering: 'crisp-edges',
                WebkitImageRendering: '-webkit-optimize-contrast',
                transform: 'scale(1.2)',
                transformOrigin: 'center',
                filter: 'contrast(1.15) saturate(1.1) brightness(1.05)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              } : {}}
              loading="eager"
            />
          </div>
        </div>

        <div className="flex justify-start mt-2">
          <p className={`${
            index <= 5 
              ? 'text-xs md:text-[12.5px] lg:text-[13px]' 
              : 'text-sm md:text-[14.5px] lg:text-[16px]'
          } text-[#5B21B6] bg-[#F2E8C6] px-3 md:px-4 lg:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl inline-block font-medium shadow-sm text-center whitespace-nowrap w-fit`}><i>{date}</i></p>
        </div>

        <div className={`flex-1 flex ${index <= 5 ? 'mt-2.5 md:mt-3' : 'mt-3 md:mt-4'}`}>
          <p 
            className={`text-text-dark tracking-normal ${
              index === 3 ? 'whitespace-pre' : 'whitespace-pre-line'
            } ${
              index <= 5
                ? 'text-xs md:text-[13px] lg:text-[14px]'
                : 'text-sm md:text-[14px] lg:text-[15px] leading-relaxed'
            } ${index === 2 || index === 3 ? 'leading-[1.5]' : index <= 5 ? 'leading-[1.65]' : ''}`}
            style={{
              wordBreak: 'normal',
              overflowWrap: 'break-word',
              textAlign: 'left',
              textRendering: 'optimizeLegibility',
              WebkitHyphens: 'none',
              hyphens: 'none',
              ...(index === 2 || index === 3 ? {
                lineHeight: '1.5',
                marginBottom: '-0.1em'
              } : {}),
              ...(index === 3 ? {
                whiteSpace: 'pre-wrap'
              } : {})
            }}
          >
            {localizedDescription}
          </p>
        </div>
      </div>
    </motion.div>
  </div>
  );
};

const Programs = () => {
  const { language } = useLanguage();
  return (
    <div className='mt-12 bg-cream-200 rounded-[40px] shadow-lg border border-cream-300 p-[6px]'>
      <div className={`bg-white rounded-[32px] border border-cream-200 ${styles.padding} min-h-[300px] flex items-center justify-center`}> 
        <motion.div variants={textVariant()} className='flex justify-center items-center min-[360px]:justify-center min-[360px]:items-center w-full'>
          <h2 className={`${styles.sectionHeadText} text-center min-[360px]:text-center`}>{t('programs.title', language)}</h2>
        </motion.div>
      </div>
      <div className={`-mt-12 md:-mt-14 lg:-mt-20 pb-10 md:pb-11 lg:pb-14 ${styles.paddingX} flex flex-wrap gap-3 md:gap-2 lg:gap-2 min-[1280px]:gap-[25px] justify-center min-[768px]:justify-start items-stretch`}>
        {programs.map((program, index) => (
          <ProgramCard
            key={`${program.company}-${program.title}-${index}`}
            index={index}
            {...program}
            program={program}
          />
        ))}
      </div>
    </div>
  );
};
  
  export default SectionWrapper(Programs, "programs");