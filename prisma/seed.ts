import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Criar usuário admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@local.dev' },
    update: {},
    create: {
      email: 'admin@local.dev',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Usuário admin criado:', admin.email);

  // Criar alguns clientes de exemplo
  const clients = await Promise.all([
    prisma.client.upsert({
      where: { email: 'joao@example.com' },
      update: {},
      create: {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '(11) 99999-9999',
      },
    }),
    prisma.client.upsert({
      where: { email: 'maria@example.com' },
      update: {},
      create: {
        name: 'Maria Santos',
        email: 'maria@example.com',
        phone: '(11) 88888-8888',
      },
    }),
    prisma.client.upsert({
      where: { email: 'pedro@example.com' },
      update: {},
      create: {
        name: 'Pedro Oliveira',
        email: 'pedro@example.com',
        phone: '(11) 77777-7777',
      },
    }),
  ]);

  console.log('✅ Clientes criados:', clients.length);

  // Criar alguns seguros de exemplo
  const insurances = await Promise.all([
    prisma.insurance.upsert({
      where: { policyNumber: 'POL-001-2024' },
      update: {},
      create: {
        clientId: clients[0].id,
        policyNumber: 'POL-001-2024',
        coverage: 'Cobertura Completa',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        status: 'active',
      },
    }),
    prisma.insurance.upsert({
      where: { policyNumber: 'POL-002-2024' },
      update: {},
      create: {
        clientId: clients[1].id,
        policyNumber: 'POL-002-2024',
        coverage: 'Cobertura Básica',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-11-30'),
        status: 'active',
      },
    }),
    prisma.insurance.upsert({
      where: { policyNumber: 'POL-003-2023' },
      update: {},
      create: {
        clientId: clients[2].id,
        policyNumber: 'POL-003-2023',
        coverage: 'Cobertura Premium',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-12-31'),
        status: 'expired',
      },
    }),
  ]);

  console.log('✅ Seguros criados:', insurances.length);

  console.log('🎉 Seed concluído com sucesso!');
  console.log('');
  console.log('📋 Credenciais de acesso:');
  console.log('Email: admin@local.dev');
  console.log('Senha: admin123');
  console.log('');
  console.log('🚀 Execute "npm run dev" para iniciar o servidor');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
