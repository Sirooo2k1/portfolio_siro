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


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
        end: "+=00 60%",
        scrub: 0.8,
        pinSpacing: false,
        onEnter: () => {
          setCurrentBG('#FAFCC6');
          gsap.to(textRef.current, {
            color: '#282828',
            duration: 0.6
          })
        },
        onLeaveBack: () => {
          setCurrentBG('#FAFCC6');
          gsap.to(textRef.current, {
            duration: 0.6
          })
        }
      }
    })
  }, [])

  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

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
      alert(t('contact.validation', language) || "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert(t('contact.invalidEmail', language) || "Email không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }

    setLoading(true);

    try {
      const result = await emailjs.send(
        "REDACTED_EMAILJS_SERVICE_ID",
        "REDACTED_EMAILJS_TEMPLATE_ID",
        {
          from_name: form.name,
          to_name: "Siro",
          from_email: form.email,
          to_email: "REDACTED_EMAIL",
          message: form.message,
        },
        "REDACTED_EMAILJS_PUBLIC_KEY"
      );

          setLoading(false);
      console.log("EmailJS Success:", result);
          alert(t('contact.success', language));

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

      // Show more detailed error message
      let errorMessage = t('contact.error', language);
      if (error.text) {
        errorMessage += `\n\nChi tiết lỗi: ${error.text}`;
        }
      alert(errorMessage);
    }
  };

  return (
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
  );
};

export default SectionWrapper(Contact, "contact");
