import { prisma } from "../src/config/prisma";
import bcrypt from "bcrypt";


async function main() {
  const saltRounds = 10;
  const hashAdmin = await bcrypt.hash("admin123", saltRounds);
  const hashCliente = await bcrypt.hash("cliente123", saltRounds);

  await prisma.usuario.upsert({
    where: { email: "admin@libreria.test" },
    update: {},
    create: {
      email: "admin@libreria.test",
      nombre: "Ana Admin",
      passwordHash: hashAdmin,
      rol: "ADMIN",
    },
  });

  await prisma.usuario.upsert({
    where: { email: "cliente@libreria.test" },
    update: {},
    create: {
      email: "cliente@libreria.test",
      nombre: "Carlos Cliente",
      passwordHash: hashCliente,
      rol: "CLIENTE",
    },
  });

  console.log(" Usuarios de prueba sembrados correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });