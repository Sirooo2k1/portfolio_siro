import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Lấy ngôn ngữ từ localStorage hoặc mặc định là 'en'
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    // Lưu ngôn ngữ vào localStorage khi thay đổi
    localStorage.setItem('language', language);
    
    // Set data attribute trên body và html để CSS có thể tự động áp dụng font
    if (document.body) {
      document.body.setAttribute('data-language', language);
    }
    if (document.documentElement) {
      document.documentElement.setAttribute('data-language', language);
    }
  }, [language]);

  // Set data attribute ngay khi mount để đảm bảo font được áp dụng ngay từ đầu
  useEffect(() => {
    if (document.body) {
      document.body.setAttribute('data-language', language);
    }
    if (document.documentElement) {
      document.documentElement.setAttribute('data-language', language);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

