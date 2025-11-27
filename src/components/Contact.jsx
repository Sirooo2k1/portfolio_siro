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
        scrub: true,
        pinSpacing: false,
        onEnter: () => {
          setCurrentBG('#FAFCC6');
          gsap.to(textRef.current, {
            color: '#282828',
            duration: 1
          })
        },
        onLeaveBack: () => {
          setCurrentBG('#FAFCC6');
          gsap.to(textRef.current, {
            duration: 1
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
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
      )
      .then(
        () => {
          setLoading(false);
          alert(t('contact.success', language));

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert(t('contact.error', language));
        }
      );
  };

  return (
    <div
      ref={contactRef}
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        ref={textRef}
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-cream-200 p-10 rounded-[40px] border border-cream-300 text-black'
      >
        <h3 className={`${styles.sectionHeadText} text-black text-center`}>{t('contact.title', language)}</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-black font-semibold mb-4'>{t('contact.yourName', language)}</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder={t('contact.namePlaceholder', language)}
              className='bg-white py-4 px-6 placeholder:text-text-light text-black rounded-xl outline-none border border-cream-300 focus:border-[#F2E8C6] transition-colors font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-black font-semibold mb-4'>{t('contact.yourEmail', language)}</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder={t('contact.emailPlaceholder', language)}
              className='bg-white py-4 px-6 placeholder:text-text-light text-black rounded-xl outline-none border border-cream-300 focus:border-[#F2E8C6] transition-colors font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-black font-semibold mb-4'>{t('contact.yourMessage', language)}</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder={t('contact.messagePlaceholder', language)}
              className='bg-white py-4 px-6 placeholder:text-text-light text-black rounded-xl outline-none border border-cream-300 focus:border-[#F2E8C6] transition-colors font-medium resize-none'
            />
          </label>

          <button
            type='submit'
            className='bg-[#F2E8C6] hover:bg-[#EADCB0] transition-colors py-3 px-8 rounded-2xl outline-none w-fit text-[#5B21B6] font-bold shadow-md shadow-primary'
          >
            {loading ? t('contact.sending', language) : t('contact.send', language)}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <RobotCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
