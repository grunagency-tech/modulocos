document.addEventListener('DOMContentLoaded', () => {

    // 1. PASSWORD GATING SECURITY
    const cmsLoginOverlay = document.getElementById('cmsLoginOverlay');
    const cmsLoginForm = document.getElementById('cmsLoginForm');
    const cmsUserInput = document.getElementById('cmsUserInput');
    const cmsPasswordInput = document.getElementById('cmsPasswordInput');
    const cmsLoginError = document.getElementById('cmsLoginError');
    const cmsLogoutBtn = document.getElementById('cmsLogoutBtn');

    const checkAuth = () => {
        if (sessionStorage.getItem('modulock_is_admin') === 'true') {
            cmsLoginOverlay.classList.add('hidden');
            if (!sessionStorage.getItem('modulock_admin_user')) {
                sessionStorage.setItem('modulock_admin_user', 'Alexandra Ortiz');
            }
        } else {
            cmsLoginOverlay.classList.remove('hidden');
            if (cmsPasswordInput) cmsPasswordInput.focus();
        }
    };

    if (cmsLoginForm) {
        cmsLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = cmsUserInput ? cmsUserInput.value : 'Alexandra Ortiz';
            const pwd = cmsPasswordInput.value;

            let isValid = false;
            if (user === 'Alexandra Ortiz' && pwd === '12345') {
                isValid = true;
            } else if (user === 'Modulock Team' && pwd === '678910') {
                isValid = true;
            }

            if (isValid) {
                sessionStorage.setItem('modulock_is_admin', 'true');
                sessionStorage.setItem('modulock_admin_user', user);
                cmsLoginError.style.display = 'none';
                cmsPasswordInput.value = '';
                checkAuth();
                renderLivePreview();
                updateJsonOutput();
            } else {
                cmsLoginError.style.display = 'block';
                cmsPasswordInput.value = '';
                cmsPasswordInput.focus();
            }
        });
    }

    if (cmsLogoutBtn) {
        cmsLogoutBtn.addEventListener('click', () => {
            sessionStorage.setItem('modulock_is_admin', 'false');
            sessionStorage.removeItem('modulock_admin_user');
            checkAuth();
        });
    }

    // Run auth check immediately
    checkAuth();


    // 2. DEFAULT SYSTEM POSTS DATABASE (Mirroring blog.js)
    const defaultPosts = [
        {
            id: 1,
            slug: "aislamiento-termico-acustico-ventaneria-espanola",
            title: "Aislamiento Térmico y Acústico: El Estándar de la Ventanería Línea Española",
            category: "Aluminio y Vidrio",
            excerpt: "Analizamos cómo los sistemas europeos y nacionales de alta gama mejoran la eficiencia energética en residencias y corporativos en México.",
            readTime: "5 min de lectura",
            date: "28 May 2026",
            image: "assets/service-aluminum-DfJojfyS.jpg",
            isSystem: true,
            content: `<h2>La evolución del confort y la eficiencia energética</h2>
<p>El aislamiento acústico y térmico se ha convertido en una necesidad primordial en la arquitectura contemporánea de las grandes urbes mexicanas. La Ventanería Línea Española (como los sistemas Eurovent Premium) destaca por incorporar tecnologías de ruptura de puente térmico (RPT) y empaques de EPDM de alta resistencia. Al combinar perfiles de aluminio extruido calibrado con doble acristalamiento templado (unidad Duoplus con cámaras de gas argón), se logra reducir el ruido exterior en hasta 40 decibelios y se disminuye en un 35% la pérdida de calor o climatización. Esto no solo se traduce en un confort inmediato para el usuario residencial o corporativo, sino también en un ahorro energético considerable a mediano y largo plazo.</p>

<div class="callout-box">
    <strong>Nota técnica sobre RPT (Ruptura de Puente Térmico):</strong>
    La RPT consiste en insertar un perfil de poliamida reforzada con fibra de vidrio entre la cara exterior e interior del perfil de aluminio, impidiendo la transmisión directa de calor y evitando la condensación en los cristales.
</div>

<h3>Componentes Clave del Sistema Eurovent Premium</h3>
<p>Para asegurar un desempeño hermético, el sistema debe concebirse de forma integral combinando tres elementos principales:</p>
<ul>
    <li><strong>Perfiles de aluminio calibrado:</strong> Aleaciones de aluminio extruido de alta especificación para tolerancias milimétricas.</li>
    <li><strong>Empaques de EPDM de doble contacto:</strong> Sellos elásticos que garantizan hermeticidad frente a viento y lluvia batiente.</li>
    <li><strong>Unidades de vidrio aislante (Doble Acristalamiento):</strong> Espesor adecuado de cámara de aire o gas argón para reducir conductividad térmica.</li>
</ul>

<blockquote>
    "La correcta especificación de cancelería europea es el factor diferencial que transforma un espacio de oficina ordinario en un templo de productividad libre de ruido urbano."
    <cite>— Arq. Diana Rangel</cite>
</blockquote>`,
            blocks: [
                { id: 1, type: "h2", value: "La evolución del confort y la eficiencia energética" },
                { id: 2, type: "p", value: "El aislamiento acústico y térmico se ha convertido en una necesidad primordial en la arquitectura contemporánea de las grandes urbes mexicanas. La Ventanería Línea Española (como los sistemas Eurovent Premium) destaca por incorporar tecnologías de ruptura de puente térmico (RPT) y empaques de EPDM de alta resistencia. Al combinar perfiles de aluminio extruido calibrado con doble acristalamiento templado (unidad Duoplus con cámaras de gas argón), se logra reducir el ruido exterior en hasta 40 decibelios y se disminuye en un 35% la pérdida de calor o climatización. Esto no solo se traduce en un confort inmediato para el usuario residencial o corporativo, sino también en un ahorro energético considerable a mediano y largo plazo." },
                { id: 3, type: "callout", value: { title: "Nota técnica sobre RPT (Ruptura de Puente Térmico)", text: "La RPT consiste en insertar un perfil de poliamida reforzada con fibra de vidrio entre la cara exterior e interior del perfil de aluminio, impidiendo la transmisión directa de calor y evitando la condensación en los cristales." } },
                { id: 4, type: "h3", value: "Componentes Clave del Sistema Eurovent Premium" },
                { id: 5, type: "p", value: "Para asegurar un desempeño hermético, el sistema debe concebirse de forma integral combinando tres elementos principales:\n- Perfiles de aluminio calibrado: Aleaciones de aluminio extruido de alta especificación.\n- Empaques de EPDM de doble contacto: Sellos elásticos que garantizan hermeticidad.\n- Unidades de vidrio aislante (Doble Acristalamiento): Espesor de cámara de aire adecuado." },
                { id: 6, type: "quote", value: { text: "La correcta especificación de cancelería europea es el factor diferencial que transforma un espacio de oficina ordinario en un templo de productividad libre de ruido urbano.", author: "Arq. Diana Rangel" } }
            ]
        },
        {
            id: 2,
            slug: "seguridad-perimetral-inteligente-reja-acero-naves-industriales",
            title: "Seguridad Perimetral Inteligente: Implementación de Reja de Acero Modulock en Naves Industriales",
            category: "Seguridad Perimetral",
            excerpt: "Guía técnica sobre la colocación de sistemas electrosoldados de alta resistencia en centros logísticos y almacenes.",
            readTime: "4 min de lectura",
            date: "15 May 2026",
            image: "assets/service-fencing-BTbCOTmA.jpg",
            isSystem: true,
            content: `<h2>El reto de salvaguardar activos a gran escala</h2>
<p>Las naves industriales, almacenes logísticos y centros de distribución de alta densidad demandan perímetros que no solo delimiten la propiedad física, sino que actúen como verdaderas barreras de contención activa y retardo. El sistema de Reja de Acero electrosoldada Modulock representa el estándar de ingeniería idóneo para estas especificaciones. Fabricado con varillas de acero de alta resistencia trefilado y dispuestas de forma ortogonal, este sistema es sometido a un recubrimiento de poliéster termoendurecido de alta adherencia que supera la cámara salina de 1000 horas, asegurando durabilidad ante condiciones climáticas agresivas sin requerir mantenimiento.</p>

<div class="callout-box">
    <strong>Consejo de obra perimetral:</strong>
    En zonas con topografías accidentadas, la modulación en escalonado es ideal. El poste de acero Modulock permite absorber pendientes pronunciadas sin necesidad de cortar paneles ni debilitar los anclajes estructurales.
</div>`,
            blocks: [
                { id: 1, type: "h2", value: "El reto de salvaguardar activos a gran escala" },
                { id: 2, type: "p", value: "Las naves industriales, almacenes logísticos y centros de distribución de alta densidad demandan perímetros que no solo delimiten la propiedad física, sino que actúen como verdaderas barreras de contención activa y retardo. El sistema de Reja de Acero electrosoldada Modulock representa el estándar de ingeniería idóneo para estas especificaciones. Fabricado con varillas de acero de alta resistencia trefilado y dispuestas de forma ortogonal, este sistema es sometido a un recubrimiento de poliéster termoendurecido de alta adherencia que supera la cámara salina de 1000 horas, asegurando durabilidad ante condiciones climáticas agresivas sin requerir mantenimiento." },
                { id: 3, type: "callout", value: { title: "Consejo de obra perimetral", text: "En zonas con topografías accidentadas, la modulación en escalonado es ideal. El poste de acero Modulock permite absorber pendientes pronunciadas sin necesidad de cortar paneles ni debilitar los anclajes estructurales." } }
            ]
        },
        {
            id: 3,
            slug: "suministro-instalacion-obra-reto-alturas-fachadas-suspendidas",
            title: "Suministro e Instalación en Obra: El Reto de las Alturas en Fachadas Suspendidas",
            category: "Aluminio y Vidrio",
            excerpt: "Cómo planificamos la instalación de fachadas acristaladas con sistemas de herrajes araña y cristal curvo de gran tamaño.",
            readTime: "6 min de lectura",
            date: "03 May 2026",
            image: "assets/project-commercial-Du_Spt2l.jpg",
            isSystem: true,
            content: `<h2>Logística vertical de elementos de gran formato</h2>
<p>La instalación de fachadas suspendidas acristaladas de gran altura requiere una planeación milimétrica y rigurosos protocolos de seguridad industrial. El peso propio de las unidades de cristal curvo o templado de 19mm, sumado a las fuerzas del viento a alturas superiores a 30 metros, exige un cálculo estructural exhaustivo de los anclajes y los herrajes tipo araña. Cada pieza es izada mediante grúas torre y manipuladores de ventosas automáticas con sistemas redundantes de vacío. En este artículo detallamos la planeación de izaje, las tolerancias de montaje permitidas y los métodos de nivelación óptica.</p>`,
            blocks: [
                { id: 1, type: "h2", value: "Logística vertical de elementos de gran formato" },
                { id: 2, type: "p", value: "La instalación de fachadas suspendidas acristaladas de gran altura requiere una planeación milimétrica y rigurosos protocolos de seguridad industrial. El peso propio de las unidades de cristal curvo o templado de 19mm, sumado a las fuerzas del viento a alturas superiores a 30 metros, exige un cálculo estructural exhaustivo de los anclajes y los herrajes tipo araña. Cada pieza es izada mediante grúas torre y manipuladores de ventosas automáticas con sistemas redundantes de vacío. En este artículo detallamos la planeación de izaje, las tolerancias de montaje permitidas y los métodos de nivelación óptica." }
            ]
        }
    ];


    // 3. STATE VARIABLES
    let posts = [];
    let selectedPostId = null;
    let selectedPostIsSystem = false;
    let currentPostBlocks = [];
    let uploadedImageBase64 = null;
    let activeTab = 'editor';
    let searchQuery = '';


    // 4. ELEMENT REFERENCES
    const cmsPostList = document.getElementById('cmsPostList');
    const cmsSearchInput = document.getElementById('cmsSearchInput');
    const cmsNewPostBtn = document.getElementById('cmsNewPostBtn');
    const cmsSaveBtn = document.getElementById('cmsSaveBtn');
    const cmsTabBtns = document.querySelectorAll('.cms-tab-btn');
    const cmsPanels = document.querySelectorAll('.cms-panel');

    // Editor Form fields
    const postTitle = document.getElementById('postTitle');
    const postCategory = document.getElementById('postCategory');
    const postExcerpt = document.getElementById('postExcerpt');
    const postImage = document.getElementById('postImage');
    const postImageFile = document.getElementById('postImageFile');
    const defaultImageContainer = document.getElementById('defaultImageContainer');
    const uploadImageContainer = document.getElementById('uploadImageContainer');
    const uploadDropzone = document.getElementById('uploadDropzone');
    const uploadPrompt = document.getElementById('uploadPrompt');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removeUploadedImage = document.getElementById('removeUploadedImage');
    const blockBuilder = document.getElementById('blockBuilder');

    // Preview Pane fields
    const articlePreviewHero = document.getElementById('articlePreviewHero');
    const articlePreviewHeroImg = document.getElementById('articlePreviewHeroImg');
    const articlePreviewCategory = document.getElementById('articlePreviewCategory');
    const articlePreviewTitle = document.getElementById('articlePreviewTitle');
    const articlePreviewAuthor = document.getElementById('articlePreviewAuthor');
    const articlePreviewDate = document.getElementById('articlePreviewDate');
    const articlePreviewReadTime = document.getElementById('articlePreviewReadTime');
    const articlePreviewContent = document.getElementById('articlePreviewContent');
    const articlePreviewAuthorAvatar = document.getElementById('articlePreviewAuthorAvatar');
    const articlePreviewAuthorName = document.getElementById('articlePreviewAuthorName');
    const articlePreviewAuthorRole = document.getElementById('articlePreviewAuthorRole');
    const articlePreviewAuthorBio = document.getElementById('articlePreviewAuthorBio');

    // JSON Page fields
    const cmsJsonTextarea = document.getElementById('cmsJsonTextarea');
    const cmsCopyJsonBtn = document.getElementById('cmsCopyJsonBtn');
    const cmsExportDbBtn = document.getElementById('cmsExportDbBtn');
    const cmsImportDbBtn = document.getElementById('cmsImportDbBtn');
    const cmsImportFilePicker = document.getElementById('cmsImportFilePicker');

    // Cropper.js variables and modal references
    const cmsCropModal = document.getElementById('cmsCropModal');
    const cropModalImage = document.getElementById('cropModalImage');
    const cropRotateLeftBtn = document.getElementById('cropRotateLeftBtn');
    const cropRotateRightBtn = document.getElementById('cropRotateRightBtn');
    const cropAspectFreeBtn = document.getElementById('cropAspectFreeBtn');
    const cropAspect16_9Btn = document.getElementById('cropAspect16_9Btn');
    const cropAspect4_3Btn = document.getElementById('cropAspect4_3Btn');
    const cropAspect1_1Btn = document.getElementById('cropAspect1_1Btn');
    const cropCancelBtn = document.getElementById('cropCancelBtn');
    const cropSaveBtn = document.getElementById('cropSaveBtn');
    let cropperInstance = null;



    // 5. HELPER METHODS
    const getLoggedAuthor = () => {
        const currentUser = sessionStorage.getItem('modulock_admin_user') || 'Alexandra Ortiz';
        if (currentUser === 'Modulock Team') {
            return {
                name: "Modulock Team",
                role: "Ingeniería y Seguridad",
                image: "assets/ML-BlancoNAranja.png",
                bio: "Redactores técnicos oficiales de Modulock. Compartiendo especificaciones de obra, guías de materiales y noticias del sector."
            };
        } else {
            return {
                name: "Alexandra Ortiz",
                role: "Dirección de Proyectos",
                image: "assets/ML-BlancoNAranja.png",
                bio: "Administradora de contenidos y proyectos especiales en Modulock."
            };
        }
    };

    const slugify = (text) => {
        return text.toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/[\s-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const getFormattedDate = () => {
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        const d = new Date();
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    const resetUploadUI = () => {
        uploadedImageBase64 = null;
        if (postImageFile) postImageFile.value = '';
        imagePreview.src = '';
        imagePreviewContainer.style.display = 'none';
        uploadPrompt.style.display = 'block';
    };


    // 6. DB LOADER AND SIDEBAR RENDERER
    const loadPostsDatabase = () => {
        const customPosts = JSON.parse(localStorage.getItem('modulock_blog_posts')) || [];
        const deletedSystem = JSON.parse(localStorage.getItem('modulock_deleted_system_posts')) || [];
        
        // Convert custom posts into local database structure
        const mappedCustom = customPosts.map(p => ({
            ...p,
            isSystem: false
        }));

        const filteredDefault = defaultPosts.filter(p => !deletedSystem.includes(p.id));
        posts = [...filteredDefault, ...mappedCustom];
        renderSidebarPosts();
    };

    const renderSidebarPosts = () => {
        cmsPostList.innerHTML = '';
        
        const filtered = posts.filter(post => {
            return post.title.toLowerCase().includes(searchQuery) ||
                   post.category.toLowerCase().includes(searchQuery);
        });

        if (filtered.length === 0) {
            cmsPostList.innerHTML = '<div style="font-size:0.75rem; text-align:center; padding: 2rem 0; color:var(--cms-gray-text);">No se encontraron posts.</div>';
            return;
        }

        filtered.forEach(post => {
            const item = document.createElement('div');
            item.className = `cms-post-item ${selectedPostId === post.id ? 'active' : ''}`;
            
            const badgeClass = post.isSystem ? 'badge-system' : 'badge-custom';
            const badgeText = post.isSystem ? 'Sistema' : 'Personalizado';

            item.innerHTML = `
                <div class="cms-post-item-title">${post.title}</div>
                <div class="cms-post-item-meta">
                    <span>${post.category}</span>
                    <span class="cms-post-item-badge ${badgeClass}">${badgeText}</span>
                </div>
            `;

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'cms-post-delete-btn';
            deleteBtn.title = 'Eliminar entrada';
            deleteBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            `;
            
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar seleccionar el post
                deletePost(post.id, post.isSystem, post.title);
            });
            
            item.appendChild(deleteBtn);

            item.addEventListener('click', () => {
                selectPost(post.id);
            });

            cmsPostList.appendChild(item);
        });
    };

    const deletePost = (postId, isSystem, postTitle) => {
        const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar la entrada "${postTitle}"?`);
        if (!confirmDelete) return;

        if (isSystem) {
            const deletedSystem = JSON.parse(localStorage.getItem('modulock_deleted_system_posts')) || [];
            if (!deletedSystem.includes(postId)) {
                deletedSystem.push(postId);
                localStorage.setItem('modulock_deleted_system_posts', JSON.stringify(deletedSystem));
            }
        } else {
            const customPosts = JSON.parse(localStorage.getItem('modulock_blog_posts')) || [];
            const filtered = customPosts.filter(p => p.id !== postId);
            localStorage.setItem('modulock_blog_posts', JSON.stringify(filtered));
        }

        loadPostsDatabase();

        if (selectedPostId === postId) {
            createNewDraft();
        } else {
            renderSidebarPosts();
        }
    };


    // 7. CRUD & FORM SELECTION LOGIC
    const selectPost = (postId) => {
        selectedPostId = postId;
        const post = posts.find(p => p.id === postId);
        
        if (!post) return;

        selectedPostIsSystem = post.isSystem;
        renderSidebarPosts();

        // Populate fields
        postTitle.value = post.title;
        postCategory.value = post.category;
        postExcerpt.value = post.excerpt;

        // Cover image selector
        if (post.image.startsWith('data:image/') || post.image.startsWith('/images/') || post.image.startsWith('http')) {
            // It is an uploaded base64 custom image
            const uploadRadio = document.querySelector('input[name="imageSource"][value="upload"]');
            if (uploadRadio) uploadRadio.checked = true;
            defaultImageContainer.style.display = 'none';
            uploadImageContainer.style.display = 'block';

            uploadedImageBase64 = post.image;
            imagePreview.src = post.image;
            imagePreviewContainer.style.display = 'block';
            uploadPrompt.style.display = 'none';
        } else {
            // It is a system local asset selector
            const defaultRadio = document.querySelector('input[name="imageSource"][value="default"]');
            if (defaultRadio) defaultRadio.checked = true;
            defaultImageContainer.style.display = 'block';
            uploadImageContainer.style.display = 'none';

            postImage.value = post.image;
            resetUploadUI();
        }

        // Render its blocks content
        currentPostBlocks = post.blocks ? JSON.parse(JSON.stringify(post.blocks)) : [];
        renderBlocks();

        // If system post, lock editing elements visually so they know they need to create a new draft
        const isEditable = !post.isSystem;
        toggleEditorInputs(isEditable);

        // Auto trigger JSON preview update
        updateJsonOutput();
    };

    const toggleEditorInputs = (isEditable) => {
        postTitle.disabled = !isEditable;
        postCategory.disabled = !isEditable;
        postExcerpt.disabled = !isEditable;
        postImage.disabled = !isEditable;
        document.querySelectorAll('input[name="imageSource"]').forEach(r => r.disabled = !isEditable);
        if (postImageFile) postImageFile.disabled = !isEditable;
        
        // Hide/Show block builder buttons
        const actionRow = document.querySelector('.add-block-row');
        if (actionRow) {
            actionRow.style.display = isEditable ? 'flex' : 'none';
        }

        // Disable save button for system posts
        if (isEditable) {
            cmsSaveBtn.disabled = false;
            cmsSaveBtn.innerText = selectedPostId ? 'Guardar Cambios' : 'Crear Post';
            cmsSaveBtn.style.opacity = '1';
        } else {
            cmsSaveBtn.disabled = true;
            cmsSaveBtn.innerText = 'Lectura (Default)';
            cmsSaveBtn.style.opacity = '0.5';
        }
    };

    const createNewDraft = () => {
        selectedPostId = null;
        selectedPostIsSystem = false;
        renderSidebarPosts();

        // Reset fields
        postTitle.value = '';
        postCategory.value = 'Aluminio y Vidrio';
        postExcerpt.value = '';
        const defaultRadio = document.querySelector('input[name="imageSource"][value="default"]');
        if (defaultRadio) defaultRadio.checked = true;
        defaultImageContainer.style.display = 'block';
        uploadImageContainer.style.display = 'none';
        postImage.value = 'assets/service-aluminum-DfJojfyS.jpg';

        resetUploadUI();
        toggleEditorInputs(true);

        // Prepopulate with a single paragraph block to make onboarding easier
        currentPostBlocks = [
            { id: Date.now(), type: 'p', value: '' }
        ];
        renderBlocks();
        updateJsonOutput();
    };


    // 8. BLOCK BUILDER CORE LOGIC
    const addBlock = (type) => {
        let defaultValue = '';
        
        if (type === 'quote') {
            defaultValue = { text: '', author: '' };
        } else if (type === 'callout') {
            defaultValue = { title: 'Nota técnica', text: '' };
        } else if (type === 'code') {
            defaultValue = { lang: 'javascript', code: '' };
        } else if (type === 'table') {
            defaultValue = {
                headers: ['Columna 1', 'Columna 2'],
                rows: [
                    ['Celda 1', 'Celda 2'],
                    ['Celda 3', 'Celda 4']
                ]
            };
        } else if (type === 'faq') {
            defaultValue = [
                { question: 'Pregunta frecuente', answer: 'Respuesta' }
            ];
        }

        const newBlock = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            type: type,
            value: defaultValue
        };

        currentPostBlocks.push(newBlock);
        renderBlocks();
        blockBuilder.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    };

    const deleteBlock = (blockId) => {
        currentPostBlocks = currentPostBlocks.filter(b => b.id !== blockId);
        renderBlocks();
    };

    const moveBlock = (index, direction) => {
        if (direction === 'up' && index > 0) {
            const temp = currentPostBlocks[index];
            currentPostBlocks[index] = currentPostBlocks[index - 1];
            currentPostBlocks[index - 1] = temp;
        } else if (direction === 'down' && index < currentPostBlocks.length - 1) {
            const temp = currentPostBlocks[index];
            currentPostBlocks[index] = currentPostBlocks[index + 1];
            currentPostBlocks[index + 1] = temp;
        }
        renderBlocks();
    };

    const renderBlocks = () => {
        blockBuilder.innerHTML = '';

        if (currentPostBlocks.length === 0) {
            blockBuilder.innerHTML = '<div style="text-align:center; color:var(--cms-gray-text); padding: 3rem 0; font-size: 0.8rem; border: 1px dashed var(--cms-border); border-radius: 0.5rem;">Crea el artículo añadiendo bloques de contenido abajo.</div>';
            return;
        }

        currentPostBlocks.forEach((block, index) => {
            const card = document.createElement('div');
            card.className = 'builder-block-card';

            const isEditable = !selectedPostIsSystem;

            // Generate card controls
            const controlsHTML = isEditable ? `
                <div class="block-controls">
                    <button class="block-control-btn btn-up" title="Mover arriba" onclick="window.cmsMoveBlock(${index}, 'up')">↑</button>
                    <button class="block-control-btn btn-down" title="Mover abajo" onclick="window.cmsMoveBlock(${index}, 'down')">↓</button>
                    <button class="block-control-btn btn-delete" title="Eliminar bloque" onclick="window.cmsDeleteBlock(${block.id})">&times;</button>
                </div>
            ` : '';

            // Generate content editor by block type
            let editorHTML = '';
            
            if (block.type === 'p') {
                editorHTML = `<textarea class="admin-textarea" style="min-height: 80px;" placeholder="Escribe el texto del párrafo..." ${!isEditable ? 'disabled' : ''} oninput="window.cmsUpdateBlockVal(${block.id}, this.value)">${block.value}</textarea>`;
            } else if (block.type === 'h2' || block.type === 'h3') {
                editorHTML = `<input type="text" class="admin-input" placeholder="Subtítulo..." value="${block.value}" ${!isEditable ? 'disabled' : ''} oninput="window.cmsUpdateBlockVal(${block.id}, this.value)" />`;
            } else if (block.type === 'quote') {
                editorHTML = `
                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                        <textarea class="admin-textarea" style="min-height: 60px;" placeholder="Cita textual..." ${!isEditable ? 'disabled' : ''} oninput="window.cmsUpdateQuoteVal(${block.id}, 'text', this.value)">${block.value.text}</textarea>
                        <input type="text" class="admin-input" placeholder="Autor o cita (Ej. Arq. Diana Rangel)" value="${block.value.author}" ${!isEditable ? 'disabled' : ''} oninput="window.cmsUpdateQuoteVal(${block.id}, 'author', this.value)" />
                    </div>
                `;
            } else if (block.type === 'callout') {
                editorHTML = `
                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                        <input type="text" class="admin-input" placeholder="Título de la nota (Ej. Nota técnica)" value="${block.value.title}" ${!isEditable ? 'disabled' : ''} oninput="window.cmsUpdateCalloutVal(${block.id}, 'title', this.value)" />
                        <textarea class="admin-textarea" style="min-height: 60px;" placeholder="Contenido de la advertencia o nota..." ${!isEditable ? 'disabled' : ''} oninput="window.cmsUpdateCalloutVal(${block.id}, 'text', this.value)">${block.value.text}</textarea>
                    </div>
                `;
            } else if (block.type === 'code') {
                editorHTML = `
                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                        <select class="admin-select" ${!isEditable ? 'disabled' : ''} onchange="window.cmsUpdateCodeVal(${block.id}, 'lang', this.value)">
                            <option value="javascript" ${block.value.lang === 'javascript' ? 'selected' : ''}>JavaScript</option>
                            <option value="json" ${block.value.lang === 'json' ? 'selected' : ''}>JSON</option>
                            <option value="html" ${block.value.lang === 'html' ? 'selected' : ''}>HTML</option>
                            <option value="css" ${block.value.lang === 'css' ? 'selected' : ''}>CSS</option>
                        </select>
                        <textarea class="admin-textarea" style="min-height: 80px; font-family:var(--font-mono) !important;" placeholder="Código..." ${!isEditable ? 'disabled' : ''} oninput="window.cmsUpdateCodeVal(${block.id}, 'code', this.value)">${block.value.code}</textarea>
                    </div>
                `;
            } else if (block.type === 'table') {
                // Render headers and rows editor
                let headersHTML = '';
                block.value.headers.forEach((h, hIdx) => {
                    headersHTML += `<th><input type="text" value="${h}" ${!isEditable ? 'disabled' : ''} oninput="window.cmsUpdateTableHeader(${block.id}, ${hIdx}, this.value)" /></th>`;
                });

                let rowsHTML = '';
                block.value.rows.forEach((r, rIdx) => {
                    let cellsHTML = '';
                    r.forEach((cell, cIdx) => {
                        cellsHTML += `<td><input type="text" value="${cell}" ${!isEditable ? 'disabled' : ''} oninput="window.cmsUpdateTableCell(${block.id}, ${rIdx}, ${cIdx}, this.value)" /></td>`;
                    });
                    rowsHTML += `
                        <tr>
                            ${cellsHTML}
                            ${isEditable ? `<td><button type="button" class="block-control-btn btn-delete" style="width:1.5rem; height:1.5rem; font-size:0.75rem;" onclick="window.cmsDeleteTableRow(${block.id}, ${rIdx})">&times;</button></td>` : ''}
                        </tr>`;
                });

                editorHTML = `
                    <div style="overflow-x:auto;">
                        <table class="block-table-editor">
                            <thead>
                                <tr>
                                    ${headersHTML}
                                    ${isEditable ? '<th style="width:40px;"></th>' : ''}
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHTML}
                            </tbody>
                        </table>
                    </div>
                    ${isEditable ? `
                        <div style="display:flex; gap:0.5rem; margin-top:0.75rem;">
                            <button type="button" class="add-block-btn" style="padding:0.3rem 0.75rem !important; font-size:0.65rem;" onclick="window.cmsAddTableRow(${block.id})">+ Agregar Fila</button>
                        </div>
                    ` : ''}
                `;
            } else if (block.type === 'faq') {
                let itemsHTML = '';
                block.value.forEach((faq, fIdx) => {
                    itemsHTML += `
                        <div style="display:flex; flex-direction:column; gap:0.5rem; padding: 0.75rem !important; border:1px solid var(--cms-border); border-radius:0.5rem; margin-bottom:0.5rem; position:relative;">
                            <input type="text" class="admin-input" placeholder="Pregunta..." value="${faq.question}" ${!isEditable ? 'disabled' : ''} oninput="window.cmsUpdateFaqVal(${block.id}, ${fIdx}, 'question', this.value)" />
                            <textarea class="admin-textarea" style="min-height: 50px;" placeholder="Respuesta..." ${!isEditable ? 'disabled' : ''} oninput="window.cmsUpdateFaqVal(${block.id}, ${fIdx}, 'answer', this.value)">${faq.answer}</textarea>
                            ${isEditable ? `
                                <button type="button" class="block-control-btn btn-delete" style="position:absolute; top:0.5rem; right:0.5rem; width:1.5rem; height:1.5rem; font-size:0.75rem;" onclick="window.cmsDeleteFaqRow(${block.id}, ${fIdx})">&times;</button>
                            ` : ''}
                        </div>
                    `;
                });

                editorHTML = `
                    <div>
                        ${itemsHTML}
                    </div>
                    ${isEditable ? `
                        <button type="button" class="add-block-btn" style="padding:0.3rem 0.75rem !important; font-size:0.65rem; margin-top:0.5rem;" onclick="window.cmsAddFaqRow(${block.id})">+ Agregar Q&A</button>
                    ` : ''}
                `;
            }

            card.innerHTML = `
                <div class="block-header">
                    <div class="block-title">
                        <span style="font-size:0.8rem;">◆</span>
                        <span>Bloque ${block.type}</span>
                    </div>
                    ${controlsHTML}
                </div>
                <div class="block-body">
                    ${editorHTML}
                </div>
            `;

            blockBuilder.appendChild(card);
        });
    };

    // Expose block-editing functions to global window object
    window.cmsDeleteBlock = deleteBlock;
    window.cmsMoveBlock = moveBlock;
    
    window.cmsUpdateBlockVal = (blockId, newVal) => {
        const b = currentPostBlocks.find(x => x.id === blockId);
        if (b) b.value = newVal;
    };

    window.cmsUpdateQuoteVal = (blockId, field, newVal) => {
        const b = currentPostBlocks.find(x => x.id === blockId);
        if (b) b.value[field] = newVal;
    };

    window.cmsUpdateCalloutVal = (blockId, field, newVal) => {
        const b = currentPostBlocks.find(x => x.id === blockId);
        if (b) b.value[field] = newVal;
    };

    window.cmsUpdateCodeVal = (blockId, field, newVal) => {
        const b = currentPostBlocks.find(x => x.id === blockId);
        if (b) b.value[field] = newVal;
    };

    window.cmsUpdateTableHeader = (blockId, hIdx, newVal) => {
        const b = currentPostBlocks.find(x => x.id === blockId);
        if (b) b.value.headers[hIdx] = newVal;
    };

    window.cmsUpdateTableCell = (blockId, rIdx, cIdx, newVal) => {
        const b = currentPostBlocks.find(x => x.id === blockId);
        if (b) b.value.rows[rIdx][cIdx] = newVal;
    };

    window.cmsAddTableRow = (blockId) => {
        const b = currentPostBlocks.find(x => x.id === blockId);
        if (b) {
            const cols = b.value.headers.length;
            const newRow = Array(cols).fill('');
            b.value.rows.push(newRow);
            renderBlocks();
        }
    };

    window.cmsDeleteTableRow = (blockId, rIdx) => {
        const b = currentPostBlocks.find(x => x.id === blockId);
        if (b && b.value.rows.length > 1) {
            b.value.rows.splice(rIdx, 1);
            renderBlocks();
        }
    };

    window.cmsUpdateFaqVal = (blockId, fIdx, field, newVal) => {
        const b = currentPostBlocks.find(x => x.id === blockId);
        if (b) b.value[fIdx][field] = newVal;
    };

    window.cmsAddFaqRow = (blockId) => {
        const b = currentPostBlocks.find(x => x.id === blockId);
        if (b) {
            b.value.push({ question: 'Pregunta frecuente', answer: 'Respuesta' });
            renderBlocks();
        }
    };

    window.cmsDeleteFaqRow = (blockId, fIdx) => {
        const b = currentPostBlocks.find(x => x.id === blockId);
        if (b && b.value.length > 1) {
            b.value.splice(fIdx, 1);
            renderBlocks();
        }
    };


    // 9. DYNAMIC HTML GENERATOR & RENDERER (LIVE PREVIEW)
    const compileHTML = () => {
        let html = '';

        currentPostBlocks.forEach(block => {
            if (block.type === 'p') {
                if (block.value) {
                    const clean = block.value.split(/\n\n+/).map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('');
                    html += clean;
                }
            } else if (block.type === 'h2') {
                if (block.value) html += `<h2>${block.value}</h2>`;
            } else if (block.type === 'h3') {
                if (block.value) html += `<h3>${block.value}</h3>`;
            } else if (block.type === 'quote') {
                if (block.value.text) {
                    const citeHTML = block.value.author ? `<cite>— ${block.value.author}</cite>` : '';
                    html += `<blockquote>"${block.value.text}"${citeHTML}</blockquote>`;
                }
            } else if (block.type === 'callout') {
                if (block.value.text) {
                    html += `
                        <div class="callout-box">
                            <strong>${block.value.title}:</strong>
                            ${block.value.text}
                        </div>
                    `;
                }
            } else if (block.type === 'code') {
                if (block.value.code) {
                    html += `<pre><code class="language-${block.value.lang}">${block.value.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
                }
            } else if (block.type === 'table') {
                let ths = '';
                block.value.headers.forEach(h => {
                    ths += `<th>${h}</th>`;
                });

                let trs = '';
                block.value.rows.forEach(r => {
                    let tds = '';
                    r.forEach(td => {
                        tds += `<td>${td}</td>`;
                    });
                    trs += `<tr>${tds}</tr>`;
                });

                html += `
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>${ths}</tr>
                            </thead>
                            <tbody>
                                ${trs}
                            </tbody>
                        </table>
                    </div>
                `;
            } else if (block.type === 'faq') {
                let itemsHTML = '';
                block.value.forEach(faq => {
                    itemsHTML += `
                        <div class="faq-item">
                            <h4 class="faq-question">${faq.question}</h4>
                            <p class="faq-answer">${faq.answer}</p>
                        </div>
                    `;
                });
                
                html += `
                    <div class="faq-section">
                        ${itemsHTML}
                    </div>
                `;
            }
        });

        return html;
    };

    const calculateReadTime = () => {
        let textWords = 0;
        currentPostBlocks.forEach(block => {
            if (block.type === 'p' && typeof block.value === 'string') {
                textWords += block.value.split(/\s+/).length;
            } else if (block.type === 'quote' && block.value.text) {
                textWords += block.value.text.split(/\s+/).length;
            } else if (block.type === 'callout' && block.value.text) {
                textWords += block.value.text.split(/\s+/).length;
            }
        });

        const readMins = Math.ceil(textWords / 200);
        return `${Math.max(1, readMins)} min de lectura`;
    };

    const renderLivePreview = () => {
        try {
            const titleVal = postTitle.value || "Título del Artículo";
            const catVal = postCategory.value;
            const excerptVal = postExcerpt.value || "Resumen breve explicativo del artículo.";
            
            let coverImg = "assets/service-aluminum-DfJojfyS.jpg";
            const checkedRadio = document.querySelector('input[name="imageSource"]:checked');
            const selectedSource = checkedRadio ? checkedRadio.value : 'default';
            if (selectedSource === 'upload' && uploadedImageBase64) {
                coverImg = uploadedImageBase64;
            } else {
                coverImg = postImage.value || "assets/service-aluminum-DfJojfyS.jpg";
            }

            // Apply metadata to preview fields
            if (articlePreviewTitle) articlePreviewTitle.innerText = titleVal;
            if (articlePreviewCategory) articlePreviewCategory.innerText = catVal;
            if (articlePreviewHeroImg) {
                articlePreviewHeroImg.src = coverImg;
                articlePreviewHeroImg.alt = titleVal;
            }
            if (articlePreviewReadTime) articlePreviewReadTime.innerText = calculateReadTime();
            if (articlePreviewDate) articlePreviewDate.innerText = getFormattedDate();

            // Apply author metadata to preview fields
            const loggedAuthor = getLoggedAuthor();
            if (articlePreviewAuthor) {
                articlePreviewAuthor.innerText = loggedAuthor.name;
            }
            if (articlePreviewAuthorAvatar) {
                articlePreviewAuthorAvatar.src = loggedAuthor.image;
            }
            if (articlePreviewAuthorName) {
                articlePreviewAuthorName.innerText = loggedAuthor.name;
            }
            if (articlePreviewAuthorRole) {
                articlePreviewAuthorRole.innerText = loggedAuthor.role;
            }
            if (articlePreviewAuthorBio) {
                articlePreviewAuthorBio.innerText = loggedAuthor.bio;
            }

            // Compile content HTML
            const html = compileHTML();
            if (articlePreviewContent) {
                articlePreviewContent.innerHTML = html || '<p style="color:var(--cms-gray-text); font-style:italic;">Agrega bloques de contenido en la pestaña "Editor" para verlos renderizados aquí.</p>';
            }
        } catch (err) {
            console.error("Error in renderLivePreview:", err);
            alert("Error al generar vista previa: " + err.message);
        }
    };

    const updateJsonOutput = () => {
        const titleVal = postTitle.value || "Sin título";
        const catVal = postCategory.value;
        const excerptVal = postExcerpt.value || "";
        
        let coverImg = "assets/service-aluminum-DfJojfyS.jpg";
        const checkedRadio = document.querySelector('input[name="imageSource"]:checked');
        const selectedSource = checkedRadio ? checkedRadio.value : 'default';
        if (selectedSource === 'upload' && uploadedImageBase64) {
            coverImg = uploadedImageBase64;
        } else {
            coverImg = postImage.value || "assets/service-aluminum-DfJojfyS.jpg";
        }

        const postObj = {
            id: selectedPostId || Date.now(),
            slug: slugify(titleVal),
            title: titleVal,
            category: catVal,
            excerpt: excerptVal,
            content: compileHTML(),
            readTime: calculateReadTime(),
            date: selectedPostId ? (posts.find(p => p.id === selectedPostId)?.date || getFormattedDate()) : getFormattedDate(),
            image: coverImg,
            author: getLoggedAuthor(),
            blocks: currentPostBlocks // Serialized layout model to preserve editing
        };

        if (cmsJsonTextarea) {
            cmsJsonTextarea.value = JSON.stringify(postObj, null, 2);
        }
    };


    // 10. SAVE CHANGES LOGIC (COMMIT TO LOCAL STORAGE)
    cmsSaveBtn.addEventListener('click', () => {
        if (selectedPostIsSystem) {
            alert("Los posts del sistema no se pueden modificar directamente.");
            return;
        }

        const title = postTitle.value.trim();
        const category = postCategory.value;
        const excerpt = postExcerpt.value.trim();

        if (!title || !excerpt) {
            alert("Por favor rellena el título y el resumen.");
            return;
        }

        let image = "";
        const checkedRadio = document.querySelector('input[name="imageSource"]:checked');
        const selectedSource = checkedRadio ? checkedRadio.value : 'default';
        if (selectedSource === 'upload') {
            if (uploadedImageBase64) {
                image = uploadedImageBase64;
            } else {
                alert("Sube una imagen de portada o selecciona una predeterminada.");
                return;
            }
        } else {
            image = postImage.value || "assets/service-aluminum-DfJojfyS.jpg";
        }

        const html = compileHTML();
        const readTime = calculateReadTime();

        const customPosts = JSON.parse(localStorage.getItem('modulock_blog_posts')) || [];

        if (selectedPostId) {
            // Update existing custom post
            const idx = customPosts.findIndex(p => p.id === selectedPostId);
            if (idx !== -1) {
                customPosts[idx] = {
                    ...customPosts[idx],
                    title,
                    category,
                    excerpt,
                    content: html,
                    readTime,
                    image,
                    blocks: currentPostBlocks
                };
            }
            localStorage.setItem('modulock_blog_posts', JSON.stringify(customPosts));
            alert("Artículo actualizado con éxito.");
        } else {
            // Create a new post
            const newPostId = Date.now();
            const newPost = {
                id: newPostId,
                slug: slugify(title),
                title,
                category,
                excerpt,
                content: html,
                readTime,
                date: getFormattedDate(),
                image,
                author: getLoggedAuthor(),
                blocks: currentPostBlocks
            };
            customPosts.unshift(newPost);
            localStorage.setItem('modulock_blog_posts', JSON.stringify(customPosts));
            selectedPostId = newPostId;
            alert("Artículo guardado y publicado en local.");
        }

        loadPostsDatabase();
        selectPost(selectedPostId);
    });


    // 11. COVER IMAGE UPLOADER & CANVAS COMPRESSION
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
            updateJsonOutput();
        });
    });

    if (uploadPrompt) {
        uploadPrompt.addEventListener('click', () => {
            postImageFile.click();
        });
    }

    if (postImageFile) {
        postImageFile.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                await processUploadedFile(file);
            }
        });
    }

    if (uploadDropzone) {
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadDropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadDropzone.classList.add('dragover');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadDropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadDropzone.classList.remove('dragover');
            });
        });

        uploadDropzone.addEventListener('drop', async (e) => {
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                await processUploadedFile(file);
            }
        });
    }

    if (removeUploadedImage) {
        removeUploadedImage.addEventListener('click', (e) => {
            e.preventDefault();
            resetUploadUI();
            updateJsonOutput();
        });
    }

    const processUploadedFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            openCropModal(imageUrl);
        };
        reader.onerror = () => {
            resetUploadUI();
        };
    };

    const openCropModal = (imageUrl) => {
        cmsCropModal.classList.remove('hidden');
        
        if (cropperInstance) {
            cropperInstance.destroy();
        }
        
        cropModalImage.onload = () => {
            try {
                if (typeof Cropper === 'undefined') {
                    throw new Error("La librería de recorte (Cropper) no se pudo cargar.");
                }
                cropperInstance = new Cropper(cropModalImage, {
                    aspectRatio: 16 / 9,
                    viewMode: 1,
                    autoCropArea: 0.9,
                    responsive: true,
                    restore: false,
                    checkCrossOrigin: false,
                    modal: true,
                    guides: true,
                    center: true,
                    highlight: false,
                    cropBoxMovable: true,
                    cropBoxResizable: true,
                    toggleDragModeOnDblclick: false,
                });
                
                setAspectButtonActive(cropAspect16_9Btn);
            } catch (error) {
                console.error("Cropper initialization failed:", error);
                
                // Fallback: use the original image directly
                uploadedImageBase64 = imageUrl;
                uploadPrompt.style.display = 'none';
                imagePreview.src = imageUrl;
                imagePreviewContainer.style.display = 'block';
                
                closeCropModal();
                updateJsonOutput();
                renderLivePreview();
            }
            cropModalImage.onload = null;
        };
        cropModalImage.onerror = () => {
            console.error("Failed to load image for cropping");
            closeCropModal();
            resetUploadUI();
            cropModalImage.onerror = null;
        };
        
        // Defer image source assignment to next tick to ensure entire control.js executes first,
        // preventing reference errors for closeCropModal, updateJsonOutput, etc.
        setTimeout(() => {
            cropModalImage.src = imageUrl;
        }, 0);
    };

    const setAspectButtonActive = (activeBtn) => {
        const buttons = [cropAspectFreeBtn, cropAspect16_9Btn, cropAspect4_3Btn, cropAspect1_1Btn];
        buttons.forEach(btn => {
            if (btn === activeBtn) {
                btn.style.borderColor = 'var(--primary-glow)';
                btn.style.color = 'var(--primary-glow)';
            } else {
                btn.style.borderColor = 'var(--cms-border)';
                btn.style.color = '#fff';
            }
        });
    };

    const closeCropModal = () => {
        cmsCropModal.classList.add('hidden');
        if (cropperInstance) {
            cropperInstance.destroy();
            cropperInstance = null;
        }
        cropModalImage.onload = null;
        cropModalImage.onerror = null;
        cropModalImage.src = '';
    };

    // Crop Modal Listeners
    if (cropRotateLeftBtn) {
        cropRotateLeftBtn.addEventListener('click', () => {
            if (cropperInstance) cropperInstance.rotate(-90);
        });
    }

    if (cropRotateRightBtn) {
        cropRotateRightBtn.addEventListener('click', () => {
            if (cropperInstance) cropperInstance.rotate(90);
        });
    }

    if (cropAspectFreeBtn) {
        cropAspectFreeBtn.addEventListener('click', () => {
            if (cropperInstance) {
                cropperInstance.setAspectRatio(NaN);
                setAspectButtonActive(cropAspectFreeBtn);
            }
        });
    }

    if (cropAspect16_9Btn) {
        cropAspect16_9Btn.addEventListener('click', () => {
            if (cropperInstance) {
                cropperInstance.setAspectRatio(16 / 9);
                setAspectButtonActive(cropAspect16_9Btn);
            }
        });
    }

    if (cropAspect4_3Btn) {
        cropAspect4_3Btn.addEventListener('click', () => {
            if (cropperInstance) {
                cropperInstance.setAspectRatio(4 / 3);
                setAspectButtonActive(cropAspect4_3Btn);
            }
        });
    }

    if (cropAspect1_1Btn) {
        cropAspect1_1Btn.addEventListener('click', () => {
            if (cropperInstance) {
                cropperInstance.setAspectRatio(1 / 1);
                setAspectButtonActive(cropAspect1_1Btn);
            }
        });
    }

    if (cropCancelBtn) {
        cropCancelBtn.addEventListener('click', () => {
            closeCropModal();
            resetUploadUI();
        });
    }

    if (cropSaveBtn) {
        cropSaveBtn.addEventListener('click', async () => {
            if (!cropperInstance) {
                alert("Error: La herramienta de recorte no está inicializada.");
                return;
            }
            
            // Disable buttons and show loading indicator
            const originalSaveText = cropSaveBtn.innerText;
            cropSaveBtn.innerText = "Subiendo a la nube...";
            cropSaveBtn.disabled = true;
            if (cropCancelBtn) cropCancelBtn.disabled = true;

            try {
                let croppedBase64 = null;
                try {
                    const canvas = cropperInstance.getCroppedCanvas({
                        maxWidth: 1280,
                        maxHeight: 720,
                        imageSmoothingEnabled: true,
                        imageSmoothingQuality: 'high'
                    });

                    if (canvas) {
                        croppedBase64 = canvas.toDataURL('image/jpeg', 0.75);
                    }
                } catch (e) {
                    console.error("Failed to crop canvas, using original image", e);
                }

                // Fallback: If cropping failed or canvas is null, use the original image source
                if (!croppedBase64) {
                    croppedBase64 = cropModalImage.src;
                }

                if (croppedBase64) {
                    let finalImageUrl = croppedBase64;
                    let uploadSuccessful = false;

                    // Try uploading to Cloudflare KV database
                    try {
                        const response = await fetch('/api/upload', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ image: croppedBase64 })
                        });
                        
                        if (!response.ok) {
                            const errData = await response.json();
                            throw new Error(errData.error || "Error al subir la imagen a Cloudflare.");
                        }
                        
                        const result = await response.json();
                        finalImageUrl = result.url;
                        uploadSuccessful = true;
                    } catch (uploadErr) {
                        console.error("Cloudflare KV upload failed:", uploadErr);
                        const useLocal = confirm(
                            "No se pudo guardar la imagen en Cloudflare (KV): " + uploadErr.message + 
                            "\n\n¿Deseas guardarla localmente en tu navegador temporalmente como alternativa?"
                        );
                        if (!useLocal) {
                            // If they don't want to use local fallback, abort the save and let them retry
                            cropSaveBtn.innerText = originalSaveText;
                            cropSaveBtn.disabled = false;
                            if (cropCancelBtn) cropCancelBtn.disabled = false;
                            return;
                        }
                    }

                    uploadedImageBase64 = finalImageUrl;
                    
                    uploadPrompt.style.display = 'none';
                    imagePreview.src = finalImageUrl;
                    imagePreviewContainer.style.display = 'block';
                    
                    try {
                        updateJsonOutput();
                    } catch (errJson) {
                        console.error("updateJsonOutput failed:", errJson);
                    }
                    
                    try {
                        renderLivePreview();
                    } catch (errPrev) {
                        console.error("renderLivePreview failed:", errPrev);
                    }
                    
                    // Only close modal if save succeeded or fell back
                    closeCropModal();
                } else {
                    alert("No se pudo obtener la imagen recortada ni la original.");
                }
            } catch (globalErr) {
                console.error("Global cropSaveBtn error:", globalErr);
                alert("Error al procesar la imagen: " + globalErr.message);
            } finally {
                // Restore button state
                cropSaveBtn.innerText = originalSaveText;
                cropSaveBtn.disabled = false;
                if (cropCancelBtn) cropCancelBtn.disabled = false;
            }
        });
    }



    // 12. TAB SWITCHING LOGIC
    cmsTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cmsTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTab = btn.dataset.tab;

            cmsPanels.forEach(p => p.classList.remove('active'));
            const panel = document.getElementById(`panel-${activeTab}`);
            if (panel) {
                panel.classList.add('active');
            }

            if (activeTab === 'preview') {
                renderLivePreview();
            } else if (activeTab === 'json') {
                updateJsonOutput();
            }
        });
    });


    // 13. SIDEBAR SEARCH & NEW POST BINDINGS
    cmsSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderSidebarPosts();
    });

    cmsNewPostBtn.addEventListener('click', createNewDraft);


    // 14. ADD BLOCKS TRIGGER BUTTONS
    document.querySelectorAll('.add-block-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            addBlock(btn.dataset.type);
            updateJsonOutput();
        });
    });


    // 15. JSON EXPORT / IMPORT BACKEND SIMULATION
    if (cmsCopyJsonBtn) {
        cmsCopyJsonBtn.addEventListener('click', () => {
            cmsJsonTextarea.select();
            document.execCommand('copy');
            alert('¡Código JSON copiado al portapapeles!');
        });
    }

    if (cmsExportDbBtn) {
        cmsExportDbBtn.addEventListener('click', () => {
            const customPosts = JSON.parse(localStorage.getItem('modulock_blog_posts')) || [];
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customPosts, null, 2));
            const dlAnchorElem = document.createElement('a');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", `modulock_blog_posts_${Date.now()}.json`);
            dlAnchorElem.click();
        });
    }

    if (cmsImportDbBtn) {
        cmsImportDbBtn.addEventListener('click', () => {
            cmsImportFilePicker.click();
        });
    }

    if (cmsImportFilePicker) {
        cmsImportFilePicker.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = (evt) => {
                    try {
                        const parsed = JSON.parse(evt.target.result);
                        if (Array.isArray(parsed)) {
                            // Merge or overwrite local storage
                            const merge = confirm("¿Deseas fusionar las entradas importadas con las existentes? (Cancelar sobrescribirá toda la base de datos local).");
                            if (merge) {
                                const current = JSON.parse(localStorage.getItem('modulock_blog_posts')) || [];
                                // Filter out duplicated IDs
                                const filteredNew = parsed.filter(n => !current.find(c => c.id === n.id));
                                const merged = [...filteredNew, ...current];
                                localStorage.setItem('modulock_blog_posts', JSON.stringify(merged));
                            } else {
                                localStorage.setItem('modulock_blog_posts', JSON.stringify(parsed));
                            }
                            alert("Base de datos de artículos importada correctamente.");
                            loadPostsDatabase();
                            createNewDraft();
                        } else {
                            alert("Formato de archivo inválido. El JSON debe ser un array de posts.");
                        }
                    } catch (err) {
                        alert("Error al analizar el archivo JSON: " + err.message);
                    }
                };
            }
        });
    }


    // 16. DETECT EDITS IN FORM TO AUTOMATICALLY UPDATE JSON IN REALTIME
    [postTitle, postCategory, postExcerpt, postImage].forEach(el => {
        el.addEventListener('input', updateJsonOutput);
        el.addEventListener('change', updateJsonOutput);
    });


    // INITIALIZE CMS APPLICATION
    loadPostsDatabase();
    createNewDraft();

});
