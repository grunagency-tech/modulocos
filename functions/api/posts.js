export async function onRequestGet(context) {
    try {
        const kv = context.env.MODULOCK_KV || context.env.KV;
        if (!kv) {
            return new Response(JSON.stringify({ error: 'Falta la vinculación de base de datos KV en Cloudflare Pages.' }), { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const customPostsStr = await kv.get('blog_custom_posts') || '[]';
        const deletedSystemStr = await kv.get('blog_deleted_system_posts') || '[]';

        let customPosts = [];
        let deletedSystem = [];
        let parseError = null;

        try {
            customPosts = JSON.parse(customPostsStr);
        } catch (e) {
            parseError = `customPosts parse error: ${e.message}`;
        }

        try {
            deletedSystem = JSON.parse(deletedSystemStr);
        } catch (e) {
            parseError = (parseError ? parseError + '; ' : '') + `deletedSystem parse error: ${e.message}`;
        }

        const responseObj = { customPosts, deletedSystem };
        if (parseError) {
            responseObj.parseError = parseError;
            responseObj.rawCustomPosts = customPostsStr;
            responseObj.rawDeletedSystem = deletedSystemStr;
        }

        return new Response(JSON.stringify(responseObj), {
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function onRequestPost(context) {
    try {
        const kv = context.env.MODULOCK_KV || context.env.KV;
        if (!kv) {
            return new Response(JSON.stringify({ error: 'Falta la vinculación de base de datos KV en Cloudflare Pages.' }), { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { customPosts, deletedSystem } = await context.request.json();

        if (customPosts !== undefined) {
            await kv.put('blog_custom_posts', JSON.stringify(customPosts));
        }
        if (deletedSystem !== undefined) {
            await kv.put('blog_deleted_system_posts', JSON.stringify(deletedSystem));
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
