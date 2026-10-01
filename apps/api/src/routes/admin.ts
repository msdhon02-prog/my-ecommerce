import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@demora/db";
import { requireAdmin } from "../middleware/auth";

const prisma = new PrismaClient();
const r = Router();

r.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET!, { expiresIn: "12h" });
  res.json({ token });
});

// Dashboard stats
r.get("/stats", requireAdmin, async (_req, res) => {
  const [products, orders, revenue, subscribers, lowStock] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.newsletterSubscriber.count(),
    prisma.product.count({ where: { stock: { lt: 10 } } }),
  ]);
  res.json({
    products,
    orders,
    revenue: Number(revenue._sum.total ?? 0),
    subscribers,
    lowStock,
  });
});

// Products: CRUD + drag-and-drop ordering
r.get("/products", requireAdmin, async (_req, res) => {
  res.json(await prisma.product.findMany({ orderBy: { sortOrder: "asc" }, include: { category: true } }));
});
r.post("/products", requireAdmin, async (req, res) => {
  res.status(201).json(await prisma.product.create({ data: req.body }));
});
r.put("/products/:id", requireAdmin, async (req, res) => {
  res.json(await prisma.product.update({ where: { id: req.params.id }, data: req.body }));
});
r.delete("/products/:id", requireAdmin, async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});
r.put("/products/reorder", requireAdmin, async (req, res) => {
  const { ids } = req.body;
  await prisma.$transaction(
    ids.map((id: string, i: number) =>
      prisma.product.update({ where: { id }, data: { sortOrder: i } })
    )
  );
  res.json({ ok: true });
});

// Categories CRUD + ordering
r.get("/categories", requireAdmin, async (_req, res) => {
  res.json(await prisma.category.findMany({ orderBy: { sortOrder: "asc" } }));
});
r.post("/categories", requireAdmin, async (req, res) => {
  res.status(201).json(await prisma.category.create({ data: req.body }));
});
r.put("/categories/:id", requireAdmin, async (req, res) => {
  res.json(await prisma.category.update({ where: { id: req.params.id }, data: req.body }));
});
r.delete("/categories/:id", requireAdmin, async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

// Orders
r.get("/orders", requireAdmin, async (_req, res) => {
  res.json(await prisma.order.findMany({ orderBy: { createdAt: "desc" }, include: { items: { include: { product: true } } } }));
});
r.put("/orders/:id/status", requireAdmin, async (req, res) => {
  res.json(await prisma.order.update({ where: { id: req.params.id }, data: { status: req.body.status } }));
});

export default r;
