import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../utils/language";
import { t } from "../utils/translations";
import { logo } from "../assets";

const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#FAFCC6] border-t-2 border-[#F2E8C6] h-[85px] flex items-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 w-full">
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5">
          {/* Logo and Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-1 sm:gap-1.5"
          >
            <Link
              to="/"
              className="flex items-center"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src={logo}
                alt="logo"
                className="h-[35px] w-auto sm:h-[38px] md:h-[40px] object-contain"
              />
            </Link>
            <p className="text-[#374151] text-[10px] sm:text-xs md:text-sm text-center">
              © {currentYear} {t('footer.copyright', language)}. {t('footer.rights', language)}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

