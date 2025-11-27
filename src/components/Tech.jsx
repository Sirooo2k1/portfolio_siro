import React from "react";
import Tilt from "./Tilt";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { useLanguage } from "../utils/language";
import { t } from "../utils/translations";

const Tech = () => {
  const { language } = useLanguage();
  return (
    <>
      <motion.div variants={textVariant()} className="pb-5">
        <h2 className={`${styles.sectionHeadText} text-center`} alt="My Skills, Technologies, and Tech Stack">
          {t('tech.title', language)}
        </h2>
      </motion.div>
      
      <div className='flex flex-row flex-wrap justify-center gap-6 md:gap-10'>
        {technologies.map((technology, index) => (
          <motion.div
          variants={textVariant((index+9) * .05)}
          key={technology.name}
          >
            <div className='xs:w-[115px] w-full'>
              <div className='w-20 h-20 xs:w-24 xs:h-24 sm:w-26 sm:h-26 p-[2px] bg-gradient-to-b from-teal-300 via-sky-400 to-purple-400 rounded-full shadow-lg flex items-center justify-center' style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' }}>
                <div className='bg-cream-200 rounded-full py-4 xs:py-5 sm:py-5.5 flex justify-evenly items-center flex-col w-full h-full'>
                  <img src={technology.icon} className='w-12 h-12 xs:w-14 xs:h-14 sm:w-15 sm:h-15 object-contain drop-shadow-md' alt={technology.name} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
