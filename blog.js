document.addEventListener('DOMContentLoaded', () => {

    // 1. DEFAULT PRE-POPULATED BLOG POSTS
    const defaultPosts = [
        {
            id: 1,
            slug: "aislamiento-termico-acustico-ventaneria-espanola",
            title: "Aislamiento Térmico y Acústico: El Estándar de la Ventanería Línea Española",
            category: "Aluminio y Vidrio",
            excerpt: "Analizamos cómo los sistemas europeos y nacionales de alta gama mejoran la eficiencia energética en residencias y corporativos en México.",
            readTime: "5 min de lectura",
            author: {
                name: "Arq. Diana Rangel",
                role: "Asesora Arquitectónica en Modulock",
                image: "assets/ML-BlancoNAranja.png",
                bio: "Especialista en diseño de fachadas y ventanería de aluminio de alta gama para proyectos residenciales de lujo y corporativos sustentables en la Ciudad de México."
            },
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
</blockquote>

<h3>Comparativa de Rendimiento Técnico</h3>
<p>A continuación, presentamos una tabla de comparación entre la ventanería española de alta gama y las líneas convencionales nacionales:</p>

<div class="table-responsive">
    <table>
        <thead>
            <tr>
                <th>Característica</th>
                <th>Línea Española (RPT)</th>
                <th>Línea Nacional Convencional</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Reducción Acústica</td>
                <td>Hasta 40 dB (Excelente)</td>
                <td>15 - 20 dB (Básico)</td>
            </tr>
            <tr>
                <td>Ahorro Energético (A/C)</td>
                <td>Hasta 35% de eficiencia</td>
                <td>Menor al 5%</td>
            </tr>
            <tr>
                <td>Hermeticidad (Infiltración de aire)</td>
                <td>Clase 4 (Máxima)</td>
                <td>Clase 1 o 2 (Básica)</td>
            </tr>
            <tr>
                <td>Resistencia a Vientos Fuertes</td>
                <td>Hasta 250 kg/m²</td>
                <td>Hasta 80 kg/m²</td>
            </tr>
        </tbody>
    </table>
</div>

<h3>Especificación Técnica (JSON de Ingeniería)</h3>
<p>Este es el modelo de especificación que nuestros ingenieros cargan en el software de cálculo estructural para validar la deflexión límite L/175:</p>
<pre><code class="language-json">{
  "sistema": "Línea Española Premium RPT",
  "perfileria": "Aluminio Extruido 6063-T5",
  "vidrio_recomendado": "Duoplus 6mm Templado + 12mm Argón + 6mm Low-E",
  "reducción_acústica_nominal": "40 dB",
  "transmision_termica_u": "2.1 W/m²K",
  "empaques": "EPDM Perimetral Continuo"
}</code></pre>

<h3>Preguntas Frecuentes (FAQs)</h3>
<div class="faq-section">
    <div class="faq-item">
        <h4 class="faq-question">¿Qué es el cristal Low-E y cómo ayuda?</h4>
        <p class="faq-answer">Es un cristal de baja emisividad que tiene una capa microscópica de óxidos metálicos que refleja la radiación infrarroja (calor) hacia afuera en verano y la retiene en invierno, sin oscurecer el espacio.</p>
    </div>
    <div class="faq-item">
        <h4 class="faq-question">¿La Línea Española requiere mantenimiento especial?</h4>
        <p class="faq-answer">No, gracias a los tratamientos de anodizado y pintura electrostática, solo requiere una limpieza periódica con agua y jabón neutro cada 6 meses.</p>
    </div>
</div>`,
            date: "28 May 2026",
            image: "assets/service-aluminum-DfJojfyS.jpg"
        },
        {
            id: 2,
            slug: "seguridad-perimetral-inteligente-reja-de-acero-modulock",
            title: "Seguridad Perimetral Inteligente: Implementación de Reja de Acero Modulock en Naves Industriales",
            category: "Seguridad Perimetral",
            excerpt: "Guía técnica sobre la colocación de systems electrosoldados de alta resistencia en centros logísticos y almacenes.",
            readTime: "6 min de lectura",
            author: {
                name: "Ing. Fernando Martínez",
                role: "Director de Instalaciones de Modulock",
                image: "assets/ML-BlancoNAranja.png",
                bio: "Ingeniero Civil especialista en control de obra y logística perimetral para almacenes masivos y parques logísticos de cobertura nacional."
            },
            content: `<h2>Por qué el cercado perimetral moderno requiere ingeniería de alta resistencia</h2>
<p>Los centros logísticos y naves industriales en zonas de alta plusvalía o corredores industriales como Querétaro, San Luis Potosí y Monterrey requieren de sistemas de delimitación robustos pero con estética limpia. El sistema de Reja de Acero Modulock destaca por su malla de acero electrosoldado de alta especificación con nervaduras de refuerzo bidimensionales. Su recubrimiento de poliéster termoendurecido proporciona una protección anticorrosión excepcional, diseñada para soportar los climas más duros del país sin perder color ni resistencia estructural. Al complementarse con fijaciones ocultas anti-vandalismo y concertina de seguridad de acero inoxidable, se convierte en un perímetro impenetrable y estético que cumple con los requerimientos logísticos internacionales.</p>

<div class="callout-box">
    <strong>Tip de obra:</strong>
    Durante la cimentación de los postes de soporte, se recomienda un dado de concreto f'c=150 kg/cm² de 30x30x60 cm para garantizar la resistencia lateral contra impactos mecánicos y fuerzas del viento en áreas expuestas.
</div>

<h3>Componentes del Sistema de Seguridad Modulock</h3>
<p>Un sistema perimetral efectivo se compone de:</p>
<ul>
    <li><strong>Paneles de malla electrosoldada:</strong> Hilos de acero galvanizado calibres 6 u 8, electrosoldados en retículas de 50x200 mm con pliegues en V.</li>
    <li><strong>Postes de fijación estructural:</strong> Postes cuadrados con tuercas remachadas de fábrica para evitar soldaduras en sitio que afecten el revestimiento.</li>
    <li><strong>Abrazaderas de seguridad:</strong> Clips metálicos o plásticos con tornillería especial galvanizada o de acero inoxidable.</li>
</ul>

<blockquote>
    "La seguridad perimetral de hoy en día combina control estricto de accesos con barreras físicas impenetrables que no comprometan la estética del desarrollo industrial."
    <cite>— Ing. Fernando Martínez</cite>
</blockquote>

<h3>Comparación de Sistemas Perimetrales Comunes</h3>
<p>Evaluamos la Reja de Acero frente a la malla ciclónica convencional en aplicaciones logísticas:</p>

<div class="table-responsive">
    <table>
        <thead>
            <tr>
                <th>Criterio de Evaluación</th>
                <th>Reja de Acero Modulock</th>
                <th>Malla Ciclónica Tradicional</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Resistencia a Deformaciones</td>
                <td>Muy Alta (rígida, soldada)</td>
                <td>Baja (flexible, se deforma con facilidad)</td>
            </tr>
            <tr>
                <td>Vida Útil sin Mantenimiento</td>
                <td>Más de 10 años (poliéster al horno)</td>
                <td>3 a 5 años (tiende a oxidarse)</td>
            </tr>
            <tr>
                <td>Estética del Inmueble</td>
                <td>Excelente, incrementa el valor comercial</td>
                <td>Industrial básica, aspecto de obra provisional</td>
            </tr>
            <tr>
                <td>Seguridad contra Intrusión</td>
                <td>Alta (difícil de escalar o cortar)</td>
                <td>Baja (fácil de cortar con cizallas comunes)</td>
            </tr>
        </tbody>
    </table>
</div>

<h3>Configuración del Sistema (Código YAML de Instalación)</h3>
<p>Este es el esquema que define la configuración y orden de pedido de componentes perimetrales:</p>
<pre><code class="language-yaml">perimeter_system:
  profile: "Modulock Pro 3D"
  wire_gauge: 8
  grid_size_mm: [50, 200]
  finishing: "Zinc Phosphated + Baked Polyester Powder"
  color: "Verde Militar (RAL 6005) o Negro Intenso (RAL 9005)"
  post_spacing_meters: 2.5
  accessories: ["Concertina Inox 45cm", "Tornillería Inviolable"]</code></pre>

<h3>Preguntas Frecuentes (FAQs)</h3>
<div class="faq-section">
    <div class="faq-item">
        <h4 class="faq-question">¿Se puede automatizar el acceso en cercados de reja de acero?</h4>
        <p class="faq-answer">Sí, suministramos e instalamos portones abatibles y corredizos con el mismo diseño de reja de acero, integrando motores hidráulicos de alta frecuencia y sistemas de control de accesos.</p>
    </div>
    <div class="faq-item">
        <h4 class="faq-question">¿Qué altura máxima pueden suministrar?</h4>
        <p class="faq-answer">Las alturas estándar de los paneles van desde 1.00m hasta 2.50m. Para proyectos especiales de alta seguridad, se pueden realizar combinaciones superponiendo paneles para alcanzar alturas de 4.00m o más.</p>
    </div>
</div>`,
            date: "15 May 2026",
            image: "assets/service-fencing-BTbCOTmA.jpg"
        },
        {
            id: 3,
            slug: "instalacion-obras-fachadas-suspendidas-alturas",
            title: "Suministro e Instalación en Obra: El Reto de las Alturas en Fachadas Suspendidas",
            category: "Aluminio y Vidrio",
            excerpt: "Cómo planificamos la instalación de fachadas acristaladas con sistemas de herrajes araña y cristal curvo de gran tamaño.",
            readTime: "8 min de lectura",
            author: {
                name: "Ing. Alejandro Morales",
                role: "Director de Ingeniería en Modulock",
                image: "assets/ML-BlancoNAranja.png",
                bio: "Ingeniero Mecánico Administrador con maestría en Estructuras de Fachada. Encargado del cálculo sísmico y del montaje en altura de envolventes de vidrio en Modulock."
            },
            content: `<h2>Instalaciones Monumentales en la Construcción Comercial</h2>
<p>La instalación de fachadas de vidrio suspendidas con herrajes tipo araña (Spider Systems) en plazas comerciales o corporativos representa uno de los retos de ingeniería más complejos en la construcción. Exige un análisis estricto de cargas de viento, tolerancias milimétricas en los barrenos del cristal templado de 10mm o 12mm, y personal altamente capacitado en trabajos de altura con plataformas articuladas. En Modulock, cada pieza de cristal y perfil se manufactura bajo estrictas normas de control de calidad. Nuestro equipo coordina la entrega justo a tiempo y el montaje sistemático utilizando metodologías CPM para evitar paros de obra y garantizar que el sellado estructural y el soporte metálico mantengan una integridad absoluta frente a movimientos sísmicos y ráfagas de viento.</p>

<div class="callout-box">
    <strong>Alerta de Seguridad (HSE):</strong>
    Todos los trabajos de altura sobre plataformas elevadas de tijera o articuladas exigen el uso de arnés de seguridad de 5 puntos de anclaje, líneas de vida retráctiles independientes y delimitación de zona de caída en planta baja.
</div>

<p>A continuación, puedes observar el vídeo explicativo de la maniobra de montaje y cálculo de las presiones de viento dinámicas en fachadas de gran superficie:</p>

<div class="video-embed-wrapper relative aspect-video rounded-xl overflow-hidden bg-charcoal border border-border group cursor-pointer my-6">
    <img src="assets/project-commercial-Du_Spt2l.jpg" alt="Video de maniobras de fachadas en altura" class="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-500" />
    <div class="absolute inset-0 flex items-center justify-center">
        <div class="size-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
    </div>
</div>

<h3>Tolerancias de Montaje en Obra Comercial</h3>
<p>Para evitar esfuerzos inducidos sobre el cristal que puedan provocar roturas espontáneas por vibraciones o dilataciones térmicas, establecemos estrictas tolerancias geométricas:</p>

<div class="table-responsive">
    <table>
        <thead>
            <tr>
                <th>Altura del Edificio</th>
                <th>Tolerancia Vertical (Desplome)</th>
                <th>Tolerancia Horizontal (Alineación)</th>
                <th>Método de Medición en Obra</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Hasta 15 metros</td>
                <td>± 2 mm</td>
                <td>± 1.5 mm</td>
                <td>Plomada láser e hilos calibrados</td>
            </tr>
            <tr>
                <td>15 a 50 metros</td>
                <td>± 5 mm</td>
                <td>± 3.0 mm</td>
                <td>Estación total y nivel electrónico</td>
            </tr>
            <tr>
                <td>Más de 50 metros</td>
                <td>± 10 mm</td>
                <td>± 5.0 mm</td>
                <td>GPS geodésico y monitoreo por prisma</td>
            </tr>
        </tbody>
    </table>
</div>

<h3>Cálculo de Cargas de Viento (Mock de JavaScript)</h3>
<p>Nuestros ingenieros utilizan scripts paramétricos para calcular la presión del viento según el coeficiente de altura (Kz) definido por el reglamento de construcción CFE:</p>
<pre><code class="language-javascript">// Cálculo simplificado de la presión dinámica del viento en fachadas comerciales
function calculateWindPressure(velocityKmh, heightMeters) {
    const Kz = Math.pow(heightMeters / 10, 0.22); // Coeficiente de altura
    const velocityMs = velocityKmh / 3.6;
    const basicPressure = 0.5 * 1.225 * Math.pow(velocityMs, 2); // 1/2 * rho * V^2 (Pascal)
    const designPressure = basicPressure * Kz * 1.4; // 1.4 factor de carga
    
    return designPressure.toFixed(2); // Retorna presión en Pascales (Pa)
}

console.log("Presión de diseño a 30m para viento de 120km/h: " + calculateWindPressure(120, 30) + " Pa");</code></pre>

<h3>Preguntas Frecuentes (FAQs)</h3>
<div class="faq-section">
    <div class="faq-item">
        <h4 class="faq-question">¿Por qué se rompe un cristal templado espontáneamente?</h4>
        <p class="faq-answer">La causa principal es la inclusión de sulfuro de níquel durante la fabricación del cristal float original. Bajo dilatación térmica constante en la fachada, esta partícula aumenta de tamaño provocando esfuerzos internos insoportables. En Modulock aplicamos la prueba de "Heat Soak Test" (HST) para eliminar las piezas defectuosas antes de la instalación.</p>
    </div>
    <div class="faq-item">
        <h4 class="faq-question">¿Qué sellador se utiliza para las uniones del vidrio?</h4>
        <p class="faq-answer">Utilizamos selladores de silicón de curado neutro de ultra alto desempeño (como DOWSIL 791 o 995). Absorben el movimiento de la junta de hasta un ±50% sin agrietarse ni perder adherencia.</p>
    </div>
</div>`,
            date: "03 May 2026",
            image: "assets/project-commercial-Du_Spt2l.jpg"
        }
    ];

    // 2. STATE AND ROUTER CONFIGURATION
    const blogGridView = document.getElementById('blogGridView');
    const blogArticleView = document.getElementById('blogArticleView');
    const blogPostsGrid = document.getElementById('blogPostsGrid');
    const blogSearchInput = document.getElementById('blogSearchInput');
    const categoryPills = document.getElementById('categoryPills');
    const backToBlogBtn = document.getElementById('backToBlogBtn');
    const breadcrumbHome = document.getElementById('breadcrumbHome');

    let activeCategory = 'Todos';
    let searchQuery = '';

    const getFormattedDate = () => {
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        const d = new Date();
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    // Slugify helper
    const slugify = (text) => {
        return text.toLowerCase()
            .trim()
            .normalize('NFD') // remove accents
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/[\s-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    // Render article list in grid
    const loadPosts = () => {
        const customPosts = JSON.parse(localStorage.getItem('modulock_blog_posts')) || [];
        const allPosts = [...customPosts, ...defaultPosts];

        // Apply filters
        const filteredPosts = allPosts.filter(post => {
            const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery) ||
                                  post.excerpt.toLowerCase().includes(searchQuery) ||
                                  post.category.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        blogPostsGrid.innerHTML = '';

        if (filteredPosts.length === 0) {
            blogPostsGrid.innerHTML = `
                <div class="col-span-full text-center py-12 scroll-reveal">
                    <p class="text-lg text-muted-foreground mb-4">No se encontraron artículos que coincidan con la búsqueda.</p>
                    <button id="resetSearchBtn" class="category-pill active inline-block">Mostrar todos los artículos</button>
                </div>
            `;
            const resetSearchBtn = document.getElementById('resetSearchBtn');
            if (resetSearchBtn) {
                resetSearchBtn.addEventListener('click', () => {
                    if (blogSearchInput) blogSearchInput.value = '';
                    searchQuery = '';
                    activeCategory = 'Todos';
                    
                    // Reset category pills active status
                    const pills = categoryPills.querySelectorAll('.category-pill');
                    pills.forEach(pill => {
                        pill.classList.remove('active');
                        if (pill.dataset.category === 'Todos') pill.classList.add('active');
                    });

                    loadPosts();
                });
            }
            initScrollReveal();
            return;
        }

        filteredPosts.forEach((post, index) => {
            const card = document.createElement('article');
            card.className = 'blog-card scroll-reveal';
            card.style.transitionDelay = `${(index % 3) * 0.1}s`;
            
            // Generate clean metadata
            const timeVal = post.readTime || "4 min de lectura";
            const authorVal = post.author ? post.author.name : "Equipo Modulock";

            card.innerHTML = `
                <div class="blog-card-img-wrapper" style="cursor: pointer;">
                    <img src="${post.image}" alt="${post.title}" class="blog-card-img" loading="lazy" />
                </div>
                <div class="blog-card-content">
                    <span class="blog-card-category">${post.category}</span>
                    <h3 class="blog-card-title" style="cursor: pointer;">${post.title}</h3>
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                    <div class="blog-card-meta">
                        <div style="display:flex; flex-direction:column; gap:0.25rem;">
                            <span style="font-weight:600; color:#fff;">${authorVal}</span>
                            <span>${post.date} • ${timeVal}</span>
                        </div>
                        <button class="read-more-btn font-bold text-xs uppercase tracking-wider hover:opacity-80 transition-opacity" style="color: var(--primary-glow)">Leer artículo →</button>
                    </div>
                </div>
            `;

            // Click triggers
            const triggerElements = [
                card.querySelector('.blog-card-img-wrapper'),
                card.querySelector('.blog-card-title'),
                card.querySelector('.read-more-btn')
            ];

            triggerElements.forEach(el => {
                if (el) {
                    el.addEventListener('click', () => {
                        navigateToPost(post.slug);
                    });
                }
            });

            blogPostsGrid.appendChild(card);
        });

        initScrollReveal();
    };

    // Update dynamic SEO Tags
    const updateSEOMetadata = (post) => {
        // Title
        document.title = `${post.title} — Blog CAAMODULOCK`;

        // Meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', post.excerpt);

        // Open Graph
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', `${post.title} — Blog CAAMODULOCK`);

        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', post.excerpt);

        let ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) ogImage.setAttribute('content', window.location.origin + '/' + post.image);

        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', window.location.href);

        // Twitter Card
        let twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.setAttribute('content', `${post.title} — Blog CAAMODULOCK`);

        let twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.setAttribute('content', post.excerpt);

        let twImage = document.querySelector('meta[name="twitter:image"]');
        if (twImage) twImage.setAttribute('content', window.location.origin + '/' + post.image);

        // JSON-LD Schema.org script injection
        let schemaScript = document.getElementById('dynamicBlogSchema');
        if (!schemaScript) {
            schemaScript = document.createElement('script');
            schemaScript.id = 'dynamicBlogSchema';
            schemaScript.type = 'application/ld+json';
            document.head.appendChild(schemaScript);
        }

        const dateISO = post.date.includes("2026") ? "2026-05-28" : new Date().toISOString().split('T')[0];

        const blogPostingSchema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": window.location.origin + '/' + post.image,
            "datePublished": dateISO,
            "author": {
                "@type": "Person",
                "name": post.author ? post.author.name : "Equipo Modulock"
            },
            "publisher": {
                "@type": "Organization",
                "name": "CAAMODULOCK",
                "logo": {
                    "@type": "ImageObject",
                    "url": window.location.origin + "/assets/ML-BlancoNAranja.png"
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": window.location.href
            }
        };

        schemaScript.textContent = JSON.stringify(blogPostingSchema, null, 2);
    };

    // Render full individual article view
    const renderArticleView = (post) => {
        // HIDE Grid View & SHOW Article View
        blogGridView.style.display = 'none';
        blogArticleView.classList.add('active');

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Populate header fields
        document.getElementById('articleTitle').innerText = post.title;
        document.getElementById('articleDate').innerText = post.date;
        document.getElementById('articleReadTime').innerText = post.readTime || "4 min de lectura";
        document.getElementById('breadcrumbCategory').innerText = post.category;
        
        const heroImg = document.getElementById('articleHeroImg');
        if (heroImg) {
            heroImg.src = post.image;
            heroImg.alt = post.title;
        }

        // Render HTML article body
        document.getElementById('articleContent').innerHTML = post.content;

        // Render Author Block
        const author = post.author || {
            name: "Equipo Modulock",
            role: "Ingeniería y Seguridad",
            image: "assets/ML-BlancoNAranja.png",
            bio: "Redactores técnicos oficiales de Modulock. Compartiendo especificaciones de obra, guías de materiales y noticias del sector."
        };

        document.getElementById('authorName').innerText = author.name;
        document.getElementById('authorRole').innerText = author.role;
        document.getElementById('authorBio').innerText = author.bio;
        
        const authorAvatar = document.getElementById('authorAvatar');
        if (authorAvatar) {
            authorAvatar.src = author.image;
            authorAvatar.alt = author.name;
        }

        // Render Related Articles (matching category, excluding current post)
        const customPosts = JSON.parse(localStorage.getItem('modulock_blog_posts')) || [];
        const allPosts = [...customPosts, ...defaultPosts];

        let related = allPosts.filter(p => p.category === post.category && p.slug !== post.slug);
        
        // If not enough related in same category, grab other newest ones
        if (related.length < 2) {
            const extra = allPosts.filter(p => p.slug !== post.slug && !related.find(r => r.slug === p.slug));
            related = [...related, ...extra].slice(0, 2);
        } else {
            related = related.slice(0, 2);
        }

        const relatedGrid = document.getElementById('relatedPostsGrid');
        relatedGrid.innerHTML = '';

        related.forEach(relPost => {
            const card = document.createElement('article');
            card.className = 'blog-card scroll-reveal';
            
            card.innerHTML = `
                <div class="blog-card-img-wrapper" style="cursor: pointer;">
                    <img src="${relPost.image}" alt="${relPost.title}" class="blog-card-img" loading="lazy" />
                </div>
                <div class="blog-card-content">
                    <span class="blog-card-category">${relPost.category}</span>
                    <h4 class="blog-card-title" style="font-size: 1.1rem !important; cursor: pointer;">${relPost.title}</h4>
                    <p class="blog-card-excerpt" style="font-size: 0.8rem !important;">${relPost.excerpt}</p>
                    <div class="blog-card-meta">
                        <span>${relPost.date}</span>
                        <button class="read-more-btn font-bold text-xs uppercase tracking-wider hover:opacity-80 transition-opacity" style="color: var(--primary-glow)">Leer →</button>
                    </div>
                </div>
            `;

            // Bind click to navigate
            const triggers = [
                card.querySelector('.blog-card-img-wrapper'),
                card.querySelector('.blog-card-title'),
                card.querySelector('.read-more-btn')
            ];

            triggers.forEach(el => {
                if (el) {
                    el.addEventListener('click', () => {
                        navigateToPost(relPost.slug);
                    });
                }
            });

            relatedGrid.appendChild(card);
        });

        // Trigger SEO Updates
        updateSEOMetadata(post);
        initScrollReveal();
    };

    // SPA Router Methods
    const navigateToPost = (slug) => {
        history.pushState({ type: 'post', slug: slug }, '', `?post=${slug}`);
        checkRoute();
    };

    const navigateToHome = () => {
        history.pushState({ type: 'grid' }, '', 'blog.html');
        checkRoute();
    };

    const checkRoute = () => {
        const params = new URLSearchParams(window.location.search);
        const postSlug = params.get('post');

        if (postSlug) {
            const customPosts = JSON.parse(localStorage.getItem('modulock_blog_posts')) || [];
            const allPosts = [...customPosts, ...defaultPosts];
            const post = allPosts.find(p => p.slug === postSlug);

            if (post) {
                renderArticleView(post);
                return;
            }
        }

        // Fallback or Home View
        blogGridView.style.display = 'block';
        blogArticleView.classList.remove('active');
        
        // Restore meta tags
        document.title = "Blog — CAAMODULOCK | Cancelería de Aluminio, Vidrio y Seguridad";
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Artículos técnicos, guías y novedades sobre cancelería de aluminio nacional y europea, sistemas perimetrales de seguridad y herrería arquitectónica.");
        }

        // Clear dynamic posting schema
        let schemaScript = document.getElementById('dynamicBlogSchema');
        if (schemaScript) schemaScript.remove();

        loadPosts();
    };

    // 3. LISTENERS AND EVENT BINDING
    
    // Back button and breadcrumbs
    if (backToBlogBtn) backToBlogBtn.addEventListener('click', navigateToHome);
    if (breadcrumbHome) breadcrumbHome.addEventListener('click', navigateToHome);

    // Watch back/forward browser navigation
    window.addEventListener('popstate', checkRoute);

    // Search input
    if (blogSearchInput) {
        blogSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            loadPosts();
        });
    }

    // Category pills selection
    if (categoryPills) {
        const pills = categoryPills.querySelectorAll('.category-pill');
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeCategory = pill.dataset.category;
                loadPosts();
            });
        });
    }

    // Newsletter mock form submit
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            alert(`¡Gracias por suscribirte con ${email}! Recibirás el boletín mensual de Modulock.`);
            newsletterForm.reset();
        });
    }


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
        const rawContent = document.getElementById('postContent').value;
        
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

        // Convert double returns into paragraphs for custom content to support basic spacing
        const formattedContent = rawContent.split(/\n\n+/).map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('');
        
        // Calculate read time
        const words = rawContent.split(/\s+/).length;
        const readMins = Math.ceil(words / 200);
        const readTime = `${readMins} min de lectura`;

        const newPost = {
            id: Date.now(),
            slug: slugify(title),
            title,
            category,
            excerpt,
            content: formattedContent,
            readTime,
            date: getFormattedDate(),
            image,
            author: {
                name: "Equipo Modulock",
                role: "Ingeniería y Seguridad",
                image: "assets/ML-BlancoNAranja.png",
                bio: "Redactores técnicos oficiales de Modulock. Compartiendo especificaciones de obra, guías de materiales y noticias del sector."
            }
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
        
        // Reload and check route to see if we navigate to it or just refresh the home list
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

    // Check route on page enter to support deep linking
    checkRoute();
});
