import React, { useEffect, useRef, memo } from "react";

const MagicCanvas = memo(() => {
	const magicRef = useRef(null);

	useEffect(() => {
		// Re-initialize magic when component mounts
		const initializeMagic = () => {
			const magicElement = document.querySelector('#magic');
			if (!magicElement) {
				// Retry after a short delay
				setTimeout(initializeMagic, 100);
				return;
			}

			// Trigger re-initialization if function is available
			if (typeof window !== 'undefined' && window.initializeMagicEnvironment) {
				window.initializeMagicEnvironment();
			}
		};

		// Small delay to ensure DOM is ready
		const initTimer = setTimeout(() => {
			initializeMagic();
			// Ensure canvas is enabled by default when in Hero section
			const magicElement = document.querySelector('#magic');
			if (magicElement) {
				magicElement.removeAttribute('disabled');
			}
		}, 150);

		// Use IntersectionObserver only on desktop for performance
		// On mobile, always enable to allow touch interactions
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		
		if (!isMobile) {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				const magicElement = document.querySelector('#magic');
				if (!magicElement) return;
				
				if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
					magicElement.removeAttribute('disabled');
				}
				else if (!entry.isIntersecting && entry.intersectionRatio <= 0.3) {
					magicElement.setAttribute('disabled', true);
				}
			});
		}, { threshold: 0.3 });
	
		if (magicRef.current) {
			observer.observe(magicRef.current);
		}
	
		return () => {
			clearTimeout(initTimer);
			if (magicRef.current) {
				observer.unobserve(magicRef.current);
			}
		};
		} else {
			// On mobile, keep magic enabled for touch interactions
			return () => {
				clearTimeout(initTimer);
			};
		}
	}, []);
	
	return (
		<div id="magicCover" ref={magicRef}>
			<div id="magic" />
		</div>
	);
});

MagicCanvas.displayName = 'MagicCanvas';

export default MagicCanvas;