import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts } from "../constants";
import { useLanguage } from "../utils/language";
import { t } from "../utils/translations";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const post = blogPosts.find((p) => p.slug === slug);

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
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="text-[#6B7280] hover:text-[#374151] transition-colors flex items-center gap-2"
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
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 md:p-12"
        >
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 text-center">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-black font-semibold mb-8 text-center">
            {subtitle}
          </p>

          {/* Category */}
          <div className="flex justify-center mb-8">
            <span className="px-6 py-2 rounded-full bg-[#F2E8C6] text-[#5B21B6] font-semibold text-sm">
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
                const isVeryShort = trimmedParagraph.length < 50 && !trimmedParagraph.includes(".");
                const isSubheading = !isHeading && !isNumberedHeading && ((isShortLine && hasDash && prevIsEmpty) || (isVeryShort && prevIsEmpty)) && !trimmedParagraph.startsWith("*") && !trimmedParagraph.startsWith("–");
                
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
                      className="text-2xl md:text-3xl font-bold text-black mb-6 mt-8 first:mt-0"
                    >
                      {cleanParagraph}
                    </h2>
                  );
                }

                if (isNumberedHeading) {
                  return (
                    <h3
                      key={index}
                      className="text-xl md:text-2xl font-bold text-black mb-4 mt-6"
                    >
                      {cleanParagraph}
                    </h3>
                  );
                }

                if (isSubheading) {
                  return (
                    <h3
                      key={index}
                      className="text-xl md:text-2xl font-bold text-black mb-4 mt-6"
                    >
                      {cleanParagraph}
                    </h3>
                  );
                }

                if (isBulletPoint) {
                  const bulletText = cleanParagraph.replace(/^[\*–\-]\s*/, "");
                  return (
                    <div key={index} className="mb-2 ml-6">
                      <p className="text-text-dark text-[17px] md:text-[18px] leading-[1.75] tracking-normal">
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
                    className="text-text-dark text-[17px] md:text-[18px] leading-[1.75] tracking-normal mb-4"
                  >
                    {cleanParagraph}
                  </p>
                );
              })}
            </div>
          ) : (
            <div className="prose prose-lg max-w-none text-center py-12">
              <p className="text-text-dark text-[17px] md:text-[18px] leading-[1.75] tracking-normal">
                {t('blogPost.contentComingSoon', language)}
              </p>
            </div>
          )}

          {/* Footer */}
          {content && content.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#F2E8C6]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-[#6B7280]">{t('blogPost.publishedOn', language)}</p>
                  <p className="text-base font-semibold text-black">{post.date}</p>
                </div>
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 px-6 py-3 bg-[#F3F0EB] hover:bg-[#E8E3DC] transition-colors rounded-lg text-black font-semibold text-sm uppercase tracking-wide"
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

