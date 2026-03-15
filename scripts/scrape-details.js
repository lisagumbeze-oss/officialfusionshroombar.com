const https = require('https');
const fs = require('fs');
const path = require('path');

// Helper to fetch HTML from URL
function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

// Main scrape function
async function scrapeDetails() {
    const urls = JSON.parse(fs.readFileSync('scripts/missing-urls.json', 'utf-8'));
    console.log(`Starting scrape of ${urls.length} products...`);

    const scrapedProducts = [];

    for (const url of urls) {
        console.log(`Scraping: ${url}`);
        try {
            const html = await fetchHtml(url);

            // Basic Regex matching for OpenGraph tags (common in WooCommerce sites)
            let nameMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
            let name = nameMatch ? nameMatch[1].replace(/ - Official Fusion Shroom Bars| - My Fusion Bar| - Fusion Chocolate Store/gi, '').trim() : '';

            let imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
            let image = imageMatch ? imageMatch[1] : '';

            let descMatch = html.match(/<meta property="og:description" content="([^"]+)"/);
            let description = descMatch ? descMatch[1] : '';

            // Price - more tricky, looking for product:price:amount
            let priceMatch = html.match(/<meta property="product:price:amount" content="([^"]+)"/);
            let price = priceMatch ? parseFloat(priceMatch[1]) : 35.00; // Default if not found

            // Category logic based on name
            let category = 'Chocolate Bars';
            if (name.toLowerCase().includes('gummy') || name.toLowerCase().includes('gummies')) category = 'Gummies';
            if (name.toLowerCase().includes('vape') || name.toLowerCase().includes('cart')) category = 'Vapes';
            if (name.toLowerCase().includes('wholesale') || name.toLowerCase().includes('box of')) category = 'Wholesale';

            if (name) {
                // Generate a slug from name
                const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

                scrapedProducts.push({
                    name,
                    slug,
                    price,
                    description,
                    image,
                    category,
                    url // keep for reference
                });
            }

            // Small delay to be polite
            await new Promise(r => setTimeout(r, 500));

        } catch (error) {
            console.error(`Error scraping ${url}: ${error.message}`);
        }
    }

    fs.writeFileSync('scripts/scraped-products.json', JSON.stringify(scrapedProducts, null, 2), 'utf-8');
    console.log(`Done! Scraped ${scrapedProducts.length} products.`);
}

scrapeDetails();
