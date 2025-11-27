import { React, useState } from "react";
import { createPortal } from "react-dom";
import Tilt from "./Tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github, live_logo, youtube, live_logo_inverted, facebook } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useLanguage } from "../utils/language";
import { t } from "../utils/translations";

const GetLinkButtons = ({
  source_code_link = null,
  youtube_demo_link = null,
  live_link = null,
  source_code_icon = null,
}) => {
  const links = [
    { link: source_code_link, alt: "source code", icon: source_code_icon || github },
    { link: youtube_demo_link, alt: "youtube demo", icon: youtube },
    { link: live_link, alt: "live demo", icon: live_logo_inverted },
  ];

  return (
    <div className="absolute inset-0 flex flex-col items-end m-3 card-img_hover">
      {links
        .filter((link) => link.link)
        .map((link) => (
          <div key={link.alt} onClick={() => window.open(link.link, "_blank")}>
            <Tilt
              options={{ max: 45, scale: 1.15, speed: 450 }}
              className="green-pink-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <div className="green-pink-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
                <img
                  src={link.icon}
                  alt={link.alt}
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
            </Tilt>
          </div>
        ))}
    </div>
  );
};

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  youtube_demo_link,
  live_link,
  source_code_icon,
  project, // Pass the full project object for translations
}) => {
  const { language } = useLanguage();
  const [showVideo, setShowVideo] = useState(false);
  const isVideoCard = name === "Analytics Dashboard & AI Agent";
  
  // Get localized name and description
  const localizedName = project?.nameByLanguage?.[language] || name;
  const localizedDescription = project?.descriptionByLanguage?.[language] || description;
  
  return (
    <div className="bg-cream-200 p-5 rounded-3xl sm:w-[360px] w-full h-full min-h-[360px] flex flex-col justify-between shadow-md border border-cream-300">
      <div className="relative w-full h-[230px]">
        {name === "Personal Portfolio" ? (
          <div className="w-full h-full rounded-2xl overflow-hidden bg-white">
            <div 
              className="w-full h-full rounded-2xl overflow-hidden"
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: '30% 28%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                transform: 'scale(1.2)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.25)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1.2)'}
            />
          </div>
        ) : name === "My First Website" ? (
          <div className="w-full h-full rounded-2xl overflow-hidden bg-white">
            <div 
              className="w-full h-full rounded-2xl overflow-hidden"
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: '30% 20%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                transform: 'scale(1.0)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1.0)'}
            />
          </div>
        ) : name === "Analytics Dashboard & AI Agent" ? (
          <>
            <div 
              className="w-full h-full rounded-2xl overflow-hidden bg-gray-900 relative cursor-pointer group"
              onClick={() => setShowVideo(true)}
            >
              <img
                src={image}
                alt="project_image"
                className="w-full h-full object-contain rounded-2xl opacity-100 group-hover:opacity-100 transition-opacity"
                style={{
                  transform: 'scale(1.0)',
                  transformOrigin: 'center center',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  imageRendering: 'auto',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1.0)';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-300/90 flex items-center justify-center shadow-lg group-hover:bg-gray-200 transition-colors">
                  <svg className="w-8 h-8 text-gray-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-1 left-2 right-2 text-white text-xs text-center">
                {t('works.clickToWatch', language)}
              </div>
              
              {/* Facebook Logo */}
              <div className="absolute inset-0 flex flex-col items-end m-3 pointer-events-none">
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (source_code_link) {
                      window.open(source_code_link, "_blank");
                    }
                  }}
                  className="pointer-events-auto"
                >
                  <Tilt
                    options={{ max: 45, scale: 1.15, speed: 450 }}
                    className="green-pink-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                  >
                    <div className="green-pink-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
                      <img
                        src={source_code_icon}
                        alt="Facebook"
                        className="w-3/4 h-3/4 object-contain"
                      />
                    </div>
                  </Tilt>
                </div>
              </div>
            </div>

            {/* Video Modal */}
            {showVideo && createPortal(
              <div 
                className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
                style={{ zIndex: 99999 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setShowVideo(false);
                  }
                }}
              >
                <div className="relative green-pink-gradient p-[3px] rounded-2xl w-full max-w-md mx-auto shadow-2xl" style={{ maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
                  <div className="relative bg-gray-900 rounded-2xl w-full h-full overflow-hidden" style={{ pointerEvents: 'none' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowVideo(false);
                      }}
                      className="absolute top-3 right-3 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/90 transition-colors text-xl"
                      aria-label="Close video"
                      style={{ pointerEvents: 'auto', zIndex: 100000 }}
                    >
                      ✕
                    </button>
                    <div className="w-full overflow-hidden" style={{ aspectRatio: '267 / 591', minHeight: '500px', maxHeight: 'calc(85vh - 20px)', position: 'relative', pointerEvents: 'auto' }}>
                      <iframe
                        src="https://www.facebook.com/plugins/video.php?height=591&href=https%3A%2F%2Fwww.facebook.com%2Fdunglailaptrinh%2Fvideos%2F1105214645040692%2F&show_text=true&width=267&t=0"
                        width="100%"
                        height="100%"
                        style={{ 
                          border: 'none', 
                          overflow: 'hidden', 
                          position: 'absolute', 
                          top: 0, 
                          left: 0, 
                          width: '100%', 
                          height: '100%',
                          display: 'block',
                          transform: 'translateY(10px) scale(1.05)',
                          transformOrigin: 'center center',
                          backgroundColor: '#111827',
                          pointerEvents: 'auto',
                          zIndex: 1
                        }}
                        scrolling="no"
                        frameBorder={0}
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        title="Analytics Dashboard & AI Agent Demo Video"
                      />
                    </div>
                  </div>
                </div>
              </div>,
              document.body
            )}
          </>
        ) : (
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <img
              src={image}
              alt="project_image"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        )}

        {!isVideoCard && (
          <GetLinkButtons
            source_code_link={source_code_link}
            youtube_demo_link={youtube_demo_link}
            live_link={live_link}
            source_code_icon={source_code_icon}
          />
        )}
      </div>

      <div className="mt-3.5 flex-1 flex flex-col">
        <h3 className="text-black font-bold text-[22px] leading-tight mb-2">{localizedName}</h3>
        <p className="text-text-medium text-[13.5px] leading-[1.6] line-clamp-4 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{localizedDescription}</p>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p key={`${name}-${tag.name}`} className={`text-[13px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </div>
  );
};

