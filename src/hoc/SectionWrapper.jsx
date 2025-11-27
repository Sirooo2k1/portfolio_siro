import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.12, margin: "-30px" });
    const hasAnimated = useRef(false);

    useEffect(() => {
      if (isInView) {
        if (!hasAnimated.current) {
          // First time: animate normally
          controls.start('show');
          hasAnimated.current = true;
        } else {
          // Scroll back up: show immediately without animation
          controls.set('show');
        }
      }
    }, [isInView, controls]);

    return (
      <motion.section
        ref={ref}
        variants={staggerContainer()}
        initial='hidden'
        animate={controls}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        style={{ willChange: 'transform, opacity' }}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
