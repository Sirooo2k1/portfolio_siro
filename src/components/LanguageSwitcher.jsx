import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../utils/language';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'EN', fullName: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'VI', fullName: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ja', name: 'JA', fullName: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: 'ZH', fullName: '中文', flag: '🇨🇳' },
    { code: 'ko', name: 'KO', fullName: '한국어', flag: '🇰🇷' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-1.5 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 bg-white border border-[#F2E8C6] rounded-lg shadow-lg transition-all duration-200 min-w-[50px] sm:min-w-[70px] md:min-w-[90px] lg:min-w-[120px] xl:min-w-[140px] justify-between shrink-0 box-border w-full"
        aria-label="Select language"
      >
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
          <span 
            className="text-sm sm:text-base md:text-lg lg:text-xl leading-none font-emoji" 
            style={{ 
              fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Android Emoji", "EmojiSymbols", "EmojiOne Mozilla", "Twemoji Mozilla", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              display: 'inline-block',
              lineHeight: '1',
              verticalAlign: 'middle'
            }}
            role="img"
            aria-label={currentLanguage.fullName}
          >
            {currentLanguage.flag}
          </span>
          <span className="text-[#1F2937] font-semibold text-[10px] sm:text-xs md:text-sm hidden sm:inline lg:hidden">{currentLanguage.name}</span>
          <span className="text-[#1F2937] font-semibold text-[10px] sm:text-xs md:text-sm hidden lg:inline">{currentLanguage.fullName}</span>
        </div>
        <svg
          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-[#6B7280] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 md:left-0 md:translate-x-0 mt-2 w-[120px] sm:w-full md:w-full lg:w-full min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] bg-white border border-[#F2E8C6] rounded-lg shadow-lg z-50 overflow-hidden box-border">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 flex items-center gap-1.5 sm:gap-2 md:gap-3 text-left transition-colors bg-white ${
                language === lang.code
                  ? 'bg-[#F2E8C6] text-[#5B21B6] font-semibold'
                  : 'text-[#1F2937] hover:text-[#F2E8C6]'
              }`}
            >
              <span 
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-none font-emoji" 
                style={{ 
                  fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Android Emoji", "EmojiSymbols", "EmojiOne Mozilla", "Twemoji Mozilla", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  display: 'inline-block',
                  lineHeight: '1',
                  verticalAlign: 'middle'
                }}
                role="img"
                aria-label={lang.fullName}
              >
                {lang.flag}
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm font-medium">{lang.fullName}</span>
              {language === lang.code && (
                <svg
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ml-auto flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

