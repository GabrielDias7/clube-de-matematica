document.addEventListener('DOMContentLoaded', () => {

    // Helper function to detect if it's a mobile device
    const isMobile = () => window.innerWidth <= 768; // Using 768px as a common breakpoint for mobile

    // --- DADOS DOS BANNERS ---
    const bannerData = [
        {
            folder: '1',
            files: ['podcast.mp4']
        },
        {
            folder: '2',
            files: ['mobsr.jpeg']
        },
        {
            folder: '3',
            files: ['pegada_de_carbono.jpeg'] // Moved back
        },
        {
            folder: '5',
            files: ['appscriseambiental.jpeg']
        }
    ];

    // --- DADOS DOS RECURSOS (PDFs) ---
    const resourceData = [
        {
            folder: '3',
            files: ['Pegada de carbono dos estudantes.pdf'] // Only the PDF
        },
        {
            folder: '4',
            files: ['brown educational history of art.pdf']
        }
    ];

    // --- DADOS DOS LINKS ÚTEIS ---
    const linkData = [
        {
            name: 'Calculadora de emissão de CO₂',
            url: 'https://co-calculator.vercel.app',
            style: 'font-size: 1.3em; font-weight: bold;', // Maior destaque para o texto
            image: 'assets/images/7/cape.PNG' // New image for the link
        },
        {
            name: 'Climaverso nos Países',
            url: 'https://climaversonospaises.my.canva.site/',
            image: 'assets/images/6/capa.PNG' // Assuming capa.PNG is the image for the link
        }
    ];

    // --- Elementos de Seção --- 
    const heroSection = document.getElementById('hero');
    const bannersContainer = document.getElementById('banners-container');
    const resourcesContainer = document.getElementById('resources-container');
    const linksContainer = document.getElementById('links-container');
    const aboutContainer = document.getElementById('about-container'); // New
    const sectionNav = document.getElementById('section-nav');

    const allContentSections = [bannersContainer, resourcesContainer, linksContainer, aboutContainer]; // Updated

    // --- Botões da Navegação Fixa --- 
    const sectionBannersBtn = document.getElementById('section-banners-btn');
    const sectionResourcesBtn = document.getElementById('section-resources-btn');
    const sectionLinksBtn = document.getElementById('section-links-btn');
    const headerLogoLink = document.getElementById('header-logo-link');
    const aboutButton = document.querySelector('.nav-buttons .join-btn'); // New

    

    // --- Função para mostrar uma seção e esconder as outras --- 
    const showSection = (sectionToShow, activeButton) => {
        // Esconde todas as seções de conteúdo e a navegação fixa
        allContentSections.forEach(section => {
            section.classList.add('hidden-content');
            section.style.opacity = 0;
            section.style.height = 0;
        });
        heroSection.style.display = 'none';
        sectionNav.classList.remove('hidden-content'); // Mostra a navegação fixa

        // Mostra a seção desejada
        if (sectionToShow) {
            sectionToShow.classList.remove('hidden-content');
            gsap.to(sectionToShow, { opacity: 1, height: 'auto', duration: 0.5 });
            sectionToShow.scrollIntoView({ behavior: 'smooth' });
        }

        // Ativa o botão correto na navegação fixa
        [sectionBannersBtn, sectionResourcesBtn, sectionLinksBtn].forEach(btn => {
            btn.classList.remove('active');
        });
        if (activeButton) {
            activeButton.classList.add('active');
        }
    };

    // --- LÓGICA PARA CARREGAR OS BANNERS ---
    const loadBanners = () => {
        if (!bannersContainer) return;

        bannersContainer.innerHTML = ''; // Limpa o conteúdo anterior

        bannerData.forEach(item => {
            const section = document.createElement('section');
            section.className = 'banner-section';
            section.id = `banner-${item.folder}`;

            const mediaContainer = document.createElement('div');
            mediaContainer.className = 'banner-media-container';
            section.appendChild(mediaContainer);

            item.files.forEach(fileName => {
                const filePath = `assets/images/${item.folder}/${fileName}`;
                const fileExtension = fileName.split('.').pop().toLowerCase();

                const mediaWrapper = document.createElement('div');
                mediaWrapper.className = 'media-item';

                let mediaElement;

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

                mediaContainer.appendChild(mediaWrapper);
            });

            bannersContainer.appendChild(section);
        });
    };


    // --- LÓGICA PARA CARREGAR OS RECURSOS (PDFs) ---
    const loadResources = () => {
        if (!resourcesContainer) return;
        resourcesContainer.innerHTML = ''; // Limpa o conteúdo anterior
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


    // --- LÓGICA PARA CARREGAR OS LINKS ÚTEIS ---
    const loadLinks = () => {
        if (!linksContainer) return;
        linksContainer.innerHTML = ''; // Limpa o conteúdo anterior
        linkData.forEach(item => {
            const linkWrapper = document.createElement('div');
            linkWrapper.className = 'link-item';
            const linkElement = document.createElement('a');
            linkElement.href = item.url;
            linkElement.textContent = item.name;
            linkElement.target = '_blank'; // Open in a new tab
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


    // --- LÓGICA PARA TROCA DE TEMA ---
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

        // Aplica o tema salvo ao carregar a página
        const savedTheme = localStorage.getItem('theme') || 'dark'; // Padrão para escuro
        applyTheme(savedTheme);
    };


    // --- ANIMAÇÃO DE PARTÍCULAS MATEMÁTICAS ---
    const initMathParticles = () => {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const bodyFont = getComputedStyle(document.body).fontFamily;
        let particles = [];

        // Lista de símbolos atualizada
        const mathSymbols = ['+', '−', '×', '÷', 'π', 'Σ', '∫', '√', '∞', 'ƒ', '≈', '≠'];

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        const createParticles = () => {
            particles = [];
            // Densidade de partículas aumentada (dividindo por um número menor)
            const particleCount = Math.floor(canvas.width / 30); 
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    directionX: (Math.random() * 0.4) - 0.2, // Movimento mais lento e aleatório
                    directionY: (Math.random() * 0.4) - 0.2,
                    size: Math.random() * 16 + 14, // Tamanhos entre 14px e 30px
                    symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
                    // Define a cor com base no tema
                    color: document.body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'
                });
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Atualiza a posição
                p.x += p.directionX;
                p.y += p.directionY;

                // Faz quicar nas bordas (considerando o tamanho do símbolo)
                if (p.x > canvas.width + p.size || p.x < -p.size) {
                    p.directionX = -p.directionX;
                }
                if (p.y > canvas.height + p.size || p.y < -p.size) {
                    p.directionY = -p.directionY;
                }

                // Desenha a partícula
                ctx.fillStyle = p.color;
                ctx.font = `${p.size}px ${bodyFont}`;
                ctx.fillText(p.symbol, p.x, p.y);
            }
        };

        // Recria as partículas se a janela for redimensionada
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
        
        // Recria partículas ao mudar o tema para ajustar a cor
        document.getElementById('theme-toggle').addEventListener('click', () => {
            // Pequeno delay para garantir que a classe do body foi atualizada antes de recriar
            setTimeout(createParticles, 50);
        });

        // Início
        resizeCanvas();
        createParticles();
        animate();
    };


    // --- LÓGICA DO PRELOADER ---
    const initPreloader = () => {
        const preloader = document.getElementById('preloader');
        const loadingBar = document.getElementById('loading-bar');
        const body = document.body;

        // Simulate loading progress
        gsap.to(loadingBar, {
            width: '100%',
            duration: 2, // Duration of the loading bar animation
            ease: 'power1.inOut',
            onComplete: () => {
                gsap.delayedCall(0.5, () => {
                    // Hide preloader and show main content
                    preloader.classList.add('hidden');
                    body.classList.remove('hidden');
                    // Start main page animations after preloader is gone
                    initGsapAnimations();
                    window.scrollTo(0, 0); // Ensure scroll to top on load
                });
            }
        });
    };


    // --- ANIMAÇÕES COM GSAP ---
    const initGsapAnimations = () => {
        gsap.registerPlugin(ScrollTrigger);

        // Animação de entrada do Header
        gsap.from("header", {
            yPercent: -100,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5
        });

        // Animação de entrada do conteúdo Hero
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

        // Set initial state for buttons
        gsap.set(".hero-buttons .hero-btn", { opacity: 0, y: 30 });

        // Animate buttons to final state
        gsap.to(".hero-buttons .hero-btn", {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1.6, // Slightly after paragraph animation
            stagger: 0.2 // Stagger the animation for each button
        });

        // Animação de entrada para as outras seções ao rolar
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

    // --- LÓGICA PARA OS BOTÕES DO HERO ---
    const initHeroButtons = () => {
        const viewBannersBtn = document.getElementById('view-banners-btn');
        const viewResourcesBtn = document.getElementById('view-resources-btn');
        const viewLinksBtn = document.getElementById('view-links-btn');
        const heroButtons = document.querySelector('.hero-buttons');

        const handleHeroButtonClick = (sectionToShow, sectionNavButton, loadFunction) => {
            // Esconde os botões do hero
            gsap.to(heroButtons, { opacity: 0, duration: 0.3, onComplete: () => heroButtons.style.display = 'none' });

            // Carrega o conteúdo
            loadFunction();

            // Animação para esconder a seção hero e mostrar a seção desejada
            const tl = gsap.timeline();
            tl.to(heroSection, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => heroSection.style.display = 'none'
            })
            .to(sectionToShow, {
                onStart: () => {
                    sectionToShow.classList.remove('hidden-content');
                    sectionNav.classList.remove('hidden-content'); // Mostra a navegação fixa
                    if (sectionNavButton) {
                        sectionNavButton.classList.add('active'); // Ativa o botão correspondente na navegação fixa
                    }
                },
                opacity: 1,
                duration: 0.5
            }, "-=.2")
            .then(() => {
                // Rola suavemente para a seção
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

    // --- LÓGICA PARA NAVEGAÇÃO ENTRE SEÇÕES (botões fixos e cabeçalho) ---
    const initSectionNavigation = () => {
        // Event listeners para os botões da navegação fixa (section-nav)
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

    // --- LÓGICA PARA VOLTAR AO INÍCIO (clique no logo) ---
    const initHomeNavigation = () => {
        if (headerLogoLink && heroSection && sectionNav) {
            headerLogoLink.addEventListener('click', (event) => {
                event.preventDefault();
                // Esconde todas as seções de conteúdo e a navegação fixa
                allContentSections.forEach(section => {
                    section.classList.add('hidden-content');
                    section.style.opacity = 0;
                    section.style.height = 0;
                });
                sectionNav.classList.add('hidden-content'); // Esconde a navegação fixa

                // Remove a classe 'active' de todos os botões da navegação fixa
                [sectionBannersBtn, sectionResourcesBtn, sectionLinksBtn].forEach(btn => {
                    if (btn) btn.classList.remove('active');
                });

                // Mostra a seção hero
                heroSection.style.display = 'flex'; // Volta a ser flex para centralizar conteúdo
                gsap.to(heroSection, { opacity: 1, duration: 0.5 });

                // Mostra os botões do hero novamente
                const heroButtons = document.querySelector('.hero-buttons');
                heroButtons.style.display = 'flex';
                gsap.to(heroButtons, { opacity: 1, duration: 0.3 });

                window.scrollTo(0, 0); // Ensure scroll to top when returning home
                // heroSection.scrollIntoView({ behavior: 'smooth' }); // Removed as window.scrollTo handles it
            });
        }
    };

    

    // --- LÓGICA PARA O BOTÃO 'SOBRE' NA BARRA DE NAVEGAÇÃO ---
    const initAboutButton = () => {
        if (aboutButton && heroSection && aboutContainer && sectionNav) {
            aboutButton.addEventListener('click', (event) => {
                event.preventDefault();
                // Esconde todas as seções de conteúdo e a seção hero
                allContentSections.forEach(section => {
                    section.classList.add('hidden-content');
                    section.style.opacity = 0;
                    section.style.height = 0;
                });
                heroSection.style.display = 'none';
                sectionNav.classList.add('hidden-content'); // Esconde a navegação fixa para a seção "Sobre"

                // Remove a classe 'active' de todos os botões da navegação fixa
                [sectionBannersBtn, sectionResourcesBtn, sectionLinksBtn].forEach(btn => {
                    if (btn) btn.classList.remove('active');
                });

                // Mostra a seção "Sobre"
                aboutContainer.classList.remove('hidden-content');
                gsap.to(aboutContainer, { opacity: 1, height: 'auto', duration: 0.5 });
                aboutContainer.scrollIntoView({ behavior: 'smooth' });

                // Esconde os botões do hero se estiverem visíveis
                const heroButtons = document.querySelector('.hero-buttons');
                if (heroButtons && heroButtons.style.display !== 'none') {
                    gsap.to(heroButtons, { opacity: 0, duration: 0.3, onComplete: () => heroButtons.style.display = 'none' });
                }
            });
        }
    };

    // Inicializa todas as funções na ordem correta
    initThemeToggle();
    initMathParticles();
    initPreloader(); 
    initHeroButtons();
    initSectionNavigation();
    initHomeNavigation();
    initAboutButton(); // New

});