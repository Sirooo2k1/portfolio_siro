import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks, navMedia, blogCategories } from "../constants";
import { menu, close } from "../assets";
import { logo } from "../assets";
import { useLanguage } from "../utils/language";
import { t } from "../utils/translations";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { language } = useLanguage();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);

  // Smooth scroll helper - scroll closer to headings with improved smoothness for mobile/iPad
  // Uses native smooth scroll for better performance on both desktop and mobile
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Navbar height is fixed at 80px
    const navbarHeight = 80;
    
    // Hash-span has margin-top: -100px, so actual section starts at element position + 100px
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    
    // Scroll to section start (after hash-span padding) with smaller offset for closer positioning
    // This brings headings closer to navbar with a nice breathing room
    const targetPosition = elementTop + 100 - navbarHeight - 30; // -30 for closer spacing to headings

    // Use native smooth scroll for both desktop and mobile for better performance
    // Native smooth scroll is optimized by the browser and performs better than custom animations
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });
  };

  // Handle anchor link clicks
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
    setActive("");
    if (toggle) setToggle(false);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          
          if (scrollTop > 100) {
            setScrolled(true);
            setIsInHero(false);
          } else {
            setScrolled(false);
            setIsInHero(true);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    // Check initial position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`pl-4 pr-3 sm:pl-6 sm:pr-4 md:pl-6 md:pr-6 lg:pl-16 lg:pr-16 w-full flex items-center h-[80px] fixed top-0 z-20 overflow-visible transition-all duration-300 ${
        isInHero 
          ? "bg-transparent" 
          : "bg-[#FAFCC6] shadow-md"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto overflow-visible min-w-0 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6'>
        <Link
          to='/'
          className='flex items-center justify-center flex-shrink-0 overflow-hidden relative h-[80px]'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {isInHero ? (
            <img
              src="/sirolg-removebg.png"
              alt='logo'
              className='h-[80px] w-auto sm:h-[82px] md:h-[85px] lg:h-[88px] xl:h-[90px] object-contain transition-all duration-300 relative z-10'
              style={{
                imageRendering: 'high-quality',
                filter: 'brightness(1.2) contrast(1.15) saturate(1.05)',
                opacity: 1,
                display: 'block',
                lineHeight: 0,
                margin: 0,
                padding: 0,
                clipPath: 'inset(0 0 4% 0)',
                objectPosition: 'center center',
                maxHeight: '90px',
              }}
            />
          ) : (
            <img
              src="/sirolg-removebg.png"
              alt='logo'
              className='h-[80px] w-auto sm:h-[82px] md:h-[85px] lg:h-[88px] xl:h-[90px] object-contain transition-all duration-300 relative z-10'
              style={{
                imageRendering: 'high-quality',
                filter: 'brightness(1.15) contrast(1.1) saturate(1.0)',
                opacity: 1,
                display: 'block',
                lineHeight: 0,
                margin: 0,
                padding: 0,
                clipPath: 'inset(0 0 4% 0)',
                objectPosition: 'center center',
                maxHeight: '90px',
              }}
            />
          )}
        </Link>

        <ul className='list-none hidden lg:flex flex-row gap-2 lg:gap-2.5 xl:gap-4 2xl:gap-6 flex-1 justify-center items-center min-w-0 flex-shrink'>
          {navLinks.map((nav) => (
            nav.id === "work" ? (
              <li
                key={nav.id}
                className="relative flex-shrink-0"
                onMouseEnter={() => setBlogDropdownOpen(true)}
                onMouseLeave={() => setBlogDropdownOpen(false)}
              >
                <div
                  className={`${
                    isInHero 
                      ? (active === nav.title ? "text-white" : "text-gray-200")
                      : (active === nav.title ? "text-[#1F2937]" : "text-[#374151]")
                  } ${isInHero ? "hover:text-white" : "hover:text-[#1F2937]"} text-[11px] lg:text-[12px] xl:text-[15px] 2xl:text-[17px] font-medium cursor-pointer flex items-center gap-1 whitespace-nowrap transition-colors duration-200`}
                  onClick={() => {
                    setActive(nav.title);
                    setBlogDropdownOpen(!blogDropdownOpen);
                  }}
                >
                  <a href={`#${nav.id}`} onClick={(e) => handleAnchorClick(e, nav.id)}>
                  {nav.id === "about" ? t(`nav.about`, language) :
                   nav.id === "work" ? t(`nav.blog`, language) :
                   nav.id === "projects" ? t(`nav.projects`, language) :
                   nav.id === "programs" ? t(`nav.education`, language) :
                   nav.id === "contact" ? t(`nav.contact`, language) : nav.title}
                </a>
                  <svg
                    className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-200 flex-shrink-0 ${
                      blogDropdownOpen ? "rotate-180" : ""
                    }`}
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
                </div>
                {blogDropdownOpen && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 w-56 z-30"
                    onMouseEnter={() => setBlogDropdownOpen(true)}
                    onMouseLeave={() => setBlogDropdownOpen(false)}
                  >
                    <div className="bg-white rounded-lg shadow-lg border border-[#F2E8C6] py-3 relative">
                      {/* Diamond icon at center of top border */}
                      <div className="absolute -top-[9.5px] left-1/2 transform -translate-x-1/2">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 8 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#F2E8C6]"
                        >
                          <path
                            d="M4 0L8 4L4 8L0 4L4 0Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      
                      {/* Category items with dividers */}
                      {blogCategories.map((category, index) => {
                        const handleCategoryClick = (e) => {
                          e.preventDefault();
                          setBlogDropdownOpen(false);
                          setActive(nav.title);
                          
                          // Map category names to expected category IDs in blog post elements
                          const categoryMap = {
                            "My Journey": "my-journey",
                            "Life in Japan": "life-in-japan",
                            "Cooking": "cooking",
                            "Explore & Travel": "explore-&-travel"
                          };
                          
                          const expectedCategoryId = categoryMap[category] || category.toLowerCase().replace(/\s+/g, "-");
                          
                          // Find all blog post elements
                          const allBlogPosts = document.querySelectorAll('[id^="blog-"]');
                          let targetPost = null;
                          
                          // Find first post matching the category
                          allBlogPosts.forEach((post) => {
                            if (!targetPost) {
                              const postId = post.id;
                              // Extract category from ID (format: blog-category-name-index)
                              const categoryFromId = postId.replace(/^blog-/, '').replace(/-\d+$/, '');
                              
                              // Handle special case for "Explore & Travel"
                              if (category === "Explore & Travel") {
                                if (categoryFromId.includes("explore") && categoryFromId.includes("travel")) {
                                  targetPost = post;
                                }
                              } else if (categoryFromId === expectedCategoryId) {
                                targetPost = post;
                              }
                            }
                          });
                          
                          if (targetPost) {
                            // Navbar height is fixed at 80px
                            const navbarHeight = 80;
                            
                            // Get target post position
                            const targetPostTop = targetPost.getBoundingClientRect().top + window.pageYOffset;
                            
                            // Scroll to target post with navbar offset
                            const targetOffset = targetPostTop - navbarHeight - 20;
                            
                            window.scrollTo({
                              top: Math.max(0, targetOffset),
                              behavior: 'smooth'
                            });
                          } else {
                            // Fallback: scroll to work section if blog post not found
                            smoothScrollTo(nav.id);
                          }
                        };
                        
                        const getCategoryTranslation = (cat) => {
                          if (cat === "My Journey") return t('blogCategories.myJourney', language);
                          if (cat === "Life in Japan") return t('blogCategories.lifeInJapan', language);
                          if (cat === "Cooking") return t('blogCategories.cooking', language);
                          if (cat === "Explore & Travel") return t('blogCategories.exploreTravel', language);
                          return cat;
                        };
                        
                        return (
                        <div key={category}>
                          <a
                            href={`#${nav.id}`}
                              className="block px-4 py-2 text-[14px] text-[#1F2937] hover:text-[#F2E8C6] transition-colors font-lora bg-white text-center cursor-pointer font-medium"
                              onClick={handleCategoryClick}
                          >
                            {getCategoryTranslation(category)}
                          </a>
                          {index < blogCategories.length - 1 && (
                            <div className="border-t border-[#F2E8C6] mx-4"></div>
                          )}
                        </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li
                key={nav.id}
                className={`${
                  isInHero 
                    ? (active === nav.title ? "text-white" : "text-gray-200")
                    : (active === nav.title ? "text-[#1F2937]" : "text-[#374151]")
                } ${isInHero ? "hover:text-white" : "hover:text-[#1F2937]"} text-[11px] lg:text-[12px] xl:text-[15px] 2xl:text-[17px] font-medium cursor-pointer whitespace-nowrap transition-colors duration-200 flex-shrink-0`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`} onClick={(e) => handleAnchorClick(e, nav.id)}>
                  {nav.id === "about" ? t(`nav.about`, language) :
                   nav.id === "work" ? t(`nav.blog`, language) :
                   nav.id === "projects" ? t(`nav.projects`, language) :
                   nav.id === "programs" ? t(`nav.education`, language) :
                   nav.id === "contact" ? t(`nav.contact`, language) : nav.title}
                </a>
              </li>
            )
          ))}
        </ul>

        <div className='hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 shrink-0'>
          <LanguageSwitcher />
          <ul className='list-none flex flex-row gap-2 md:gap-2.5 lg:gap-3 xl:gap-4'>
            {navMedia.map((nav) =>
            (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:cursor-pointer w-6 h-6 md:w-7 md:h-7 lg:w-7 lg:h-7`}
              >
                <div className="green-pink-gradient p-[1px] rounded-full cursor-pointer select-none overflow-hidden w-full h-full">
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center green-pink-gradient">
                    <a href={nav.link} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                      <img
                        src={nav.image}
                        alt={nav.link}
                        className="w-full h-full object-cover rounded-full transition-all duration-200 hover:brightness-75 hover:scale-110"
                      />
                    </a>
                  </div>
                </div>
              </li>
            )
          )}
          </ul>
        </div>

        <div className='lg:hidden flex flex-1 justify-end items-center'>
          <button
            onClick={() => setToggle(!toggle)}
            className='p-2 -mr-2 focus:outline-none'
            aria-label='Toggle menu'
          >
          <img
            src={toggle ? close : menu}
            alt='menu'
              className={`w-6 h-6 sm:w-7 sm:h-7 object-contain transition-all duration-200 ${
              toggle 
                ? 'brightness-0' 
                : isInHero 
                  ? 'brightness-0 invert' 
                  : ''
            }`}
          />
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-5 sm:p-6 black-gradient absolute top-[80px] right-0 mx-2 sm:mx-3 my-2 min-w-[160px] sm:min-w-[180px] z-10 rounded-xl flex-col shadow-2xl animate-in slide-in-from-top-2 duration-200`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                nav.id === "work" ? (
                  <li key={nav.id} className="w-full">
                    <div
                      className={`font-poppins font-medium cursor-pointer text-[14px] sm:text-[16px] ${
                        active === nav.title ? "text-white" : "text-secondary"
                      } flex items-center justify-between py-1 transition-colors duration-200`}
                      onClick={() => {
                        setBlogDropdownOpen(!blogDropdownOpen);
                        setActive(nav.title);
                      }}
                    >
                      <a href={`#${nav.id}`} onClick={(e) => handleAnchorClick(e, nav.id)}>
                  {nav.id === "about" ? t(`nav.about`, language) :
                   nav.id === "work" ? t(`nav.blog`, language) :
                   nav.id === "projects" ? t(`nav.projects`, language) :
                   nav.id === "programs" ? t(`nav.education`, language) :
                   nav.id === "contact" ? t(`nav.contact`, language) : nav.title}
                </a>
                      <svg
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
                          blogDropdownOpen ? "rotate-180" : ""
                        }`}
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
                    </div>
                    {blogDropdownOpen && (
                      <ul className="mt-2 ml-4 space-y-2">
                        {blogCategories.map((category) => {
                          const handleCategoryClick = (e) => {
                            e.preventDefault();
                            setToggle(!toggle);
                            setBlogDropdownOpen(false);
                            setActive(nav.title);
                            
                            // Map category names to expected category IDs in blog post elements
                            const categoryMap = {
                              "My Journey": "my-journey",
                              "Life in Japan": "life-in-japan",
                              "Cooking": "cooking",
                              "Explore & Travel": "explore-&-travel"
                            };
                            
                            const expectedCategoryId = categoryMap[category] || category.toLowerCase().replace(/\s+/g, "-");
                            
                            // Find all blog post elements
                            const allBlogPosts = document.querySelectorAll('[id^="blog-"]');
                            let targetPost = null;
                            
                            // Find first post matching the category
                            allBlogPosts.forEach((post) => {
                              if (!targetPost) {
                                const postId = post.id;
                                // Extract category from ID (format: blog-category-name-index)
                                const categoryFromId = postId.replace(/^blog-/, '').replace(/-\d+$/, '');
                                
                                // Handle special case for "Explore & Travel"
                                if (category === "Explore & Travel") {
                                  if (categoryFromId.includes("explore") && categoryFromId.includes("travel")) {
                                    targetPost = post;
                                  }
                                } else if (categoryFromId === expectedCategoryId) {
                                  targetPost = post;
                                }
                              }
                            });
                            
                            if (targetPost) {
                            // Navbar height is fixed at 80px
                            const navbarHeight = 80;
                              
                                // Get target post position
                                const targetPostTop = targetPost.getBoundingClientRect().top + window.pageYOffset;
                                
                                // Scroll to target post with navbar offset
                                const targetOffset = targetPostTop - navbarHeight - 20;
                                
                                window.scrollTo({
                                  top: Math.max(0, targetOffset),
                                  behavior: 'smooth'
                                });
                            } else {
                              // Fallback: scroll to work section if blog post not found
                              smoothScrollTo(nav.id);
                            }
                          };
                          
                          const getCategoryTranslation = (cat) => {
                            if (cat === "My Journey") return t('blogCategories.myJourney', language);
                            if (cat === "Life in Japan") return t('blogCategories.lifeInJapan', language);
                            if (cat === "Cooking") return t('blogCategories.cooking', language);
                            if (cat === "Explore & Travel") return t('blogCategories.exploreTravel', language);
                            return cat;
                          };
                          
                          return (
                          <li key={category}>
                            <a
                              href={`#${nav.id}`}
                                className="block text-[14px] text-secondary hover:text-white transition-colors cursor-pointer"
                                onClick={handleCategoryClick}
                            >
                              {getCategoryTranslation(category)}
                            </a>
                          </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[14px] sm:text-[16px] ${
                      active === nav.title ? "text-white" : "text-secondary"
                    } py-1 transition-colors duration-200`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(nav.title);
                    }}
                  >
                    <a href={`#${nav.id}`} onClick={(e) => handleAnchorClick(e, nav.id)}>
                      {nav.id === "about" ? t(`nav.about`, language) :
                       nav.id === "work" ? t(`nav.blog`, language) :
                       nav.id === "projects" ? t(`nav.projects`, language) :
                       nav.id === "programs" ? t(`nav.education`, language) :
                       nav.id === "contact" ? t(`nav.contact`, language) : nav.title}
                    </a>
                  </li>
                )
              ))}
            </ul>

            <div className='flex flex-col items-center gap-3 sm:gap-4 mt-4 pt-4 border-t border-gray-600'>
              <LanguageSwitcher />
              <ul className='list-none flex justify-center items-center flex-row gap-3 sm:gap-4'>
                {navMedia.map((nav) => (
                <li
                  key={nav.id}
                  className={`${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:cursor-pointer w-7 h-7 sm:w-8 sm:h-8`}
                >
                  <div className='green-pink-gradient p-[1px] rounded-full cursor-pointer select-none overflow-hidden'>
                    <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center green-pink-gradient">
                      <a href={nav.link} target='_blank' rel='noopener noreferrer' className="w-full h-full flex items-center justify-center">
                        <img
                          src={nav.image}
                          alt={nav.link}
                          className="w-full h-full object-cover rounded-full transition-all duration-200 hover:brightness-75 hover:scale-110"
                        />
                      </a>
                    </div>
                  </div>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;