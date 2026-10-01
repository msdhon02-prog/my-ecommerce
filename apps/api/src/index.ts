import express from "express";
import cors from "cors";
import products from "./routes/products";
import categories from "./routes/categories";
import orders from "./routes/orders";
import admin from "./routes/admin";
import newsletter from "./routes/newsletter";

const app = express();
app.use(cors(), express.json());

app.get("/health", (_req, res) => res.json({ ok: true, brand: "DEMORA" }));
app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/api/orders", orders);
app.use("/api/admin", admin);
app.use("/api/newsletter", newsletter);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => console.log("DEMORA API on :" + port));
