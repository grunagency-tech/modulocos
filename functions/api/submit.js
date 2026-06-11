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
        const notificationEmail = env.NOTIFICATION_EMAIL || 'contacto@cancelesmodulock.com.mx';
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
                <style>
                    body {
                        font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
                        background-color: #0c0c0c;
                        color: #ffffff;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 30px auto;
                        background-color: #121212;
                        border: 1px solid #1a1a1a;
                        border-radius: 16px;
                        overflow: hidden;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                    }
                    .header {
                        background-color: #080808;
                        border-bottom: 2px solid #e0823a;
                        padding: 30px 40px;
                        text-align: center;
                    }
                    .logo-text {
                        color: #ffffff;
                        font-size: 24px;
                        font-weight: 800;
                        letter-spacing: 2px;
                        margin: 0;
                    }
                    .logo-accent {
                        color: #e0823a;
                    }
                    .content {
                        padding: 40px;
                    }
                    h1 {
                        font-size: 20px;
                        font-weight: 700;
                        margin-top: 0;
                        margin-bottom: 24px;
                        color: #ffffff;
                        border-left: 3px solid #e0823a;
                        padding-left: 12px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 30px;
                    }
                    td {
                        padding: 12px 0;
                        border-bottom: 1px solid #1a1a1a;
                        vertical-align: top;
                    }
                    .label {
                        width: 150px;
                        font-size: 11px;
                        font-weight: 700;
                        text-transform: uppercase;
                        color: #6b6b6b;
                        letter-spacing: 1.5px;
                    }
                    .value {
                        font-size: 14px;
                        color: #e5e5e5;
                    }
                    .message-box {
                        background-color: #0c0c0c;
                        border: 1px solid #1a1a1a;
                        border-radius: 8px;
                        padding: 20px;
                        font-size: 14px;
                        color: #d1d1d1;
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
                        background-color: #e0823a;
                        color: #080808 !important;
                        font-weight: 700;
                        text-decoration: none;
                        padding: 16px 32px;
                        border-radius: 30px;
                        font-size: 13px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        transition: background-color 0.3s;
                    }
                    .footer {
                        background-color: #080808;
                        padding: 20px 40px;
                        text-align: center;
                        font-size: 10px;
                        color: #4b4b4b;
                        letter-spacing: 1px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo-text">MODU<span class="logo-accent">LOCK</span></div>
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
                                    <a href="tel:${safePhoneHref}" style="color: #e0823a; text-decoration: none; font-weight: 600;">${safePhone}</a>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Proyecto</td>
                                <td class="value">${safeProjectType || 'No especificado'}</td>
                            </tr>
                        </table>
                        
                        <div class="label" style="margin-bottom: 8px;">Mensaje de Consulta</div>
                        <div class="message-box">${safeMessage}</div>
                        
                        <div class="actions">
                            <a href="tel:${safePhoneHref}" class="btn">Llamar al Cliente</a>
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
                from: 'Contacto Web Modulock <web@cancelesmodulock.com.mx>',
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
