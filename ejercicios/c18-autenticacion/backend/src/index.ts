import express from "express";
import authRoutes from "./routes/auth.routes";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import { errorHandler } from "./middlewares/error.middleware"; 

const app = express();
app.use(express.json()); 

app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});