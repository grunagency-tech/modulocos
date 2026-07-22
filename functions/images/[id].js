export async function onRequestGet(context) {
    try {
        const id = context.params.id;
        
        // Find KV binding
        const kv = context.env.MODULOCK_KV || context.env.KV;
        if (!kv) {
            return new Response('Falta la vinculación de base de datos KV en Cloudflare Pages.', { status: 500 });
        }
        
        // Get from KV
        const { value, metadata } = await kv.getWithMetadata(`img:${id}`);
        
        if (!value) {
            return new Response('Imagen no encontrada.', { status: 404 });
        }
        
        // Convert base64 back to binary array buffer
        const binaryString = atob(value);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        const mimeType = metadata?.mimeType || 'image/jpeg';
        
        return new Response(bytes.buffer, {
            headers: {
                'Content-Type': mimeType,
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        });
    } catch (err) {
        return new Response(err.message, { status: 500 });
    }
}
