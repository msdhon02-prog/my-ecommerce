import { Router } from "express";
import { PrismaClient } from "@demora/db";

const prisma = new PrismaClient();
const r = Router();

r.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Valid email required" });
  }
  const sub = await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: {},
    create: { email },
  });
  res.status(201).json({ ok: true, id: sub.id });
});

export default r;
