import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Limpiar datos existentes
  await prisma.user.deleteMany();

  // Crear usuarios de prueba
  const user1 = await prisma.user.create({
    data: {
      name: 'Usuario Demo',
      email: 'demo@growfit.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Juan Pérez',
      email: 'juan@growfit.com',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'María García',
      email: 'maria@growfit.com',
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log({ user1, user2, user3 });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
