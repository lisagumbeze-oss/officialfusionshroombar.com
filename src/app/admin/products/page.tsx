export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import styles from '../admin.module.css';
import { revalidatePath } from 'next/cache';
import ProductsTable from './ProductsTable';

export const metadata = {
    title: 'Products Management | Fusion Shroom Bars',
};

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { category: 'asc' },
    });

    async function updateProduct(formData: FormData) {
        'use server';
        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const price = parseFloat(formData.get('price') as string);
        const regularPriceRaw = formData.get('regularPrice') as string;
        const regularPrice = regularPriceRaw ? parseFloat(regularPriceRaw) : null;
        const category = formData.get('category') as string;
        const image = formData.get('image') as string;
        const description = formData.get('description') as string;
        const isActive = formData.get('isActive') === 'on';

        // Handle gallery
        const gallery = [];
        for (let i = 0; i < 5; i++) {
            const url = formData.get(`gallery_${i}`) as string;
            if (url) gallery.push(url);
        }

        await (prisma as any).product.update({
            where: { id },
            data: { 
                name, 
                price, 
                regularPrice, 
                category, 
                image, 
                description, 
                isActive,
                gallery: JSON.stringify(gallery)
            },
        });
        
        revalidatePath('/admin/products');
        revalidatePath('/shop'); // Revalidate storefront too
        revalidatePath('/');
    }

    async function addProduct(formData: FormData) {
        'use server';
        const name = formData.get('name') as string;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const price = parseFloat(formData.get('price') as string);
        const regularPriceRaw = formData.get('regularPrice') as string;
        const regularPrice = regularPriceRaw ? parseFloat(regularPriceRaw) : null;
        const category = formData.get('category') as string;
        const image = formData.get('image') as string;
        const description = formData.get('description') as string;
        const isActive = formData.get('isActive') === 'on';

        // Handle gallery
        const gallery = [];
        for (let i = 0; i < 5; i++) {
            const url = formData.get(`gallery_${i}`) as string;
            if (url) gallery.push(url);
        }

        await (prisma as any).product.create({
            data: { 
                name, 
                slug,
                price, 
                regularPrice, 
                category, 
                image, 
                description, 
                isActive,
                gallery: JSON.stringify(gallery)
            },
        });
        
        revalidatePath('/admin/products');
        revalidatePath('/shop');
        revalidatePath('/');
    }

    return (
        <div className={styles.adminContainer}>
            <header className={styles.adminHeader} style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <h1>Products Database</h1>
                <p>Manage your inventory, prices, and catalog visibility.</p>
            </header>

            <ProductsTable 
                products={products} 
                updateProductAction={updateProduct} 
                addProductAction={addProduct} 
            />
        </div>
    );
}
