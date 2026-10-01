import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const r = Router();

// POST /api/orders — checkout. COD is the default payment method.
r.post("/", async (req, res) => {
  const { customerName, phone, email, address, city, paymentMethod = "COD", items } = req.body;
  if (!customerName || !phone || !address || !city || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const ids = items.map((i: any) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: ids } } });
  const map = new Map(products.map((p) => [p.id, p]));

  let subtotal = 0;
  const lineItems = items.map((i: any) => {
    const p = map.get(i.productId);
    if (!p) throw new Error("Invalid product " + i.productId);
    subtotal += Number(p.price) * i.qty;
    return { productId: p.id, size: i.size, qty: i.qty, price: p.price };
  });

  const shippingFee = subtotal >= 3000 ? 0 : 120; // free shipping threshold (BDT)
  const order = await prisma.order.create({
    data: {
      number: "DM-" + Date.now().toString(36).toUpperCase(),
      customerName, phone, email, address, city,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "PENDING" : "PENDING",
      subtotal, shippingFee, total: subtotal + shippingFee,
      items: { create: lineItems },
    },
    include: { items: true },
  });
  res.status(201).json(order);
});

export default r;
