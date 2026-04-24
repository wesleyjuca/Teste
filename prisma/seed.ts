import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin@123", 10);
  await prisma.user.upsert({
    where: { email: "admin@eproc" },
    update: { passwordHash, role: "ADMIN" },
    create: { name: "Administrador Teste", email: "admin@eproc", passwordHash, role: "ADMIN" }
  });

  await prisma.user.upsert({
    where: { email: "admin@eprocacre.org" },
    update: {},
    create: { name: "Administrador", email: "admin@eprocacre.org", passwordHash, role: "ADMIN" }
  });

  const lessons = [
    ["introducao-eproc", "Introdução ao e-Proc", "Introdução ao e-Proc"],
    ["peticionamento", "Peticionamento", "Peticionamento"],
    ["intimacoes", "Intimações", "Intimações"],
    ["recursos", "Recursos", "Recursos"],
    ["audiencias", "Audiências", "Audiências"]
  ];

  for (let i = 0; i < lessons.length; i++) {
    const [slug, title, module] = lessons[i];
    await prisma.lesson.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title,
        module,
        order: i + 1,
        content: `Conteúdo institucional sobre ${title}.`,
        steps: ["Acessar portal", "Selecionar órgão", "Conferir dados", "Protocolar e salvar comprovante"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    });
  }
}

main().finally(() => prisma.$disconnect());
