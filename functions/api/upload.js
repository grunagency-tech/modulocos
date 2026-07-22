export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const base64Image = body.image; // data:image/jpeg;base64,...
        
        if (!base64Image) {
            return new Response(JSON.stringify({ error: 'No se recibió ninguna imagen.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Find KV binding
        const kv = context.env.MODULOCK_KV || context.env.KV;
        if (!kv) {
            return new Response(JSON.stringify({ 
                error: 'Falta la vinculación de base de datos KV (MODULOCK_KV). Por favor agrégala en la configuración de Cloudflare Pages.' 
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Generate a unique ID
        const id = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        
        // Extract type and base64 data
        const parts = base64Image.split(',');
        const mimeType = parts[0].match(/:(.*?);/)[1] || 'image/jpeg';
        const base64Data = parts[1];
        
        // Store in KV
        await kv.put(`img:${id}`, base64Data, {
            metadata: { mimeType }
        });
        
        // Return public URL on the same domain
        const url = `/images/${id}`;
        
        return new Response(JSON.stringify({ success: true, url }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
