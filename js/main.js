document.addEventListener('DOMContentLoaded', () => {

    const isMobile = () => window.innerWidth <= 768; 

    const bannerData = [
        {
            folder: '1',
            files: ['youtube:j2VQbTdDSbk']
        },
        {
            folder: '2',
            files: ['mobsr.jpeg']
        },
        {
            folder: '3',
            files: ['pegada_de_carbono.jpeg'] 
        },
        {
            folder: '5',
            files: ['appscriseambiental.jpeg']
        }
    ];

    const resourceData = [
        {
            folder: '3',
            files: ['Pegada de carbono dos estudantes.pdf'] 
        },
        {
            folder: '4',
            files: ['brown educational history of art.pdf']
        }
    ];

    const linkData = [
        {
            name: 'Calculadora de emissão de CO₂',
            url: 'https://co-calculator.vercel.app',
            style: 'font-size: 1.3em; font-weight: bold;', 
            image: 'assets/images/7/cape.PNG' 
        },
        {
            name: 'Climaverso nos Países',
            url: 'https://climaversonospaises.my.canva.site/',
            image: 'assets/images/6/capa.PNG' 
        }
    ];

    const heroSection = document.getElementById('hero');
    const bannersContainer = document.getElementById('banners-container');
    const resourcesContainer = document.getElementById('resources-container');
    const linksContainer = document.getElementById('links-container');
    const aboutContainer = document.getElementById('about-container'); 
    const sectionNav = document.getElementById('section-nav');

    const allContentSections = [bannersContainer, resourcesContainer, linksContainer, aboutContainer]; 

    const sectionBannersBtn = document.getElementById('section-banners-btn');
    const sectionResourcesBtn = document.getElementById('section-resources-btn');
    const sectionLinksBtn = document.getElementById('section-links-btn');
    const headerLogoLink = document.getElementById('header-logo-link');
    const aboutButton = document.querySelector('.nav-buttons .join-btn'); 

    const showSection = (sectionToShow, activeButton) => {
        
        allContentSections.forEach(section => {
            section.classList.add('hidden-content');
            section.style.opacity = 0;
            section.style.height = 0;
        });
        heroSection.style.display = 'none';
        sectionNav.classList.remove('hidden-content'); 

        if (sectionToShow) {
            sectionToShow.classList.remove('hidden-content');
            gsap.to(sectionToShow, { opacity: 1, height: 'auto', duration: 0.5 });
            sectionToShow.scrollIntoView({ behavior: 'smooth' });
        }

        [sectionBannersBtn, sectionResourcesBtn, sectionLinksBtn].forEach(btn => {
            btn.classList.remove('active');
        });
        if (activeButton) {
            activeButton.classList.add('active');
        }
    };

    const loadBanners = () => {
        if (!bannersContainer) return;

        bannersContainer.innerHTML = ''; 

        bannerData.forEach(item => {
            const section = document.createElement('section');
            section.className = 'banner-section';
            section.id = `banner-${item.folder}`;

            const mediaContainer = document.createElement('div');
            mediaContainer.className = 'banner-media-container';
            section.appendChild(mediaContainer);

            item.files.forEach(fileName => {
                const mediaWrapper = document.createElement('div');
                mediaWrapper.className = 'media-item';
                let mediaElement;

                if (fileName.startsWith('youtube:')) {
                    const videoId = fileName.split(':')[1];
                    mediaElement = document.createElement('iframe');
                    mediaElement.src = `https://www.youtube.com/embed/${videoId}`;
                    mediaElement.setAttribute('frameborder', '0');
                    mediaElement.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                    mediaElement.setAttribute('allowfullscreen', '');
                    mediaElement.classList.add('youtube-video'); 
                    mediaWrapper.appendChild(mediaElement);
                } else {
                    const filePath = `assets/images/${item.folder}/${fileName}`;
                    const fileExtension = fileName.split('.').pop().toLowerCase();

                    if (['png', 'jpg', 'jpeg', 'gif'].includes(fileExtension)) {
                        mediaElement = document.createElement('img');
                        mediaElement.src = filePath;
                        mediaElement.alt = fileName;
                        mediaElement.classList.add('banner-image');
                    } else if (fileExtension === 'mp4') {
                        mediaElement = document.createElement('video');
                        mediaElement.src = filePath;
                        mediaElement.controls = true;
                        mediaElement.classList.add('banner-image');
                    } else if (fileExtension === 'pdf') {
                        if (isMobile()) {
                            mediaElement = document.createElement('p');
                            mediaElement.textContent = `Visualizar PDF: ${fileName}`;
                            mediaElement.style.fontWeight = 'bold';
                            mediaElement.style.marginBottom = '10px';
                        } else {
                            mediaElement = document.createElement('iframe');
                            mediaElement.src = filePath;
                        }
                    } else {
                        mediaElement = document.createElement('p');
                        mediaElement.textContent = `Arquivo não suportado: ${fileName}`;
                    }
                    
                    if (mediaElement) {
                        mediaWrapper.appendChild(mediaElement);
                    }

                    const downloadBtn = document.createElement('a');
                    downloadBtn.className = 'download-btn';
                    downloadBtn.href = filePath;
                    downloadBtn.download = fileName;
                    downloadBtn.textContent = 'Baixar';
                    mediaWrapper.appendChild(downloadBtn);
                }
                mediaContainer.appendChild(mediaWrapper);
            });

            bannersContainer.appendChild(section);
        });
    };

    const loadResources = () => {
        if (!resourcesContainer) return;
        resourcesContainer.innerHTML = ''; 
        resourceData.forEach(item => {
            const section = document.createElement('section');
            section.className = 'resource-section';
            section.id = `resource-${item.folder}`;
            const mediaContainer = document.createElement('div');
            mediaContainer.className = 'resource-media-container';
            section.appendChild(mediaContainer);
            item.files.forEach(fileName => {
                const filePath = `assets/images/${item.folder}/${fileName}`;
                const fileExtension = fileName.split('.').pop().toLowerCase();
                const mediaWrapper = document.createElement('div');
                mediaWrapper.className = 'media-item';
                let mediaElement;
                if (fileExtension === 'pdf') {
                    if (isMobile()) {
                        mediaElement = document.createElement('p');
                        mediaElement.textContent = `Visualizar PDF: ${fileName}`;
                        mediaElement.style.fontWeight = 'bold';
                        mediaElement.style.marginBottom = '10px';
                    } else {
                        mediaElement = document.createElement('iframe');
                        mediaElement.src = filePath;
                    }
                } else if (['png', 'jpg', 'jpeg', 'gif'].includes(fileExtension)) {
                    mediaElement = document.createElement('img');
                    mediaElement.src = filePath;
                    mediaElement.alt = fileName;
                    mediaElement.classList.add('resource-image');
                } else {
                    mediaElement = document.createElement('p');
                    mediaElement.textContent = `Arquivo não suportado: ${fileName}`;
                }
                if (mediaElement) {
                    mediaWrapper.appendChild(mediaElement);
                }
                const downloadBtn = document.createElement('a');
                downloadBtn.className = 'download-btn';
                downloadBtn.href = filePath;
                downloadBtn.download = fileName;
                downloadBtn.textContent = 'Baixar';
                mediaWrapper.appendChild(downloadBtn);
                mediaContainer.appendChild(mediaWrapper);
            });
            resourcesContainer.appendChild(section);
        });
    };

    const loadLinks = () => {
        if (!linksContainer) return;
        linksContainer.innerHTML = ''; 
        linkData.forEach(item => {
            const linkWrapper = document.createElement('div');
            linkWrapper.className = 'link-item';
            const linkElement = document.createElement('a');
            linkElement.href = item.url;
            linkElement.textContent = item.name;
            linkElement.target = '_blank'; 
            linkElement.className = 'useful-link';
            if (item.style) {
                linkElement.style = item.style;
            }
            if (item.image) {
                const linkImage = document.createElement('img');
                linkImage.src = item.image;
                linkImage.alt = item.name;
                linkImage.className = 'link-image';
                linkWrapper.appendChild(linkImage);
            }
            linkWrapper.appendChild(linkElement);
            linksContainer.appendChild(linkWrapper);
        });
    };

    const initThemeToggle = () => {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        const applyTheme = (theme) => {
            if (theme === 'light') {
                body.classList.add('light-mode');
            } else {
                body.classList.remove('light-mode');
            }
        };

        themeToggle.addEventListener('click', () => {
            const isLight = body.classList.contains('light-mode');
            const newTheme = isLight ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });

        const savedTheme = localStorage.getItem('theme') || 'dark'; 
        applyTheme(savedTheme);
    };

    const initMathParticles = () => {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const bodyFont = getComputedStyle(document.body).fontFamily;
        let particles = [];

        const mathSymbols = ['+', '−', '×', '÷', 'π', 'Σ', '∫', '√', '∞', 'ƒ', '≈', '≠'];

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        const createParticles = () => {
            particles = [];
            
            const particleCount = Math.floor(canvas.width / 30); 
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    directionX: (Math.random() * 0.4) - 0.2, 
                    directionY: (Math.random() * 0.4) - 0.2,
                    size: Math.random() * 16 + 14, 
                    symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
                    
                    color: document.body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'
                });
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                p.x += p.directionX;
                p.y += p.directionY;

                if (p.x > canvas.width + p.size || p.x < -p.size) {
                    p.directionX = -p.directionX;
                }
                if (p.y > canvas.height + p.size || p.y < -p.size) {
                    p.directionY = -p.directionY;
                }

                ctx.fillStyle = p.color;
                ctx.font = `${p.size}px ${bodyFont}`;
                ctx.fillText(p.symbol, p.x, p.y);
            }
        };

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
        
        document.getElementById('theme-toggle').addEventListener('click', () => {
            
            setTimeout(createParticles, 50);
        });

        resizeCanvas();
        createParticles();
        animate();
    };

    const initPreloader = () => {
        const preloader = document.getElementById('preloader');
        const loadingBar = document.getElementById('loading-bar');
        const body = document.body;

        gsap.to(loadingBar, {
            width: '100%',
            duration: 2, 
            ease: 'power1.inOut',
            onComplete: () => {
                gsap.delayedCall(0.5, () => {
                    
                    preloader.classList.add('hidden');
                    body.classList.remove('hidden');
                    
                    initGsapAnimations();
                    window.scrollTo(0, 0); 
                });
            }
        });
    };

    const initGsapAnimations = () => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from("header", {
            yPercent: -100,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5
        });

        gsap.from(".hero-content h1", {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 1
        });
        gsap.from(".hero-content p", {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1.3
        });

        gsap.set(".hero-buttons .hero-btn", { opacity: 0, y: 30 });

        gsap.to(".hero-buttons .hero-btn", {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1.6, 
            stagger: 0.2 
        });

        const sections = document.querySelectorAll("section:not(#hero)");
        sections.forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out"
            });
        });
    };

    const initHeroButtons = () => {
        const viewBannersBtn = document.getElementById('view-banners-btn');
        const viewResourcesBtn = document.getElementById('view-resources-btn');
        const viewLinksBtn = document.getElementById('view-links-btn');
        const heroButtons = document.querySelector('.hero-buttons');

        const handleHeroButtonClick = (sectionToShow, sectionNavButton, loadFunction) => {
            
            gsap.to(heroButtons, { opacity: 0, duration: 0.3, onComplete: () => heroButtons.style.display = 'none' });

            loadFunction();

            const tl = gsap.timeline();
            tl.to(heroSection, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => heroSection.style.display = 'none'
            })
            .to(sectionToShow, {
                onStart: () => {
                    sectionToShow.classList.remove('hidden-content');
                    sectionNav.classList.remove('hidden-content'); 
                    if (sectionNavButton) {
                        sectionNavButton.classList.add('active'); 
                    }
                },
                opacity: 1,
                duration: 0.5
            }, "-=.2")
            .then(() => {
                
                sectionToShow.scrollIntoView({ behavior: 'smooth' });
            });
        };

        if (viewBannersBtn && heroSection && bannersContainer && sectionNav) {
            viewBannersBtn.addEventListener('click', (event) => {
                event.preventDefault();
                handleHeroButtonClick(bannersContainer, sectionBannersBtn, loadBanners);
            });
        }

        if (viewResourcesBtn && heroSection && resourcesContainer && sectionNav) {
            viewResourcesBtn.addEventListener('click', (event) => {
                event.preventDefault();
                handleHeroButtonClick(resourcesContainer, sectionResourcesBtn, loadResources);
            });
        }

        if (viewLinksBtn && heroSection && linksContainer && sectionNav) {
            viewLinksBtn.addEventListener('click', (event) => {
                event.preventDefault();
                handleHeroButtonClick(linksContainer, sectionLinksBtn, loadLinks);
            });
        }
    };

    const initSectionNavigation = () => {
        
        if (sectionBannersBtn) {
            sectionBannersBtn.addEventListener('click', () => {
                showSection(bannersContainer, sectionBannersBtn);
                loadBanners();
            });
        }
        if (sectionResourcesBtn) {
            sectionResourcesBtn.addEventListener('click', () => {
                showSection(resourcesContainer, sectionResourcesBtn);
                loadResources();
            });
        }
        if (sectionLinksBtn) {
            sectionLinksBtn.addEventListener('click', () => {
                showSection(linksContainer, sectionLinksBtn);
                loadLinks();
            });
        }

        
    };

    const initHomeNavigation = () => {
        if (headerLogoLink && heroSection && sectionNav) {
            headerLogoLink.addEventListener('click', (event) => {
                event.preventDefault();
                
                allContentSections.forEach(section => {
                    section.classList.add('hidden-content');
                    section.style.opacity = 0;
                    section.style.height = 0;
                });
                sectionNav.classList.add('hidden-content'); 

                
                [sectionBannersBtn, sectionResourcesBtn, sectionLinksBtn].forEach(btn => {
                    if (btn) btn.classList.remove('active');
                });

                
                heroSection.style.display = 'flex'; 
                gsap.to(heroSection, { opacity: 1, duration: 0.5 });

                
                const heroButtons = document.querySelector('.hero-buttons');
                heroButtons.style.display = 'flex';
                gsap.to(heroButtons, { opacity: 1, duration: 0.3 });

                window.scrollTo(0, 0); 
                
            });
        }
    };

    const initAboutButton = () => {
        if (aboutButton && heroSection && aboutContainer && sectionNav) {
            aboutButton.addEventListener('click', (event) => {
                event.preventDefault();
                
                allContentSections.forEach(section => {
                    section.classList.add('hidden-content');
                    section.style.opacity = 0;
                    section.style.height = 0;
                });
                heroSection.style.display = 'none';
                sectionNav.classList.add('hidden-content'); 

                
                [sectionBannersBtn, sectionResourcesBtn, sectionLinksBtn].forEach(btn => {
                    if (btn) btn.classList.remove('active');
                });

                
                aboutContainer.classList.remove('hidden-content');
                gsap.to(aboutContainer, { opacity: 1, height: 'auto', duration: 0.5 });
                aboutContainer.scrollIntoView({ behavior: 'smooth' });

                
                const heroButtons = document.querySelector('.hero-buttons');
                if (heroButtons && heroButtons.style.display !== 'none') {
                    gsap.to(heroButtons, { opacity: 0, duration: 0.3, onComplete: () => heroButtons.style.display = 'none' });
                }
            });
        }
    };

    initThemeToggle();
    initMathParticles();
    initPreloader(); 
    initHeroButtons();
    initSectionNavigation();
    initHomeNavigation();
    initAboutButton(); 

});
