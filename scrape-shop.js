const https = require('https');

function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function parseProducts(html, baseUrl) {
    const products = [];
    // Regex to match WooCommerce product items
    // This is a rough regex and might need adjustment based on the actual HTML
    const productRegex = /<li[^>]*class="[^"]*product[^"]*"[^>]*>([\s\S]*?)<\/li>/g;
    let match;
    
    while ((match = productRegex.exec(html)) !== null) {
        const productHtml = match[1];
        
        // Name
        const nameMatch = productHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
        const name = nameMatch ? nameMatch[1].replace(/<[^>]*>/g, '').trim() : '';
        
        // Link/Slug
        const linkMatch = productHtml.match(/<a[^>]*href="([^"]*)"/);
        const link = linkMatch ? linkMatch[1] : '';
        const slug = link ? link.split('/').filter(Boolean).pop() : '';
        
        // Price
        const priceMatch = productHtml.match(/<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#36;<\/span>([0-9.]+)<\/bdi><\/span>/);
        let price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        if (!price) {
            const altPriceMatch = productHtml.match(/\$([0-9.]+)/);
            price = altPriceMatch ? parseFloat(altPriceMatch[1]) : 0;
        }

        // Image
        const imgMatch = productHtml.match(/<img[^>]*src="([^"]*)"/);
        let image = imgMatch ? imgMatch[1] : '';
        
        if (name && slug) {
            products.push({
                name: name.replace(/&amp;/g, '&').replace(/&#8211;/g, '-'),
                slug,
                price,
                image,
                url: link
            });
        }
    }
    return products;
}

async function main() {
    const urls = [
        'https://fusionbarsmushroom.com/shop/',
        'https://fusionmushroombars.com/shop/'
    ];
    
    const allProducts = [];
    for (const url of urls) {
        console.log(`Scraping ${url}...`);
        try {
            const html = await fetchHtml(url);
            const products = parseProducts(html, url);
            console.log(`Found ${products.length} products.`);
            allProducts.push(...products);
        } catch (error) {
            console.error(`Error scraping ${url}:`, error.message);
        }
    }
    
    console.log(JSON.stringify(allProducts, null, 2));
}

main();
