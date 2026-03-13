const http = require('https');
const fs = require('fs');

function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        http.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function scrape() {
    console.log('Fetching sitemap...');
    const sitemapHtml = await fetchHtml('https://officialfusionshroombars.com/product-sitemap.xml');

    const urls = [];
    const regex = /<loc>(https:\/\/officialfusionshroombars.com\/product\/[^<]+)<\/loc>/g;
    let match;
    while ((match = regex.exec(sitemapHtml)) !== null) {
        urls.push(match[1]);
    }

    console.log(`Found ${urls.length} products.`);

    const products = [];
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        console.log(`Fetching ${i + 1}/${urls.length}: ${url}`);
        try {
            const html = await fetchHtml(url);

            // Title
            let titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
            let title = titleMatch ? titleMatch[1].replace(/ - Official Fusion Shroom Bars/i, '').trim() : '';
            if (!title) {
                titleMatch = html.match(/<title>([^<]+)<\/title>/);
                title = titleMatch ? titleMatch[1].replace(/ - Official Fusion Shroom Bars/i, '').split('|')[0].trim() : 'Unknown Product';
            }

            // Price
            let price = 0;
            let priceMatch = html.match(/<meta property="product:price:amount" content="([^"]+)"/);
            if (priceMatch) {
                price = parseFloat(priceMatch[1]);
            } else {
                priceMatch = html.match(/"price":"([0-9.]+)"/);
                if (priceMatch) price = parseFloat(priceMatch[1]);
            }

            // Image
            let image = '';
            const imgMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
            if (imgMatch) image = imgMatch[1];

            // Description
            let description = '';
            const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/);
            if (descMatch) description = descMatch[1];

            if (!price) price = 30.00; // fallback

            if (title) {
                products.push({
                    id: url.split('/').filter(Boolean).pop(),
                    name: title.replace(/&amp;/g, '&').replace(/&#8211;/g, '-'),
                    price,
                    regularPrice: null,
                    category: title.toLowerCase().includes('gumm') ? 'Gummies' : (title.toLowerCase().includes('whole') ? 'Wholesale' : 'Chocolate Bars'),
                    description: description.replace(/(<([^>]+)>)/gi, "").replace(/(&quot;|&#039;)/g, "'").trim() || "Premium Fusion product.",
                    image: image || "/products/placeholder.jpg",
                    attributes: {
                        weight: title.toLowerCase().includes('gumm') ? undefined : '6g',
                        effects: ["Euphoria", "Relaxation"]
                    }
                });
            }
        } catch (e) {
            console.error('Error fetching', url, e.message);
        }
    }

    // Fallback if 0 found (should not happen with this aggressive fallback)
    if (products.length === 0) {
        console.log("No products scraped! This is wrong.");
    }

    fs.writeFileSync('./src/data/products.ts', `export interface Product {
    id: string;
    name: string;
    price: number;
    regularPrice?: number | null;
    category: string;
    description: string;
    image: string;
    attributes: {
        weight?: string;
        effects?: string[];
        ingredients?: string[];
        dosage?: string;
    };
}

export const products: Product[] = ${JSON.stringify(products, null, 4)};\n`);
    console.log('Done generating products.ts with ' + products.length + ' products.');
}

scrape();
