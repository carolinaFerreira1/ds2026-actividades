import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";

const app = express();
app.use(express.json()); 

app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});