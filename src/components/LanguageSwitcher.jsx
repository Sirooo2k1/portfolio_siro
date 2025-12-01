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
        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white border border-[#F2E8C6] rounded-lg shadow-lg transition-all duration-200 min-w-[60px] sm:min-w-[100px] md:min-w-[140px] justify-between shrink-0 box-border w-full"
        aria-label="Select language"
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-base sm:text-lg md:text-xl leading-none">{currentLanguage.flag}</span>
          <span className="text-[#1F2937] font-semibold text-xs sm:text-sm hidden sm:inline lg:hidden">{currentLanguage.name}</span>
          <span className="text-[#1F2937] font-semibold text-xs sm:text-sm hidden lg:inline">{currentLanguage.fullName}</span>
        </div>
        <svg
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#6B7280] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
        <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 md:left-0 md:translate-x-0 mt-2 w-[140px] sm:w-full md:w-full min-w-[140px] sm:min-w-[160px] md:min-w-[180px] bg-white border border-[#F2E8C6] rounded-lg shadow-lg z-50 overflow-hidden box-border">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 text-left transition-colors bg-white ${
                language === lang.code
                  ? 'bg-[#F2E8C6] text-[#5B21B6] font-semibold'
                  : 'text-[#1F2937] hover:text-[#F2E8C6]'
              }`}
            >
              <span className="text-base sm:text-lg md:text-xl leading-none">{lang.flag}</span>
              <span className="text-xs sm:text-sm font-medium">{lang.fullName}</span>
              {language === lang.code && (
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-auto"
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