const Works = () => {
  const { language } = useLanguage();
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const userAgent = navigator.userAgent;
  //   setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));
  // }, []);

  // const isDesktop = useMediaQuery("(min-width:600px)");

  // const IsDesktop = () => {
  //   const isDesktop = useMediaQuery({ query: "(min-width: 600px)" });
  //   if (isDesktop) {
  //     return true;
  //   }
  //   return false;
  // };

  // const isDesktop = IsDesktop();

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>{t('works.title', language)}</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-black text-[17px] max-w-3xl leading-[30px]"
        >
          {t('works.description', language)}{" "}
          <a
            href="https://github.com/Sirooo2k1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <u>{t('works.github', language)}</u>
          </a>{" "}
          {t('works.descriptionEnd', language)}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          //   <div>
          //   {isDesktop ? (
          //     <ProjectCard index={index} {...project} />
          //   ) : (
          //     <motion.div variants={fadeInDevice(isDesktop, "up", "spring", index * 0.5, 0.75)}>
          //       <ProjectCard index={index} {...project} />
          //     </motion.div>
          //   )}
          // </div>
          <motion.div
            key={project.name ?? index}
            variants={fadeIn("up", "spring", index * 0.5, 0.75)}
          >
            <ProjectCard index={index} {...project} project={project} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
