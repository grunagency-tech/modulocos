export async function onRequestPost(context) {
    try {
        // 1. Parse JSON request body
        const data = await context.request.json();
        const { name, company, phone, projectType, message } = data;

        // 2. Input sanitization — strip HTML tags and enforce max lengths to prevent injection
        const sanitize = (str, maxLen) => {
            if (typeof str !== 'string') return '';
            return str
                .replace(/</g, '&lt;')    // Prevent HTML injection in email
                .replace(/>/g, '&gt;')
                .replace(/&(?!amp;|lt;|gt;|quot;|#\d+;)/g, '&amp;') // Escape raw & not already encoded
                .trim()
                .slice(0, maxLen);
        };

        const safeName        = sanitize(name, 100);
        const safeCompany     = sanitize(company, 120);
        const safePhone       = sanitize(phone, 30);
        const safeProjectType = sanitize(projectType, 80);
        const safeMessage     = sanitize(message, 2000);

        // 3. Validate required fields (after sanitization)
        if (!safeName || !safeCompany || !safePhone || !safeMessage) {
            return new Response(
                JSON.stringify({ success: false, error: 'Campos requeridos faltantes.' }),
                { 
                    status: 400, 
                    headers: { 'Content-Type': 'application/json' } 
                }
            );
        }

        const env = context.env;
        const resendApiKey = env.RESEND_API_KEY;
        const notificationEmail = env.cotizaciones_email || env.NOTIFICATION_EMAIL || 'cotizaciones@modulock.com.mx';
        const fromEmail = env.FROM_EMAIL || 'Contacto Web Modulock <web@modulock.com.mx>';
        const n8nWebhookUrl = env.N8N_WEBHOOK_URL;

        // Verify that at least Resend API key is configured
        if (!resendApiKey) {
            console.error('RESEND_API_KEY environment variable is not configured.');
            return new Response(
                JSON.stringify({ success: false, error: 'Error de configuración del servidor de correos.' }),
                { 
                    status: 500, 
                    headers: { 'Content-Type': 'application/json' } 
                    }
            );
        }

        // 4. Format beautiful HTML email for notifications (using sanitized variables)
        const safePhoneHref = safePhone.replace(/[^0-9+\-() ]/g, ''); // tel: href — digits and common chars only
        const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="color-scheme" content="only dark">
                <meta name="supported-color-schemes" content="only dark">
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
                <style>
                    :root {
                        color-scheme: only dark;
                        supported-color-schemes: only dark;
                    }
                    
                    body {
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                        background-color: #080808;
                        color: #ffffff;
                        margin: 0;
                        padding: 0;
                        -webkit-font-smoothing: antialiased;
                    }
                    .container {
                        max-width: 600px;
                        margin: 40px auto;
                        background-color: #121212;
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-top: 3px solid #f5a55c;
                        border-radius: 16px;
                        overflow: hidden;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
                    }
                    .header {
                        background-color: #080808;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                        padding: 35px 40px 25px 40px;
                        text-align: center;
                    }
                    .logo-subtitle {
                        font-size: 9px;
                        text-transform: uppercase;
                        letter-spacing: 3px;
                        color: #6b7280;
                        margin-top: 10px;
                        font-weight: 700;
                    }
                    .content {
                        padding: 40px;
                    }
                    h1 {
                        font-size: 20px;
                        font-weight: 900;
                        margin-top: 0;
                        margin-bottom: 28px;
                        color: #ffffff;
                        border-left: 4px solid #f5a55c;
                        padding-left: 14px;
                        text-transform: uppercase;
                        letter-spacing: -0.5px;
                        line-height: 1.1;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 30px;
                    }
                    td {
                        padding: 14px 0;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                        vertical-align: top;
                    }
                    .label {
                        width: 140px;
                        font-size: 10px;
                        font-weight: 700;
                        text-transform: uppercase;
                        color: #888888;
                        letter-spacing: 2px;
                    }
                    .value {
                        font-size: 14px;
                        color: #ffffff;
                        font-weight: 500;
                    }
                    .message-box {
                        background-color: #080808;
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-radius: 8px;
                        padding: 20px;
                        font-size: 14px;
                        color: #e5e7eb;
                        line-height: 1.6;
                        margin-top: 10px;
                        white-space: pre-wrap;
                    }
                    .actions {
                        text-align: center;
                        margin-top: 40px;
                    }
                    .btn {
                        display: inline-block;
                        background: #f5a55c;
                        background: linear-gradient(135deg, #f5a55c 0%, #e0823a 100%) !important;
                        color: #080808 !important;
                        font-weight: 900;
                        text-decoration: none;
                        padding: 16px 36px;
                        border-radius: 9999px;
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        box-shadow: 0 4px 14px rgba(245, 165, 92, 0.35);
                    }
                    .footer {
                        background-color: #080808;
                        padding: 20px 40px;
                        text-align: center;
                        font-size: 9px;
                        font-weight: 600;
                        color: #525252;
                        letter-spacing: 2px;
                        border-top: 1px solid rgba(255, 255, 255, 0.08);
                    }
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <a href="https://modulock.com.mx" style="text-decoration: none; border: none; display: block;">
                            <img src="https://modulock.com.mx/assets/ML-BlancoNAranja.png" alt="MODULOCK" style="height: 55px; max-height: 55px; border: 0; display: block; margin: 0 auto; font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif; font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 4px; text-transform: uppercase;" />
                        </a>
                        <div class="logo-subtitle">Cancelería & Seguridad Premium</div>
                    </div>
                    <div class="content">
                        <h1>Nueva Solicitud de Cotizaci&oacute;n</h1>
                        <table>
                            <tr>
                                <td class="label">Cliente</td>
                                <td class="value">${safeName}</td>
                            </tr>
                            <tr>
                                <td class="label">Empresa</td>
                                <td class="value">${safeCompany}</td>
                            </tr>
                            <tr>
                                <td class="label">Tel&eacute;fono</td>
                                <td class="value">
                                    <a href="tel:${safePhoneHref}" style="color: #f5a55c !important; text-decoration: none; font-weight: 700;"><span style="color: #f5a55c !important;">${safePhone}</span></a>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Proyecto</td>
                                <td class="value" style="color: #f5a55c !important; font-weight: 600;">
                                    <span style="color: #f5a55c !important;">${safeProjectType || 'No especificado'}</span>
                                </td>
                            </tr>
                        </table>
                        
                        <div class="label" style="margin-bottom: 8px;">Mensaje de Consulta</div>
                        <div class="message-box">${safeMessage}</div>
                        
                        <div class="actions">
                            <a href="tel:${safePhoneHref}" class="btn" style="background: #f5a55c; background: linear-gradient(135deg, #f5a55c 0%, #e0823a 100%) !important; color: #080808 !important; text-decoration: none; display: inline-block; border-radius: 9999px; box-shadow: 0 4px 14px rgba(245, 165, 92, 0.35);"><span style="color: #080808 !important; font-weight: 900;">Llamar al Cliente</span></a>
                        </div>
                    </div>
                    <div class="footer">
                        ESTE CORREO FUE GENERADO AUTOM&Aacute;TICAMENTE DESDE EL SITIO WEB MODULOCK
                    </div>
                </div>
            </body>
            </html>
        `;

        // 5. Prepare parallel fetch operations (Resend Email + n8n Webhook)
        const promises = [];

        // Operation A: Send Email Notification via Resend API
        const resendPromise = fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: fromEmail,
                to: [notificationEmail],
                subject: `Nueva Cotización: ${safeName} (${safeProjectType || 'General'})`,
                html: emailHtml
            })
        }).then(async (res) => {
            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Resend API Error: ${res.status} - ${errText}`);
            }
            return { service: 'resend', success: true };
        });
        promises.push(resendPromise);

        // Operation B: Send Data to n8n Webhook (if URL is configured)
        if (n8nWebhookUrl) {
            const n8nPromise = fetch(n8nWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: safeName,
                    company: safeCompany,
                    phone: safePhone,
                    projectType: safeProjectType,
                    message: safeMessage,
                    submittedAt: new Date().toISOString(),
                    source: 'Cloudflare Pages Form'
                })
            }).then(async (res) => {
                if (!res.ok) {
                    const errText = await res.text();
                    throw new Error(`n8n Webhook Error: ${res.status} - ${errText}`);
                }
                return { service: 'n8n', success: true };
            });
            promises.push(n8nPromise);
        }

        // 5. Execute parallel requests and handle results
        const results = await Promise.allSettled(promises);
        
        let resendSuccess = false;
        let n8nSuccess = false;
        let errors = [];

        results.forEach((result) => {
            if (result.status === 'fulfilled') {
                if (result.value.service === 'resend') resendSuccess = true;
                if (result.value.service === 'n8n') n8nSuccess = true;
            } else {
                console.error('Operation failed:', result.reason);
                errors.push(result.reason.message);
            }
        });

        // If Resend succeeds, we count it as a successful form submission
        // (n8n is treated as a secondary automation, failure there shouldn't block the client)
        if (resendSuccess) {
            return new Response(
                JSON.stringify({ 
                    success: true, 
                    message: 'Formulario procesado correctamente.', 
                    n8nConnected: n8nSuccess,
                    warnings: errors.length > 0 ? errors : undefined
                }),
                { 
                    status: 200, 
                    headers: { 'Content-Type': 'application/json' } 
                }
            );
        } else {
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: 'No se pudo enviar la notificación por correo.',
                    details: errors 
                }),
                { 
                    status: 502, 
                    headers: { 'Content-Type': 'application/json' } 
                }
            );
        }

    } catch (error) {
        console.error('Fatal submit error:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Error interno del servidor.' }),
            { 
                status: 500, 
                headers: { 'Content-Type': 'application/json' } 
            }
        );
    }
}
