import React, { useEffect, useRef } from "react";
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
  
  // Get localized content
  const localizedCompany = program?.companyByLanguage?.[language] || company;
  const localizedTitle = program?.titleByLanguage?.[language] || title;
  const localizedDescription = program?.descriptionByLanguage?.[language] || description;
  
  return (
  <div className='w-full md:w-[48%]'>
    <motion.div
      variants={fadeIn(index % 2 === 0 ? "right" : "left", "spring", (Math.floor(index / 2 ) + 1) * 0.5, 0.55)}
      className='w-full bg-cream-200 rounded-[24px] p-1 shadow-md border border-cream-300 h-full'
    >
      <div className={`bg-white rounded-[22px] px-10 flex flex-col justify-between h-full ${
        index <= 5 
          ? 'py-5 min-h-[240px]' 
          : 'py-6 min-h-[280px]'
      }`}>
        <div className={`flex justify-between items-center ${
          index <= 5 
            ? 'gap-5' 
            : 'gap-6'
        }`}>
          <div className='flex-1 flex flex-col gap-1.5'>
            <h3 className={`text-black font-bold ${
              index <= 5 
                ? 'text-[22px]' 
                : 'text-[24px]'
            }`}>{localizedTitle}</h3>
            <p className={`text-text-medium font-medium ${
              index <= 5 
                ? 'text-[15px]' 
                : 'text-[16px]'
            }`}>{localizedCompany}</p>
            <p className={`${
              index <= 5 
                ? 'text-[13px]' 
                : 'sm:text-[16px] text-[14px]'
            } text-[#5B21B6] bg-[#F2E8C6] px-6 py-2 rounded-2xl inline-block font-medium shadow-sm text-center whitespace-nowrap mx-auto md:mx-0 mt-0.5`}><i>{date}</i></p>
          </div>

          <div className={company === 'Swinburne University Lecturer' || company === 'freeCodeCamp' || (company === 'Hagoromo University' && title.includes('Game Programming')) || company === 'AWS Learning Path' ? 'w-20 h-20 flex items-center justify-center overflow-visible' : company === 'Cybersecurity Journey' ? 'w-20 h-20 flex items-center justify-center overflow-hidden rounded-full' : ''}>
            <img
              src={icon}
              alt={`${company} logo`}
              className={`${
                company === 'Cybersecurity Journey' ? 'object-cover' : 'object-contain'
              } ${
                index <= 5 
                  ? 'w-20 h-20' 
                  : 'w-16 h-16'
              }`}
              style={company === 'Swinburne University Lecturer' ? { 
                width: '80px',
                height: '80px',
                imageRendering: 'crisp-edges',
                WebkitImageRendering: '-webkit-optimize-contrast',
                transform: 'scale(1.2)',
                transformOrigin: 'center',
                filter: 'contrast(1.15) saturate(1.1)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              } : company === 'freeCodeCamp' ? {
                width: '80px',
                height: '80px',
                imageRendering: 'crisp-edges',
                WebkitImageRendering: '-webkit-optimize-contrast',
                transform: 'scale(1.2)',
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

        <div className={`flex-1 flex ${index <= 5 ? 'mt-3' : 'mt-4'}`}>
          <p 
            className={`text-text-dark tracking-normal ${
              index === 3 ? 'whitespace-pre' : 'whitespace-pre-line'
            } ${
              index <= 5
                ? 'text-[14px]'
                : 'text-[15px] leading-relaxed'
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
      <div className={`bg-white rounded-[32px] border border-cream-200 ${styles.padding} min-h-[300px]`}> 
        <motion.div variants={textVariant()} className='flex justify-center'>
          <h2 className={`${styles.sectionHeadText} text-center`}>{t('programs.title', language)}</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center md:justify-between items-stretch`}>
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