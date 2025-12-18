import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { RobotCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useBackgroundContext } from "../utils/background";
import { useLanguage } from "../utils/language";
import { t } from "../utils/translations";
import { gsap, ScrollTrigger} from "gsap/all";

const Contact = () => {
  const {setCurrentBG} = useBackgroundContext()
  const { language } = useLanguage();
  const contactRef = useRef(null)
  const textRef = useRef(null)

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = "service_sw24ukd"; // Service ID
  const EMAILJS_TEMPLATE_ID = "template_anxsffi"; // Template ID (phải bắt đầu bằng "template_")
  const EMAILJS_PUBLIC_KEY = "gjXlJ8IsosmTpdXBs"; // Public Key
  const YOUR_EMAIL = "sirosiro2k1@gmail.com"; // Email để nhận thư

  // Initialize EmailJS khi component mount
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    if (!contactRef.current || !textRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
        end: "+=00 60%",
        scrub: 0.8,
        pinSpacing: false,
        onEnter: () => {
          setCurrentBG('#FAFCC6');
          if (textRef.current) {
          gsap.to(textRef.current, {
            color: '#282828',
            duration: 0.6
          })
          }
        },
        onLeaveBack: () => {
          setCurrentBG('#FAFCC6');
          if (textRef.current) {
          gsap.to(textRef.current, {
            duration: 0.6
          })
        }
        }
      }
    })
    
    return () => {
      if (timeline) {
        timeline.kill();
      }
      // Clean up any ScrollTriggers associated with this component
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === contactRef.current) {
          trigger.kill();
        }
      });
    };
  }, [setCurrentBG])

  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: 'success', message: '' });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setNotification({
        show: true,
        type: 'error',
        message: t('contact.validation', language)
      });
      setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 4000);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setNotification({
        show: true,
        type: 'error',
        message: t('contact.invalidEmail', language)
      });
      setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 4000);
      return;
    }

    setLoading(true);

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Siro",
          from_email: form.email,
          to_email: YOUR_EMAIL,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

          setLoading(false);
      console.log("EmailJS Success:", result);
      
      // Show success notification
      setNotification({
        show: true,
        type: 'success',
        message: t('contact.success', language)
      });
      
      // Hide notification after 5 seconds
      setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 5000);

      // Reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
          setLoading(false);
      console.error("EmailJS Error Details:", {
        text: error.text,
        status: error.status,
        message: error.message,
        fullError: error
      });

      // Show error notification
      let errorMessage = t('contact.error', language);
      if (error.text) {
        errorMessage += ` ${error.text}`;
      }
      
      setNotification({
        show: true,
        type: 'error',
        message: errorMessage
      });
      
      // Hide notification after 5 seconds
      setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 5000);
    }
  };

  return (
    <>
      {/* Success/Error Notification */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className={`fixed top-4 md:top-6 right-4 md:right-6 z-50 max-w-md w-full md:w-auto`}
        >
          <div
            className={`${
              notification.type === 'success'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                : 'bg-gradient-to-r from-red-500 to-rose-600'
            } text-white px-6 py-4 rounded-xl shadow-2xl border-2 ${
              notification.type === 'success' ? 'border-green-400' : 'border-red-400'
            } flex items-center gap-4 backdrop-blur-sm`}
          >
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <svg
                  className="w-6 h-6 md:w-7 md:h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 md:w-7 md:h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
            <p className="flex-1 text-sm md:text-base font-semibold leading-relaxed">
              {notification.message}
            </p>
            <button
              onClick={() => setNotification({ show: false, type: 'success', message: '' })}
              className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close notification"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      <div
        ref={contactRef}
        className={`mt-8 md:mt-9 lg:mt-12 xl:mt-12 flex xl:flex-row flex-col-reverse gap-6 md:gap-7 lg:gap-10 overflow-hidden`}
      >
      <motion.div
        ref={textRef}
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-cream-200 p-6 md:p-7 lg:p-10 rounded-3xl md:rounded-[32px] lg:rounded-[40px] border border-cream-300 text-black'
      >
        <h3 className={`${styles.sectionHeadText} text-black text-center`}>{t('contact.title', language)}</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-8 md:mt-10 lg:mt-12 flex flex-col gap-6 md:gap-7 lg:gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-black font-semibold mb-3 md:mb-4 text-sm md:text-base'>{t('contact.yourName', language)}</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder={t('contact.namePlaceholder', language)}
              className='bg-white py-3 px-4 md:py-4 md:px-6 placeholder:text-text-light text-black rounded-lg md:rounded-xl outline-none border border-cream-300 focus:border-[#F2E8C6] transition-colors font-medium text-sm md:text-base'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-black font-semibold mb-3 md:mb-4 text-sm md:text-base'>{t('contact.yourEmail', language)}</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder={t('contact.emailPlaceholder', language)}
              className='bg-white py-3 px-4 md:py-4 md:px-6 placeholder:text-text-light text-black rounded-lg md:rounded-xl outline-none border border-cream-300 focus:border-[#F2E8C6] transition-colors font-medium text-sm md:text-base'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-black font-semibold mb-3 md:mb-4 text-sm md:text-base'>{t('contact.yourMessage', language)}</span>
            <textarea
              rows={6}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder={t('contact.messagePlaceholder', language)}
              className='bg-white py-3 px-4 md:py-4 md:px-6 placeholder:text-text-light text-black rounded-lg md:rounded-xl outline-none border border-cream-300 focus:border-[#F2E8C6] transition-colors font-medium resize-none text-sm md:text-base'
            />
          </label>

          <button
            type='submit'
            className='bg-[#F2E8C6] hover:bg-[#EADCB0] transition-colors py-2.5 px-6 md:py-3 md:px-8 rounded-xl md:rounded-2xl outline-none w-full md:w-fit text-[#5B21B6] font-bold shadow-md shadow-primary text-sm md:text-base'
          >
            {loading ? t('contact.sending', language) : t('contact.send', language)}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto h-[280px] md:h-[450px] lg:h-[550px]'
      >
        <RobotCanvas />
      </motion.div>
    </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
