export const textVariant = (delay) => {
  // Always return variants - let Framer Motion handle animations
  // Slightly optimized for smoother animations
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.9,
        delay: delay ? delay * 0.7 : 0,
        stiffness: 100,
        damping: 10,
      },
    },
  };
};

export const fadeIn = (direction, type, delay, duration) => {
  // Always return variants - let Framer Motion handle animations
  // Slightly optimized for smoother animations
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay ? delay * 0.7 : 0,
        duration: duration ? duration * 0.8 : 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

export const zoomIn = (delay, duration) => {
  // Always return variants - let Framer Motion handle animations
  // Slightly optimized for smoother animations
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay ? delay * 0.7 : 0,
        duration: duration ? duration * 0.8 : 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

export const slideIn = (direction, type, delay, duration) => {
  // Always return variants - let Framer Motion handle animations
  // Slightly optimized for smoother animations
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay ? delay * 0.7 : 0,
        duration: duration ? duration * 0.8 : 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

export const staggerContainer = (staggerChildren, delayChildren) => {
  // Always return variants - let Framer Motion handle animations
  // Slightly optimized for smoother animations
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren ? staggerChildren * 0.7 : 0.2,
        delayChildren: delayChildren ? delayChildren * 0.7 : 0,
      },
    },
  };
};
