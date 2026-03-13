import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    console.log('[Prisma] Initializing new PrismaClient instance...');
    try {
        const client = new PrismaClient({
            log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        });
        return client;
    } catch (error) {
        console.error('[Prisma] Error during initialization:', error);
        throw error;
    }
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
