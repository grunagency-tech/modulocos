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

    // 4. Contact Form Handler (Premium Interactions)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate form
            const name = contactForm.querySelector('[name="name"]').value;
            const company = contactForm.querySelector('[name="company"]').value;
            const phone = contactForm.querySelector('[name="phone"]').value;
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

            // Simulate server request delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                
                // Show clean premium success notification
                formStatus.style.color = '#10b981'; // success green
                formStatus.innerHTML = `
                    <div class="mt-4 p-4 border border-[#10b981]/20 bg-[#10b981]/5 rounded-xl">
                        <strong class="text-white block mb-1">¡Solicitud Enviada con Éxito!</strong>
                        Estimado/a ${name}, nuestro departamento de ingeniería de cancelería y perfiles analizará tu propuesta y te contactará en menos de 24 horas hábiles.
                    </div>
                `;
                
                // Reset form fields
                contactForm.reset();
                
                // Clear message after 8 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 8000);

            }, 1800);
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
    const hamburgerLines = {
        line1: document.getElementById('hamburgerLine1'),
        line2: document.getElementById('hamburgerLine2'),
        line3: document.getElementById('hamburgerLine3')
    };

    if (mobileMenuToggle && mobileMenuDrawer) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = mobileMenuDrawer.classList.contains('opacity-100');
            if (isOpen) {
                // Close Drawer
                mobileMenuDrawer.classList.remove('opacity-100', 'pointer-events-auto');
                mobileMenuDrawer.classList.add('opacity-0', 'pointer-events-none');
                
                // Animate hamburger back
                hamburgerLines.line1.style.transform = 'none';
                hamburgerLines.line2.style.opacity = '1';
                hamburgerLines.line3.style.transform = 'none';
            } else {
                // Open Drawer
                mobileMenuDrawer.classList.remove('opacity-0', 'pointer-events-none');
                mobileMenuDrawer.classList.add('opacity-100', 'pointer-events-auto');
                
                // Animate hamburger to X
                hamburgerLines.line1.style.transform = 'rotate(45deg) translate(2px, -1px)';
                hamburgerLines.line2.style.opacity = '0';
                hamburgerLines.line3.style.transform = 'rotate(-45deg) translate(2px, 1px)';
            }
        });

        // Close drawer when clicking any link
        const mobileLinks = mobileMenuDrawer.querySelectorAll('.mobile-menu-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuDrawer.classList.remove('opacity-100', 'pointer-events-auto');
                mobileMenuDrawer.classList.add('opacity-0', 'pointer-events-none');
                hamburgerLines.line1.style.transform = 'none';
                hamburgerLines.line2.style.opacity = '1';
                hamburgerLines.line3.style.transform = 'none';
            });
        });
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
