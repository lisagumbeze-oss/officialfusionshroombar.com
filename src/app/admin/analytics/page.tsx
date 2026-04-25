export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import AnalyticsDashboard from './AnalyticsDashboard';

export const metadata = { title: 'Analytics | Fusion Admin' };

export default async function AnalyticsPage() {
    let analyticsData: any = null;
    let error = null;

    try {
        const [orders, products, coupons] = await Promise.all([
            prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' } }),
            prisma.product.findMany(),
            prisma.coupon.findMany(),
        ]);

        // Revenue over time (last 30 days)
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const revenueByDay: Record<string, { revenue: number; orders: number }> = {};

        for (let i = 0; i < 30; i++) {
            const d = new Date(thirtyDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
            const key = d.toISOString().split('T')[0];
            revenueByDay[key] = { revenue: 0, orders: 0 };
        }

        for (const order of orders) {
            const key = new Date(order.createdAt).toISOString().split('T')[0];
            if (revenueByDay[key]) {
                revenueByDay[key].revenue += order.totalAmount;
                revenueByDay[key].orders += 1;
            }
        }

        const revenueChart = Object.entries(revenueByDay).map(([date, data]) => ({
            date: date.slice(5), // "MM-DD"
            revenue: Math.round(data.revenue * 100) / 100,
            orders: data.orders,
        }));

        // Sales by category
        const categoryMap: Record<string, number> = {};
        for (const order of orders) {
            for (const item of order.items) {
                const product = products.find(p => p.name === item.productName);
                const cat = product?.category || 'Unknown';
                categoryMap[cat] = (categoryMap[cat] || 0) + item.price * item.quantity;
            }
        }
        const salesByCategory = Object.entries(categoryMap).map(([name, revenue]) => ({ name, revenue: Math.round(revenue * 100) / 100 }));

        // Top products
        const productSales: Record<string, { name: string; units: number; revenue: number }> = {};
        for (const order of orders) {
            for (const item of order.items) {
                const key = item.productName;
                if (!productSales[key]) productSales[key] = { name: key, units: 0, revenue: 0 };
                productSales[key].units += item.quantity;
                productSales[key].revenue += item.price * item.quantity;
            }
        }
        const topProducts = Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 10);

        // Status breakdown
        const statusCounts: Record<string, number> = {};
        for (const order of orders) {
            statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
        }
        const ordersByStatus = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

        // Summary KPIs
        const totalRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);
        const totalOrders = orders.length;
        const uniqueCustomers = new Set(orders.map(o => o.customerEmail)).size;
        const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        const completedOrders = orders.filter(o => o.status === 'COMPLETED').length;
        const conversionRate = totalOrders > 0 ? ((completedOrders / totalOrders) * 100) : 0;

        // Coupon usage
        const couponUsage = coupons.map(c => ({
            code: c.code,
            used: c.usageCount,
            limit: c.usageLimit,
            discount: c.discountType === 'PERCENTAGE' ? `${c.discountValue}%` : `$${c.discountValue}`,
        }));

        analyticsData = {
            summary: { totalRevenue, totalOrders, uniqueCustomers, aov, conversionRate },
            revenueChart,
            salesByCategory,
            topProducts,
            ordersByStatus,
            couponUsage,
        };
    } catch (e: any) {
        error = e.message;
    }

    return <AnalyticsDashboard data={analyticsData} error={error} />;
}
