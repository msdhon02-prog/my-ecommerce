import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const r = Router();

r.get("/", async (req, res) => {
  const { category, new: isNew, featured } = req.query;
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      ...(category ? { category: { slug: String(category) } } : {}),
      ...(isNew === "true" ? { isNew: true } : {}),
      ...(featured === "true" ? { isFeatured: true } : {}),
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { category: true },
  });
  res.json(products);
});

r.get("/:slug", async (req, res) => {
  const p = await prisma.product.findFirst({
    where: { slug: req.params.slug, status: "ACTIVE" },
    include: { category: true },
  });
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});

export default r;
