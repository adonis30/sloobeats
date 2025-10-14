// prisma/seed.js
import bcrypt from "bcrypt";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = [
    { name: "Admin User", email: "admin@sloobeats.com", password: "admin123", role: UserRole.ADMIN },
    { name: "DJ User", email: "dj@sloobeats.com", password: "dj123", role: UserRole.DJ },
    { name: "Fan User", email: "fan@sloobeats.com", password: "fan123", role: UserRole.FAN },
  ];

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        password: hashedPassword,
        role: u.role,
      },
    });
  }

  console.log("✅ Users seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
