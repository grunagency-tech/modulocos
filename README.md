# Documentación del Proyecto: Modulock Web & CMS

Este repositorio contiene el código de producción del sitio web corporativo de **Modulock**, incluyendo su página principal, el blog dinámico de artículos, un panel de administración editorial (CMS) basado en almacenamiento local, y un backend serverless preparado para el despliegue en **Cloudflare Pages** e integración de correos con **Resend**.

---

## 📂 Estructura del Proyecto

El sitio está estructurado como una aplicación web estática optimizada con funciones serverless de Cloudflare Pages:

- **`index.html`**: Página de aterrizaje (landing page) corporativa principal. Contiene las secciones de servicios (cancelería, portones, rejas, etc.), proyectos realizados (como Walmart Monterrey, Sam's Club, Farmacia San Pablo), contacto y el botón flotante de WhatsApp.
- **`blog.html`**: Interfaz del blog público que renderiza dinámicamente las entradas cargadas desde el almacenamiento local y del archivo base de datos.
- **`control.html`**: Panel de control administrativo (CMS) para la redacción visual de artículos por bloques (párrafo, subtítulo, cita, etc.), inicio de sesión multiusuario, y vista previa en tiempo real.
- **`styles.css`**: Hoja de estilos principal compilada con el sistema de diseño premium, responsive y animaciones de entrada.
- **`app.js`**: Lógica de interacción de la página principal (animaciones scroll, navbar autohide, contadores de métricas optimizados con `requestAnimationFrame`).
- **`blog.js`**: Gestión y renderizado dinámico del blog, ordenamiento de entradas, modal de login administrativo del blog, y base de datos local.
- **`control.js`**: Lógica del CMS editorial, inicio de sesión administrativo, guardado de posts personalizados en `localStorage`, y el modal interactivo de recorte de imágenes utilizando la librería `Cropper.js`.
- **`functions/api/submit.js`**: Endpoint serverless (`onRequestPost`) que intercepta las solicitudes de contacto del formulario y las reenvía por correo electrónico mediante la API de **Resend** y opcionalmente a un webhook de **n8n**.

---

## ⚡ Despliegue en Cloudflare Pages

Cloudflare Pages es la plataforma ideal para hospedar este proyecto debido a su red de entrega global de alta velocidad y soporte nativo para funciones serverless (Cloudflare Workers) en la carpeta `/functions`.

### Pasos para el Despliegue:

1. **Vincular el Repositorio de Git**:
   - Inicia sesión en el panel de **Cloudflare**.
   - Dirígete a **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Selecciona el repositorio de GitHub de Modulock.

2. **Configuración de Compilación (Build Settings)**:
   - **Framework preset**: `None` (aplicación estática pura).
   - **Build command**: *Dejar en blanco*.
   - **Build output directory**: `./` (directorio raíz).
   - Haz clic en **Save and Deploy**.

Cloudflare Pages detectará automáticamente la carpeta `/functions/` y generará la API serverless para el formulario de contacto sin configuraciones adicionales.

---

## 📧 Configuración del Servicio de Correos (Resend)

El envío del correo con las solicitudes de cotizaciones de los clientes se realiza a través de **Resend.com**, una plataforma de entrega de correos electrónicos de alta especificación para desarrolladores.

### 1. Preparar la cuenta en Resend:
1. Crea una cuenta en [Resend.com](https://resend.com).
2. Dirígete a **Domains** > **Add Domain** y registra tu dominio (ej. `cancelesmodulock.com.mx`).
3. Agrega los registros DNS (MX, SPF, DKIM) provistos por Resend en tu proveedor de dominio para validar la propiedad y asegurar que los correos no caigan en SPAM.
4. Genera una **API Key** desde el apartado **API Keys** con permisos de envío (`Sending`).

### 2. Configurar Variables de Entorno en Cloudflare:
Para que la función serverless conecte de forma segura con Resend sin exponer las credenciales en el código fuente, debes configurar las siguientes variables de entorno en el panel de Cloudflare Pages:

1. Ve a tu proyecto de Pages en Cloudflare.
2. Dirígete a **Settings** > **Environment variables**.
3. Añade las siguientes variables (aplica tanto a *Production* como a *Preview*):

| Variable | Descripción | Valor de Ejemplo |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | Clave API generada en el panel de Resend | `re_123456789abcdef...` |
| `FROM_EMAIL` | Remitente de correo verificado en Resend | `Contacto Web Modulock <web@cancelesmodulock.com.mx>` |
| `NOTIFICATION_EMAIL` | Correo destinatario donde llegará la cotización | `contacto@cancelesmodulock.com.mx` |
| `N8N_WEBHOOK_URL` | *(Opcional)* Webhook para automatización en CRM n8n | `https://n8n.tu-servidor.com/webhook/...` |

4. Guarda las variables y haz clic en **Redeploy** (Volver a desplegar) para que los cambios tengan efecto.

---

## 🖥️ Administración y Uso del CMS (Panel de Control)

El CMS administrativo en `control.html` se comunica con el navegador del usuario para guardar borradores sin necesidad de una base de datos pesada tradicional, ideal para flujos de trabajo ágiles.

### 🔐 Usuarios y Contraseñas de Acceso
El acceso al portal administrativo está protegido por las siguientes credenciales:

1. **Alexandra Ortiz**:
   - Contraseña: `12345`
   - Rol: Dirección de Proyectos
2. **Modulock Team**:
   - Contraseña: `678910`
   - Rol: Ingeniería y Seguridad

### 📸 Ajuste de Imagen de Portada
Al cargar una imagen personalizada para el encabezado del artículo, se activará automáticamente un editor visual de recorte (**Cropper.js**):
- **Ecuadre de Banner**: Puedes arrastrar, hacer zoom y girar la imagen.
- **Relaciones de aspecto**: Se recomienda utilizar el botón **16:9** para asegurar que la portada se renderice de forma ideal tanto en escritorio como en dispositivos móviles.
- **Guardado**: Al dar clic en *"Aplicar Ajuste"*, el CMS comprime la imagen a JPEG optimizado de 1280px de ancho y lo almacena localmente en la base de datos del navegador.
