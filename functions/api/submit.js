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
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
            </head>
            <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; color: #18181b; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
                <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #e4e4e7; border-top: 4px solid #f5a55c; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05);">
                    
                    <!-- Header -->
                    <div style="background-color: #ffffff; border-bottom: 1px solid #e4e4e7; padding: 30px 40px; text-align: center;">
                        <a href="https://modulock.com.mx" style="text-decoration: none; border: none; display: inline-block;">
                            <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif; font-size: 24px; font-weight: 900; color: #18181b; letter-spacing: 4px; text-transform: uppercase; margin: 0; line-height: 1;">
                                MODU<span style="color: #f5a55c;">LOCK</span>
                            </div>
                        </a>
                        <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 3px; color: #71717a; margin-top: 8px; font-weight: 700;">
                            Cancelería & Seguridad Premium
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div style="padding: 40px;">
                        <h1 style="font-size: 18px; font-weight: 900; margin-top: 0; margin-bottom: 24px; color: #18181b; border-left: 4px solid #f5a55c; padding-left: 12px; text-transform: uppercase; letter-spacing: -0.3px; line-height: 1.1;">
                            Nueva Solicitud de Cotizaci&oacute;n
                        </h1>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                            <tr>
                                <td style="width: 130px; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; padding: 12px 0; border-bottom: 1px solid #e4e4e7; vertical-align: middle;">
                                    Cliente
                                </td>
                                <td style="font-size: 14px; color: #18181b; font-weight: 600; padding: 12px 0; border-bottom: 1px solid #e4e4e7; vertical-align: middle;">
                                    ${safeName}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 130px; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; padding: 12px 0; border-bottom: 1px solid #e4e4e7; vertical-align: middle;">
                                    Empresa
                                </td>
                                <td style="font-size: 14px; color: #18181b; font-weight: 600; padding: 12px 0; border-bottom: 1px solid #e4e4e7; vertical-align: middle;">
                                    ${safeCompany}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 130px; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; padding: 12px 0; border-bottom: 1px solid #e4e4e7; vertical-align: middle;">
                                    Tel&eacute;fono
                                </td>
                                <td style="font-size: 14px; font-weight: 700; padding: 12px 0; border-bottom: 1px solid #e4e4e7; vertical-align: middle;">
                                    <a href="tel:${safePhoneHref}" style="color: #f5a55c; text-decoration: none; font-weight: 700;"><span style="color: #f5a55c !important;">${safePhone}</span></a>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 130px; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; padding: 12px 0; border-bottom: 1px solid #e4e4e7; vertical-align: middle;">
                                    Proyecto
                                </td>
                                <td style="font-size: 14px; color: #f5a55c; font-weight: 700; padding: 12px 0; border-bottom: 1px solid #e4e4e7; vertical-align: middle;">
                                    <span style="color: #f5a55c !important;">${safeProjectType || 'No especificado'}</span>
                                </td>
                            </tr>
                        </table>
                        
                        <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 1.5px; margin-bottom: 8px;">
                            Mensaje de Consulta
                        </div>
                        <div style="background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 6px; padding: 15px 20px; font-size: 14px; color: #3f3f46; line-height: 1.5; white-space: pre-wrap;">
                            ${safeMessage}
                        </div>
                        
                        <div style="text-align: center; margin-top: 35px;">
                            <a href="tel:${safePhoneHref}" style="display: inline-block; background-color: #f5a55c; color: #18181b !important; font-weight: 800; text-decoration: none; padding: 14px 32px; border-radius: 9999px; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; box-shadow: 0 4px 6px -1px rgba(245, 165, 92, 0.2), 0 2px 4px -1px rgba(245, 165, 92, 0.1); line-height: 1;">
                                <span style="color: #18181b !important; font-weight: 900;">Llamar al Cliente</span>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background-color: #f4f4f5; border-top: 1px solid #e4e4e7; padding: 20px 40px; text-align: center; font-size: 9px; font-weight: 600; color: #71717a; letter-spacing: 1.5px; line-height: 1.4;">
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
