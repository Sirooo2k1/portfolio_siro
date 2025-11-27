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

  // Smooth scroll helper - scroll closer to headings
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Get navbar height
    const navbar = document.querySelector('nav');
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 70;
    
    // Hash-span has margin-top: -100px, so actual section starts at element position + 100px
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    
    // Scroll to section start (after hash-span padding) with smaller offset for closer positioning
    // This brings headings closer to navbar with a nice breathing room
    const targetPosition = elementTop + 100 - navbarHeight - 30; // -30 for closer spacing to headings

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
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-3 fixed top-0 z-20 ${
        scrolled ? "bg-[#FAFCC6]" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center shrink-0 -ml-2 xs:-ml-4 sm:-ml-6 md:-ml-12 lg:-ml-20 mr-2 xs:mr-3 md:mr-4'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt='logo'
            className='w-17 h-14 xs:w-21 xs:h-19 sm:w-25 sm:h-21 md:w-27 md:h-23 object-contain'
          />
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-6 md:gap-8 lg:gap-10 flex-1 justify-center items-center'>
          {navLinks.map((nav) => (
            nav.id === "work" ? (
              <li
                key={nav.id}
                className="relative"
                onMouseEnter={() => setBlogDropdownOpen(true)}
                onMouseLeave={() => setBlogDropdownOpen(false)}
              >
                <div
                  className={`${
                    active === nav.title ? "text-[#1F2937]" : "text-[#374151]"
                  } hover:text-[#1F2937] text-base md:text-lg lg:text-[18px] font-medium cursor-pointer flex items-center gap-1`}
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
                    className={`w-4 h-4 transition-transform ${
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
                    <div className="bg-white rounded-lg shadow-xl border-2 border-[#D1D5DB] py-3 relative" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
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
                            // Get navbar height
                            const navbar = document.querySelector('nav');
                            const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
                            
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
                              className="block px-4 py-2 text-[14px] text-[#1F2937] hover:bg-[#F9FAFB] hover:text-[#111827] transition-colors font-lora bg-white text-center cursor-pointer font-medium"
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
                  active === nav.title ? "text-[#1F2937]" : "text-[#374151]"
                } hover:text-[#1F2937] text-base md:text-lg lg:text-[18px] font-medium cursor-pointer`}
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

        <div className='hidden sm:flex items-center gap-5 shrink-0'>
          <LanguageSwitcher />
          <ul className='list-none flex flex-row gap-5'>
            {navMedia.map((nav) =>
            (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:cursor-pointer`}
                style={{ width: "28px", height: "28px" }}
              >
                <div className="green-pink-gradient p-[1px] rounded-full cursor-pointer select-none overflow-hidden">
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center green-pink-gradient">
                    <a href={nav.link} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                      <img
                        src={nav.image}
                        alt={nav.link}
                        className={`${nav.id === "Instagram" ? "w-full h-full object-cover rounded-full" : "w-[24px] h-[24px] object-contain"} transition-filter duration-150 hover:brightness-75`}
                      />
                    </a>
                  </div>
                </div>
              </li>
            )
          )}
          </ul>
        </div>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl flex-col`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                nav.id === "work" ? (
                  <li key={nav.id} className="w-full">
                    <div
                      className={`font-poppins font-medium cursor-pointer text-[16px] ${
                        active === nav.title ? "text-white" : "text-secondary"
                      } flex items-center justify-between`}
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
                        className={`w-4 h-4 transition-transform ${
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
                              // Get navbar height
                              const navbar = document.querySelector('nav');
                              const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
                              
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
                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                      active === nav.title ? "text-white" : "text-secondary"
                    }`}
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

            <div className='flex flex-col items-center gap-4 mt-4'>
              <LanguageSwitcher />
              <ul className='list-none flex justify-center items-start flex-row gap-4'>
                {navMedia.map((nav) => (
                <li
                  key={nav.id}
                  className={`${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:cursor-pointer`}
                  style={{ width: "28px", height: "28px" }}
                >
                  <div className='green-pink-gradient p-[1px] rounded-full cursor-pointer select-none overflow-hidden'>
                    <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center green-pink-gradient">
                      <a href={nav.link} target='_blank' rel='noopener noreferrer' className="w-full h-full flex items-center justify-center">
                        <img
                          src={nav.image}
                          alt={nav.link}
                          className={`${nav.id === "Instagram" ? "w-full h-full object-cover rounded-full" : "w-[24px] h-[24px] object-contain"} transition-filter duration-150 hover:brightness-75`}
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