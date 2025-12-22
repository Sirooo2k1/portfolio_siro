import React, { useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts, experiences } from "../constants";
import { useLanguage } from "../utils/language";
import { t } from "../utils/translations";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const post = blogPosts.find((p) => p.slug === slug);

  // Scroll to top instantly before render (no animation, no delay)
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    // Also set scroll position directly to ensure it's at top
    if (window.pageYOffset !== 0) {
      window.scrollTo(0, 0);
    }
  }, [slug]);

  // Map slug to blog post card ID
  const getBlogCardId = () => {
    const blogSlugToCompanyName = {
      "why-did-i-even-study-abroad": "Why Did I Even Study Abroad?",
      "the-decision-that-changed-my-life": "The Decision That Changed My Life",
      "the-art-of-cooking": "The simple joys of cooking",
      "exploring-the-world": "Unforgettable Journeys",
    };

    const companyName = blogSlugToCompanyName[slug];
    if (!companyName) return null;

    // Find the experience index
    const experienceIndex = experiences.findIndex(
      (exp) => exp.company_name === companyName
    );
    if (experienceIndex === -1) return null;

    const experience = experiences[experienceIndex];
    // Create categoryId from date (same logic as in Experience.jsx)
    const categoryId = experience.date
      .replace("Category: ", "")
      .toLowerCase()
      .replace(/\s+/g, "-");

    return `blog-${categoryId}-${experienceIndex}`;
  };

  // Scroll helper function (instant, no animation)
  const smoothScrollToElement = (element, offset = 0) => {
    if (!element) return;
    
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 70;
    
    // Get element position relative to document
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + window.pageYOffset;
    
    // Calculate target position: element top + hash-span offset (100px) - navbar height - additional offset
    const targetPosition = elementTop + 100 - navbarHeight - offset;

    // Scroll instantly without animation
    window.scrollTo(0, Math.max(0, targetPosition));
  };

  // Handle back to blog section (top left button)
  // Scrolls to the corresponding card for the current blog post (same as bottom button)
  const handleBackToBlogSection = () => {
    const cardId = getBlogCardId();
    navigate("/");
    // Wait for navigation and DOM to be ready
    setTimeout(() => {
      let targetPost = null;
      
      // First, try to find the corresponding card for this blog post
      if (cardId) {
        const cardElement = document.getElementById(cardId);
        if (cardElement) {
          targetPost = cardElement;
        } else {
          // If card not found, try again after a bit more time (for lazy loading)
          setTimeout(() => {
            const retryElement = document.getElementById(cardId);
            if (retryElement) {
              targetPost = retryElement;
              scrollToPost(retryElement);
            } else {
              // Fallback: scroll to first blog post if card still not found
              scrollToFirstPost();
            }
          }, 300);
          return; // Exit early, will be handled in setTimeout
        }
      }
      
      // If we have a target post, scroll to it
      if (targetPost) {
        scrollToPost(targetPost);
      } else {
        // Fallback: scroll to first blog post if no corresponding card found
        scrollToFirstPost();
      }
    }, 200);
  };

  // Handle back to specific blog post card (bottom right button)
  // Scrolls to the corresponding card for the current blog post
  const handleBackToBlogPost = () => {
    const cardId = getBlogCardId();
    navigate("/");
    // Wait for navigation and DOM to be ready
    setTimeout(() => {
      let targetPost = null;
      
      // First, try to find the corresponding card for this blog post
      if (cardId) {
        const cardElement = document.getElementById(cardId);
        if (cardElement) {
          targetPost = cardElement;
        } else {
          // If card not found, try again after a bit more time (for lazy loading)
          setTimeout(() => {
            const retryElement = document.getElementById(cardId);
            if (retryElement) {
              targetPost = retryElement;
              scrollToPost(retryElement);
            } else {
              // Fallback: scroll to first blog post if card still not found
              scrollToFirstPost();
            }
          }, 300);
          return; // Exit early, will be handled in setTimeout
        }
      }
      
      // If we have a target post, scroll to it
      if (targetPost) {
        scrollToPost(targetPost);
      } else {
        // Fallback: scroll to first blog post if no corresponding card found
        scrollToFirstPost();
      }
    }, 200);
  };
  
  // Helper function to scroll to a specific blog post card
  const scrollToPost = (postElement) => {
    // Navbar height is fixed at 80px (same as Navbar.jsx)
    const navbarHeight = 80;
    
    // Get target post position
    const targetPostTop = postElement.getBoundingClientRect().top + window.pageYOffset;
    
    // Scroll to target post with navbar offset (same calculation as Navbar's blog dropdown)
    const targetOffset = targetPostTop - navbarHeight - 20;
    
    // Scroll instantly without animation
    window.scrollTo(0, Math.max(0, targetOffset));
  };
  
  // Helper function to scroll to the first blog post
  const scrollToFirstPost = () => {
    // Find all blog post elements
    const allBlogPosts = document.querySelectorAll('[id^="blog-"]');
    let firstBlogPost = null;
    
    if (allBlogPosts.length > 0) {
      // Find the first blog post by comparing positions
      allBlogPosts.forEach((post) => {
        if (!firstBlogPost) {
          firstBlogPost = post;
        } else {
          const currentTop = post.getBoundingClientRect().top + window.pageYOffset;
          const firstTop = firstBlogPost.getBoundingClientRect().top + window.pageYOffset;
          if (currentTop < firstTop) {
            firstBlogPost = post;
          }
        }
      });
    }
    
    if (firstBlogPost) {
      scrollToPost(firstBlogPost);
    } else {
      // Fallback: scroll to work section if no blog posts found
      const workSection = document.getElementById("work");
      if (workSection) {
        smoothScrollToElement(workSection, 30);
      }
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAFCC6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('blogPost.postNotFound', language)}</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#F2E8C6] text-black rounded-lg hover:bg-[#E8E3DC] transition-colors"
          >
            {t('blogPost.backToBlog', language)}
          </button>
        </div>
      </div>
    );
  }

  // Get content based on language
  const getLocalizedContent = () => {
    if (post.contentByLanguage && post.contentByLanguage[language]) {
      return post.contentByLanguage[language];
    }
    // Fallback to default content if language-specific content doesn't exist
    return post.content || [];
  };

  const getLocalizedTitle = () => {
    if (post.titleByLanguage && post.titleByLanguage[language]) {
      return post.titleByLanguage[language];
    }
    return post.title;
  };

  const getLocalizedSubtitle = () => {
    if (post.subtitleByLanguage && post.subtitleByLanguage[language]) {
      return post.subtitleByLanguage[language];
    }
    return post.subtitle;
  };

  const getLocalizedCategory = () => {
    if (post.categoryByLanguage && post.categoryByLanguage[language]) {
      return post.categoryByLanguage[language];
    }
    return post.category;
  };

  const content = getLocalizedContent();
  const title = getLocalizedTitle();
  const subtitle = getLocalizedSubtitle();
  const category = getLocalizedCategory();

  return (
    <div className="min-h-screen bg-[#FAFCC6]">
      {/* Header */}
      <div className="bg-white border-b border-[#F2E8C6] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-5 lg:px-6 py-3 md:py-3.5 lg:py-4">
          <button
            onClick={handleBackToBlogSection}
            className="text-[#6B7280] hover:text-[#374151] transition-colors flex items-center gap-2 text-sm md:text-base"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 5L7.5 10L12.5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t('blogPost.backToBlog', language)}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-5 lg:px-6 py-8 md:py-10 lg:py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-10 xl:p-12"
        >
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-3 md:mb-4 text-center">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-xl xl:text-2xl text-black font-semibold mb-6 md:mb-7 lg:mb-8 text-center">
            {subtitle}
          </p>

          {/* Category */}
          <div className="flex justify-center mb-6 md:mb-7 lg:mb-8">
            <span className="px-4 md:px-5 lg:px-6 py-1.5 md:py-2 rounded-full bg-[#F2E8C6] text-[#5B21B6] font-semibold text-xs md:text-sm">
              {category}
            </span>
          </div>

          {/* Content */}
          {content && content.length > 0 ? (
            <div className="prose prose-lg max-w-none">
              {content.map((paragraph, index) => {
                // Skip empty paragraphs (they create spacing)
                if (!paragraph || paragraph.trim() === "") {
                  return <div key={index} className="mb-4" />;
                }

                const trimmedParagraph = paragraph.trim();
                
                // Check if it's a heading (starts with ** or is a short line that looks like a heading)
                const isHeading = trimmedParagraph.startsWith("**") && trimmedParagraph.endsWith("**");
                
                // Check if it's a numbered section heading (starts with number like "1. ", "2. ", etc.)
                const isNumberedHeading = /^\d+\.\s/.test(trimmedParagraph);
                
                // Check if it's a subheading (short line, contains "–" or "—", and previous line is empty)
                const hasDash = trimmedParagraph.includes("–") || trimmedParagraph.includes("—") || trimmedParagraph.includes("—");
                const isShortLine = trimmedParagraph.length < 120;
                const prevIsEmpty = index > 0 && (!content[index - 1] || content[index - 1].trim() === "");
                // Also check if it's a very short line (likely a heading like "Khi nhìn lại")
                // Exclude lines that end with punctuation (complete sentences) or colon to avoid false positives
                const endsWithPunctuation = /[。！？\.!?]$/.test(trimmedParagraph);
                const endsWithColon = /[：:]$/.test(trimmedParagraph);
                const isVeryShort = trimmedParagraph.length < 50 && !trimmedParagraph.includes(".") && !endsWithPunctuation && !endsWithColon;
                // Only detect as subheading if it has dash AND doesn't end with punctuation or colon (not a complete sentence)
                const isSubheading = !isHeading && !isNumberedHeading && ((isShortLine && hasDash && prevIsEmpty && !endsWithPunctuation && !endsWithColon) || (isVeryShort && prevIsEmpty)) && !trimmedParagraph.startsWith("*") && !trimmedParagraph.startsWith("–");
                
                // Check if it's a bullet point (starts with "–", "-", or "*")
                const isBulletPoint = trimmedParagraph.startsWith("–") || trimmedParagraph.startsWith("-") || trimmedParagraph.startsWith("*");
                
                // Remove markdown formatting if present
                let cleanParagraph = trimmedParagraph;
                if (isHeading) {
                  cleanParagraph = trimmedParagraph.replace(/\*\*/g, "");
                }

                if (isHeading) {
                  return (
                    <h2
                      key={index}
                      className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-black mb-4 md:mb-5 lg:mb-6 mt-6 md:mt-7 lg:mt-8 first:mt-0"
                    >
                      {cleanParagraph}
                    </h2>
                  );
                }

                if (isNumberedHeading) {
                  return (
                    <h3
                      key={index}
                      className="text-lg md:text-xl lg:text-xl xl:text-2xl font-bold text-black mb-3 md:mb-4 mt-5 md:mt-6"
                    >
                      {cleanParagraph}
                    </h3>
                  );
                }

                if (isSubheading) {
                  return (
                    <h3
                      key={index}
                      className="text-lg md:text-xl lg:text-xl xl:text-2xl font-bold text-black mb-3 md:mb-4 mt-4 md:mt-5 lg:mt-6"
                    >
                      {cleanParagraph}
                    </h3>
                  );
                }

                if (isBulletPoint) {
                  const bulletText = cleanParagraph.replace(/^[\*–\-]\s*/, "");
                  return (
                    <div key={index} className="mb-2 ml-4 md:ml-5 lg:ml-6">
                      <p className="text-text-dark text-sm md:text-base lg:text-[17px] xl:text-[18px] leading-[1.75] tracking-normal">
                        <span className="mr-2 font-semibold">–</span>
                        {bulletText}
                      </p>
                    </div>
                  );
                }

                // Regular paragraph
                return (
                <p
                  key={index}
                    className="text-text-dark text-sm md:text-base lg:text-[17px] xl:text-[18px] leading-[1.75] tracking-normal mb-3 md:mb-4"
                >
                    {cleanParagraph}
                </p>
                );
              })}
            </div>
          ) : (
            <div className="prose prose-lg max-w-none text-center py-8 md:py-10 lg:py-12">
              <p className="text-text-dark text-sm md:text-base lg:text-[17px] xl:text-[18px] leading-[1.75] tracking-normal">
                {t('blogPost.contentComingSoon', language)}
              </p>
            </div>
          )}

          {/* Footer */}
          {content && content.length > 0 && (
            <div className="mt-8 md:mt-10 lg:mt-12 pt-6 md:pt-7 lg:pt-8 border-t border-[#F2E8C6]">
              <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
                <div>
                  <p className="text-xs md:text-sm text-[#6B7280]">{t('blogPost.publishedOn', language)}</p>
                  <p className="text-sm md:text-base font-semibold text-black">
                    {post.dateByLanguage && post.dateByLanguage[language] 
                      ? post.dateByLanguage[language] 
                      : post.date}
                  </p>
                </div>
                <button
                  onClick={handleBackToBlogPost}
                  className="flex items-center gap-2 px-6 py-3 bg-[#F3F0EB] hover:bg-[#E8E3DC] transition-colors rounded-lg text-black font-semibold text-sm md:text-base lg:text-[17px] xl:text-[18px] tracking-wide"
                >
                  <span>{t('blogPost.backToBlog', language)}</span>
                  <span className="text-black text-lg">➞</span>
                </button>
              </div>
            </div>
          )}
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPost;

