import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const placeholder = (from: string, to: string) =>
  `https://placehold.co/800x1000/${from}/${to}?text=DEMORA`;

async function main() {
  await prisma.adminUser.upsert({
    where: { email: "admin@demora.com" },
    update: {},
    create: { email: "admin@demora.com", passwordHash: await bcrypt.hash("demora123", 10) },
  });

  const cats = [
    { name: "Oversized Tees", slug: "oversized-tees", tagline: "Effortless street fit", sortOrder: 0 },
    { name: "Graphic Tees", slug: "graphic-tees", tagline: "Wear your statement", sortOrder: 1 },
    { name: "Essentials", slug: "essentials", tagline: "Everyday comfort", sortOrder: 2 },
    { name: "Limited Drop", slug: "limited-drop", tagline: "Small runs, bold energy", sortOrder: 3 },
  ];
  for (const c of cats) await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });

  const tees = [
    { name: "DEMORA Core Oversized Tee", slug: "core-oversized-tee", cat: "oversized-tees", price: "1290", isNew: true },
    { name: "Midnight Orchid Graphic Tee", slug: "midnight-orchid-tee", cat: "graphic-tees", price: "1490", isNew: true },
    { name: "Essential Heavyweight Tee", slug: "essential-heavyweight-tee", cat: "essentials", price: "990" },
    { name: "Violet Hour Drop Tee", slug: "violet-hour-drop-tee", cat: "limited-drop", price: "1890", isFeatured: true, isNew: true },
    { name: "Aubergine Wash Tee", slug: "aubergine-wash-tee", cat: "oversized-tees", price: "1390" },
    { name: "Logo Mark Tee", slug: "logo-mark-tee", cat: "essentials", price: "890", isFeatured: true },
  ];

  for (let i = 0; i < tees.length; i++) {
    const t = tees[i];
    const category = await prisma.category.findUnique({ where: { slug: t.cat } });
    await prisma.product.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        name: t.name, slug: t.slug,
        description: "Premium heavyweight cotton tee. 240 GSM, pre-shrunk, garment-dyed. Placeholder description — replace with real copy.",
        price: t.price, compareAt: null,
        images: [placeholder("5B2E90", "FAF8FD"), placeholder("17102B", "C9B6F2")],
        categoryId: category!.id,
        sizes: ["S", "M", "L", "XL", "XXL"],
        stock: 50, isNew: t.isNew ?? false, isFeatured: t.isFeatured ?? false,
        sortOrder: i,
      },
    });
  }
  console.log("Seed complete. Admin: admin@demora.com / demora123");
}

main().finally(() => prisma.$disconnect());
