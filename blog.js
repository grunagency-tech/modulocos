document.addEventListener('DOMContentLoaded', () => {

    // 1. DEFAULT PRE-POPULATED BLOG POSTS
    const defaultPosts = [
        {
            id: 1,
            title: "Aislamiento Térmico y Acústico: El Estándar de la Ventanería Línea Española",
            category: "Aluminio y Vidrio",
            excerpt: "Analizamos cómo los sistemas europeos y nacionales de alta gama mejoran la eficiencia energética en residencias y corporativos en México.",
            content: "El aislamiento acústico y térmico se ha convertido en una necesidad primordial en la arquitectura contemporánea de las grandes urbes mexicanas. La Ventanería Línea Española (como los sistemas Eurovent Premium) destaca por incorporar tecnologías de ruptura de puente térmico (RPT) y empaques de EPDM de alta resistencia. Al combinar perfiles de aluminio extruido calibrado con doble acristalamiento templado (unidad Duoplus con cámaras de gas argón), se logra reducir el ruido exterior en hasta 40 decibelios y se disminuye en un 35% la pérdida de calor o climatización. Esto no solo se traduce en un confort inmediato para el usuario residencial o corporativo, sino también en un ahorro energético considerable a mediano y largo plazo.",
            date: "28 May 2026",
            image: "assets/service-aluminum-DfJojfyS.jpg"
        },
        {
            id: 2,
            title: "Seguridad Perimetral Inteligente: Implementación de Reja de Acero Modulock en Naves Industriales",
            category: "Seguridad Perimetral",
            excerpt: "Guía técnica sobre la colocación de sistemas electrosoldados de alta resistencia en centros logísticos y almacenes.",
            content: "Los centros logísticos y naves industriales en zonas de alta plusvalía o corredores industriales como Querétaro, San Luis Potosí y Monterrey requieren de sistemas de delimitación robustos pero con estética limpia. El sistema de Reja de Acero Modulock destaca por su malla de acero electrosoldado de alta especificación con nervaduras de refuerzo bidimensionales. Su recubrimiento de poliéster termoendurecido proporciona una protección anticorrosión excepcional, diseñada para soportar los climas más duros del país sin perder color ni resistencia estructural. Al complementarse con fijaciones ocultas anti-vandalismo y concertina de seguridad de acero inoxidable, se convierte en un perímetro impenetrable y estético que cumple con los requerimientos logísticos internacionales.",
            date: "15 May 2026",
            image: "assets/service-fencing-BTbCOTmA.jpg"
        },
        {
            id: 3,
            title: "Suministro e Instalación en Obra: El Reto de las Alturas en Fachadas Suspendidas",
            category: "Aluminio y Vidrio",
            excerpt: "Cómo planificamos la instalación de fachadas acristaladas con sistemas de herrajes araña y cristal curvo de gran tamaño.",
            content: "La instalación de fachadas de vidrio suspendidas con herrajes tipo araña (Spider Systems) en plazas comerciales o corporativos representa uno de los retos de ingeniería más complejos en la construcción. Exige un análisis estricto de cargas de viento, tolerancias milimétricas en los barrenos del cristal templado de 10mm o 12mm, y personal altamente capacitado en trabajos de altura con plataformas articuladas. En CAAMODULOCK, cada pieza de cristal y perfil se manufactura bajo estrictas normas de control de calidad. Nuestro equipo coordina la entrega justo a tiempo y el montaje sistemático utilizando metodologías CPM para evitar paros de obra y garantizar que el sellado estructural y el soporte metálico mantengan una integridad absoluta frente a movimientos sísmicos y ráfagas de viento.",
            date: "03 May 2026",
            image: "assets/project-commercial-Du_Spt2l.jpg"
        }
    ];

    // 2. RENDER POSTS FUNCTION
    const blogPostsGrid = document.getElementById('blogPostsGrid');

    const getFormattedDate = () => {
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        const d = new Date();
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    const loadPosts = () => {
        // Read custom posts from localStorage
        const customPosts = JSON.parse(localStorage.getItem('modulock_blog_posts')) || [];
        
        // Merge custom posts (newest first) and default posts
        const allPosts = [...customPosts, ...defaultPosts];
        
        blogPostsGrid.innerHTML = '';
        
        allPosts.forEach((post, index) => {
            const card = document.createElement('article');
            card.className = 'blog-card scroll-reveal';
            card.style.transitionDelay = `${(index % 3) * 0.1}s`;
            
            card.innerHTML = `
                <div class="blog-card-img-wrapper">
                    <img src="${post.image}" alt="${post.title}" class="blog-card-img" loading="lazy" />
                </div>
                <div class="blog-card-content">
                    <span class="blog-card-category">${post.category}</span>
                    <h3 class="blog-card-title">${post.title}</h3>
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                    <div class="blog-card-meta">
                        <span>${post.date}</span>
                        <button class="read-more-btn font-bold text-xs uppercase tracking-wider hover:opacity-80 transition-opacity" style="color: var(--primary-glow)">Leer más →</button>
                    </div>
                </div>
            `;
            
            // Add click listener for full post reading
            const readMoreBtn = card.querySelector('.read-more-btn');
            readMoreBtn.addEventListener('click', () => openFullPost(post));

            blogPostsGrid.appendChild(card);
        });

        // Initialize scroll reveal on newly loaded items
        initScrollReveal();
    };

    // 3. READ POST MODAL GENERATION (DYNAMIC POPUP)
    const openFullPost = (post) => {
        // Create popup elements dynamically
        const popupOverlay = document.createElement('div');
        popupOverlay.className = 'admin-modal-overlay active';
        popupOverlay.style.zIndex = '10010';
        
        popupOverlay.innerHTML = `
            <div class="admin-modal-container" style="max-width: 750px; width: 95%;">
                <div class="admin-modal-header" style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 1rem; margin-bottom: 1.5rem;">
                    <div>
                        <span class="blog-card-category" style="display: block; margin-bottom: 0.25rem;">${post.category}</span>
                        <h2 class="text-2xl font-black text-white uppercase tracking-tight">${post.title}</h2>
                    </div>
                    <span class="close-post-btn admin-modal-close-btn font-bold text-2xl" style="padding-left: 1.5rem;">&times;</span>
                </div>
                <div style="margin-bottom: 1.5rem; border-radius: 1rem; overflow: hidden; aspect-ratio: 16/9; max-height: 350px;">
                    <img src="${post.image}" alt="${post.title}" style="width:100%; height:100%; object-fit:cover;" />
                </div>
                <div style="font-size: 0.75rem; color: #9ca3af; margin-bottom: 1rem; font-family: var(--font-mono)">Publicado: ${post.date}</div>
                <div style="font-size: 0.95rem; color: #d1d5db; line-height: 1.8; text-align: justify; white-space: pre-line;">
                    ${post.content}
                </div>
            </div>
        `;
        
        document.body.appendChild(popupOverlay);
        document.body.style.overflow = 'hidden'; // Lock background scroll
        
        const closeBtn = popupOverlay.querySelector('.close-post-btn');
        const closePopup = () => {
            popupOverlay.classList.remove('active');
            setTimeout(() => {
                popupOverlay.remove();
                document.body.style.overflow = 'auto'; // Unlock background scroll
            }, 300);
        };
        
        closeBtn.addEventListener('click', closePopup);
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) closePopup();
        });
    };

    // 4. ADMIN LOGIN & PANEL LOGIC
    const adminTrigger = document.getElementById('adminTrigger');
    const loginModal = document.getElementById('loginModal');
    const closeLoginBtn = document.getElementById('closeLoginBtn');
    const loginForm = document.getElementById('loginForm');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const loginError = document.getElementById('loginError');
    const adminPanelModal = document.getElementById('adminPanelModal');
    const logoutBtn = document.getElementById('logoutBtn');
    const createPostForm = document.getElementById('createPostForm');

    // Automatically grant write permissions (authenticated by default for local testing)
    if (sessionStorage.getItem('modulock_is_admin') === null) {
        sessionStorage.setItem('modulock_is_admin', 'true');
    }

    // Check auth state helper
    const isAdminAuthenticated = () => {
        return sessionStorage.getItem('modulock_is_admin') === 'true';
    };

    // Open Admin workflow
    adminTrigger.addEventListener('click', () => {
        if (isAdminAuthenticated()) {
            adminPanelModal.classList.add('active');
        } else {
            loginModal.classList.add('active');
            adminPasswordInput.focus();
        }
    });

    // Close Login Modal
    closeLoginBtn.addEventListener('click', () => {
        loginModal.classList.remove('active');
        loginForm.reset();
        loginError.style.display = 'none';
    });

    // Handle Login Submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = adminPasswordInput.value;
        
        // Owner validation password
        if (pwd === 'Modulock2026') {
            sessionStorage.setItem('modulock_is_admin', 'true');
            loginModal.classList.remove('active');
            loginForm.reset();
            loginError.style.display = 'none';
            
            // Open Admin Panel
            setTimeout(() => {
                adminPanelModal.classList.add('active');
            }, 300);
        } else {
            loginError.style.display = 'block';
            adminPasswordInput.value = '';
            adminPasswordInput.focus();
        }
    });

    // Handle Logout
    logoutBtn.addEventListener('click', () => {
        sessionStorage.setItem('modulock_is_admin', 'false');
        adminPanelModal.classList.remove('active');
        createPostForm.reset();
        resetUploadUI();
        const defaultRadio = document.querySelector('input[name="imageSource"][value="default"]');
        if (defaultRadio) {
            defaultRadio.checked = true;
            defaultImageContainer.style.display = 'block';
            uploadImageContainer.style.display = 'none';
        }
    });

    // Image source toggle and upload state
    let uploadedImageBase64 = null;

    const defaultImageContainer = document.getElementById('defaultImageContainer');
    const uploadImageContainer = document.getElementById('uploadImageContainer');
    const postImageFile = document.getElementById('postImageFile');
    const uploadPrompt = document.getElementById('uploadPrompt');
    const uploadDropzone = document.getElementById('uploadDropzone');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removeUploadedImage = document.getElementById('removeUploadedImage');

    // Handle image source radio toggle
    const imageSourceRadios = document.querySelectorAll('input[name="imageSource"]');
    imageSourceRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'default') {
                defaultImageContainer.style.display = 'block';
                uploadImageContainer.style.display = 'none';
            } else {
                defaultImageContainer.style.display = 'none';
                uploadImageContainer.style.display = 'block';
            }
        });
    });

    // File selection trigger
    uploadPrompt.addEventListener('click', () => {
        postImageFile.click();
    });

    // Handle file input selection
    postImageFile.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            await handleFileProcessing(file);
        }
    });

    // Drag and drop event listeners
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadDropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadDropzone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadDropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadDropzone.classList.remove('dragover');
        }, false);
    });

    uploadDropzone.addEventListener('drop', async (e) => {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        if (file && file.type.startsWith('image/')) {
            await handleFileProcessing(file);
        }
    });

    // Helper to process, compress and preview image
    const handleFileProcessing = async (file) => {
        uploadPrompt.style.display = 'none';
        imagePreviewContainer.style.display = 'block';
        // Base64 mini spinner for loading indicator while Canvas compresses
        imagePreview.src = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="%23f5a55c" stroke-width="8" fill="none" stroke-dasharray="180 80"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite"/></circle></svg>';
        
        const compressed = await compressImage(file);
        if (compressed) {
            uploadedImageBase64 = compressed;
            imagePreview.src = compressed;
        } else {
            resetUploadUI();
        }
    };

    // Remove uploaded image
    removeUploadedImage.addEventListener('click', (e) => {
        e.preventDefault();
        resetUploadUI();
    });

    const resetUploadUI = () => {
        uploadedImageBase64 = null;
        postImageFile.value = '';
        imagePreview.src = '';
        imagePreviewContainer.style.display = 'none';
        uploadPrompt.style.display = 'block';
    };

    // Compress image function using HTML5 Canvas
    const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.7) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    try {
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;

                        if (width > height) {
                            if (width > maxWidth) {
                                height = Math.round((height * maxWidth) / width);
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width = Math.round((width * maxHeight) / height);
                                height = maxHeight;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;

                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                        resolve(compressedBase64);
                    } catch (e) {
                        console.error("Canvas compression failed, falling back to original base64", e);
                        resolve(event.target.result);
                    }
                };
                img.onerror = () => {
                    resolve(event.target.result);
                };
            };
            reader.onerror = () => {
                resolve(null);
            };
        });
    };

    // Handle Create Post Submit
    createPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('postTitle').value;
        const category = document.getElementById('postCategory').value;
        const excerpt = document.getElementById('postExcerpt').value;
        const content = document.getElementById('postContent').value;
        
        const selectedSource = document.querySelector('input[name="imageSource"]:checked').value;
        let image = "";
        
        if (selectedSource === 'upload') {
            if (uploadedImageBase64) {
                image = uploadedImageBase64;
            } else {
                alert("Por favor, suba una imagen de portada o seleccione la opción predeterminada del sitio.");
                return;
            }
        } else {
            image = document.getElementById('postImage').value;
        }
        
        const newPost = {
            id: Date.now(),
            title,
            category,
            excerpt,
            content,
            date: getFormattedDate(),
            image
        };
        
        // Save in localStorage
        const customPosts = JSON.parse(localStorage.getItem('modulock_blog_posts')) || [];
        customPosts.unshift(newPost); // Add at the start (newest first)
        localStorage.setItem('modulock_blog_posts', JSON.stringify(customPosts));
        
        // Reset and close admin panel
        createPostForm.reset();
        resetUploadUI();
        
        // Restore radio to default source toggle
        const defaultRadio = document.querySelector('input[name="imageSource"][value="default"]');
        if (defaultRadio) {
            defaultRadio.checked = true;
            defaultImageContainer.style.display = 'block';
            uploadImageContainer.style.display = 'none';
        }
        
        adminPanelModal.classList.remove('active');
        
        // Reload all posts
        setTimeout(() => {
            loadPosts();
        }, 300);
    });

    // Close Modals on overlay click
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            loginForm.reset();
            loginError.style.display = 'none';
        }
    });
    
    adminPanelModal.addEventListener('click', (e) => {
        if (e.target === adminPanelModal) {
            adminPanelModal.classList.remove('active');
        }
    });

    // 5. NAVBAR AUTOHIDE LOGIC
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

    // 6. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    let revealObserver;
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        if (revealObserver) {
            revealObserver.disconnect();
        }
        
        revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -35px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    };

    // 7. Mobile Navigation Menu Toggle
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

    // Load posts on page enter
    loadPosts();
});
