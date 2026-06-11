document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Animations (Intersection Observer)
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it's a metric element, trigger the counter animation
                const counter = entry.target.querySelector('[data-target]');
                if (counter && counter.textContent.startsWith('0')) {
                    animateCounter(counter);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollElements.forEach(el => revealObserver.observe(el));

    // 2. Metrics Counter Animation
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        let start = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        
        // Dynamic increments for larger numbers so all finish around 2s
        const increment = target > 100 ? Math.ceil(target / 100) : 1;
        const suffix = target === 100 ? '%' : '+';
        const isStates = target === 32 || target === 4 || target === 1; // These have no suffix
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (isStates ? '' : suffix);
                clearInterval(timer);
            } else {
                element.textContent = start + (isStates ? '' : suffix);
            }
        }, stepTime * (target > 100 ? 100 : 1));
    };

    // 3. Navbar Autohide on Scroll Down, Show on Scroll Up
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down -> Hide navbar
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up -> Show navbar
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            // Near the top -> Always show navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // 4. Contact Form Handler (Premium Interactions & Webhook Submission)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate form
            const name = contactForm.querySelector('[name="name"]').value;
            const company = contactForm.querySelector('[name="company"]').value;
            const phone = contactForm.querySelector('[name="phone"]').value;
            const projectType = contactForm.querySelector('[name="projectType"]').value;
            const message = contactForm.querySelector('[name="message"]').value;
            
            if (!name || !company || !phone || !message) {
                formStatus.style.color = '#ef4444';
                formStatus.innerHTML = 'Por favor, complete todos los campos obligatorios.';
                return;
            }

            // Disable button & show spinner loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                Procesando solicitud...
                <span class="inline-block size-3.5 border-2 border-t-transparent border-primary-foreground rounded-full animate-spin ml-2"></span>
            `;

            // Retrieve submit URL from the form's action attribute
            const submitUrl = contactForm.getAttribute('action') || '/api/submit';

            // Check if running locally (development environment)
            const isLocalDev = window.location.hostname === 'localhost' || 
                               window.location.hostname === '127.0.0.1' || 
                               window.location.protocol === 'file:';

            if (isLocalDev) {
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                    
                    formStatus.style.color = '#10b981'; // success green
                    formStatus.innerHTML = `
                        <div class="mt-4 p-4 border border-[#10b981]/20 bg-[#10b981]/5 rounded-xl text-left">
                            <strong class="text-white block mb-1">¡Modo Demostración Activo (Local)!</strong>
                            El formulario se validó correctamente. Al publicar el sitio en Cloudflare Pages con tus variables de entorno (Resend y n8n) configuradas, esta solicitud enviará una cotización formal y activará tus flujos de automatización automáticamente.
                        </div>
                    `;
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 12000);
                }, 1200);
                return;
            }

            // Real POST request to serverless endpoint /api/submit
            fetch(submitUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    company: company,
                    phone: phone,
                    projectType: projectType,
                    message: message
                })
            })
            .then(response => {
                if (response.ok) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                    
                    // Show premium success notification
                    formStatus.style.color = '#10b981'; // success green
                    formStatus.innerHTML = `
                        <div class="mt-4 p-4 border border-[#10b981]/20 bg-[#10b981]/5 rounded-xl text-left">
                            <strong class="text-white block mb-1">¡Solicitud Enviada con Éxito!</strong>
                            Estimado/a ${name}, nuestro departamento de ingeniería de cancelería y perfiles analizará tu propuesta y te contactará en menos de 24 horas hábiles.
                        </div>
                    `;
                    
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 8000);
                } else {
                    throw new Error('Servidor retornó un error');
                }
            })
            .catch(error => {
                console.error('Error al enviar el formulario:', error);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                
                // Show professional error message with fallback contact info
                formStatus.style.color = '#ef4444'; // error red
                formStatus.innerHTML = `
                    <div class="mt-4 p-4 border border-[#ef4444]/20 bg-[#ef4444]/5 rounded-xl text-left">
                        <strong class="text-white block mb-1">Error al Enviar la Solicitud</strong>
                        No pudimos enlazar con el servidor de contacto en este momento. Por favor, llámanos directamente al <strong>+52 55 5880 9974</strong> o escríbenos a <strong>contacto@cancelesmodulock.com.mx</strong>.
                    </div>
                `;
            });
        });
    }

    // 5. Smooth Scroll for Nav Links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Mobile Navigation Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');

    if (mobileMenuToggle && mobileMenuDrawer) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('is-active');
            mobileMenuDrawer.classList.toggle('is-open');
        });

        // Close drawer when clicking any link
        const mobileLinks = mobileMenuDrawer.querySelectorAll('.mobile-menu-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('is-active');
                mobileMenuDrawer.classList.remove('is-open');
            });
        });
    }

    // 7. Observer for mobile project card scroll activation
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-45% 0px -45% 0px', // Target the center 10% area of the viewport
            threshold: 0 // Trigger as soon as any part of the card enters the region
        };
        
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const isMobile = window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches;
                if (isMobile) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active-scroll');
                    } else {
                        entry.target.classList.remove('active-scroll');
                    }
                } else {
                    entry.target.classList.remove('active-scroll');
                }
            });
        }, observerOptions);
        
        projectCards.forEach(card => projectObserver.observe(card));
    }

    // 8. Observer for mobile why-choose-us card scroll activation
    const whyCards = document.querySelectorAll('.why-card');
    if (whyCards.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -20% 0px', // Target the center 60% area of the viewport
            threshold: 0 // Trigger as soon as any part of the card enters the region
        };
        
        const whyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const isMobile = window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches;
                if (isMobile) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active-scroll');
                    } else {
                        entry.target.classList.remove('active-scroll');
                    }
                } else {
                    entry.target.classList.remove('active-scroll');
                }
            });
        }, observerOptions);
        
        whyCards.forEach(card => whyObserver.observe(card));
    }

    // 9. Testimonials Carousel Logic
    const slider = document.getElementById('testimonialSlider');
    const dotsContainer = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    if (slider && dotsContainer) {
        const slides = Array.from(slider.children);
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoplayInterval;
        const autoplayDelay = 6000; // 6 seconds for comfortable dynamic rotation
        
        // Dynamically create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Ir al testimonio ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(index);
                restartAutoplay();
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        
        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }
        
        function updateCarousel() {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                restartAutoplay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                restartAutoplay();
            });
        }
        
        // Touch Gestures for mobile swipe support
        let startX = 0;
        let endX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            pauseAutoplay();
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            if (diffX > 50) {
                // Swipe left -> Next slide
                nextSlide();
            } else if (diffX < -50) {
                // Swipe right -> Prev slide
                prevSlide();
            }
            startAutoplay();
        }, { passive: true });
        
        slider.addEventListener('touchcancel', () => {
            startAutoplay();
        }, { passive: true });
        
        // Mouse hover pause/resume (Desktop UI/UX)
        const carouselContainer = document.querySelector('.testimonial-carousel-container');
        if (carouselContainer && window.matchMedia('(hover: hover)').matches) {
            carouselContainer.addEventListener('mouseenter', pauseAutoplay);
            carouselContainer.addEventListener('mouseleave', startAutoplay);
        }
        
        function startAutoplay() {
            if (!autoplayInterval) {
                autoplayInterval = setInterval(nextSlide, autoplayDelay);
            }
        }
        
        function pauseAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }
        
        function restartAutoplay() {
            pauseAutoplay();
            startAutoplay();
        }
        
        // Initialize Autoplay
        startAutoplay();
    }
});

// Inline styles for rotating spinner animation in JavaScript
const spinnerStyles = document.createElement('style');
spinnerStyles.innerText = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.animate-spin {
    animation: spin 1s linear infinite;
    display: inline-block;
    vertical-align: middle;
}
.size-3.5 {
    width: 0.875rem;
    height: 0.875rem;
}
`;
document.head.appendChild(spinnerStyles);
