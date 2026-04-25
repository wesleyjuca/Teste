import { ContentLevel, PrismaClient } from "@prisma/client";
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
    {
      slug: "fundamentos-cadastro-validacao-externa",
      title: "Fundamentos — cadastro e validação de usuário externo",
      module: "FUNDAMENTOS",
      content:
        "Inicie pelo cadastro correto no e-Proc e escolha o fluxo de validação adequado (com certificado digital ou validação documental pelo suporte).",
      steps: [
        "Acesse o portal do e-Proc e escolha o perfil correto em Cadastre-se Aqui.",
        "Priorize cadastro com certificado digital para validação imediata.",
        "Sem certificado, finalize o pré-cadastro e encaminhe documentação exigida no Fale Conosco.",
        "Acompanhe confirmação do suporte e teste o primeiro acesso.",
        "Registre internamente a data de habilitação para controle institucional."
      ]
    },
    {
      slug: "operacao-diaria-peticionamento-anexos",
      title: "Operação diária — peticionamento, anexos e boas práticas",
      module: "OPERAÇÃO DIÁRIA",
      content:
        "A rotina operacional exige consistência entre classe processual, tipo de petição e anexos obrigatórios, com validação final antes do protocolo.",
      steps: [
        "Confirme classe processual e competência antes de iniciar o protocolo.",
        "Nomeie anexos de forma padronizada e mantenha legibilidade dos arquivos.",
        "Valide assinatura digital e formato aceito pelo sistema.",
        "Revise polos, partes e assunto processual antes de concluir.",
        "Emita e arquive comprovante de protocolo com identificação do responsável."
      ]
    },
    {
      slug: "casos-especiais-perfis-institucionais-nusan",
      title: "Casos especiais — perfis institucionais e fluxos NUSAN",
      module: "CASOS ESPECIAIS",
      content:
        "Perfis institucionais (ente público, sociedade, núcleo de prática e unidade externa) seguem trilha documental específica com envio ao NUSAN.",
      steps: [
        "Identifique o tipo de perfil institucional e a base normativa aplicável.",
        "Monte dossiê com portarias, atos de nomeação e documentos de representação.",
        "Valide OAB/CPF/CNPJ antes do envio para evitar pendências.",
        "Encaminhe documentação para nusan@tjac.jus.br com contato institucional ativo.",
        "Acompanhe retorno do NUSAN e mantenha histórico de credenciais recebidas."
      ]
    }
  ];

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    await prisma.lesson.upsert({
      where: { slug: lesson.slug },
      update: {
        title: lesson.title,
        module: lesson.module,
        content: lesson.content,
        steps: lesson.steps,
        order: i + 1,
        videoUrl: null
      },
      create: {
        slug: lesson.slug,
        title: lesson.title,
        module: lesson.module,
        order: i + 1,
        content: lesson.content,
        steps: lesson.steps,
        videoUrl: null
      }
    });
  }

  const editorialReviewedAt = new Date("2026-04-20T00:00:00.000Z");

  const faqItems = [
    {
      question: "Posso protocolar sem certificado digital?",
      answer:
        "Sim. O pré-cadastro pode ser concluído sem certificado, mas a liberação depende de validação documental pelo suporte competente.",
      level: ContentLevel.FUNDAMENTOS,
      order: 1,
      normativeSource: "Manual de Cadastro de Usuário Externo e-Proc/TJAC"
    },
    {
      question: "Qual a principal causa de indeferimento no peticionamento inicial?",
      answer:
        "Divergência entre classe processual, tipo de petição e anexos obrigatórios. A conferência final reduz indeferimentos por erro formal.",
      level: ContentLevel.OPERACAO_DIARIA,
      order: 2,
      normativeSource: "Boas práticas operacionais de protocolo no e-Proc/TJAC"
    },
    {
      question: "Como credenciar perfis institucionais com fluxo NUSAN?",
      answer:
        "É necessário encaminhar documentação de representação institucional e dados de contato para nusan@tjac.jus.br, observando o perfil solicitado.",
      level: ContentLevel.CASOS_ESPECIAIS,
      order: 3,
      normativeSource: "Fluxo NUSAN para perfis institucionais — TJAC"
    }
  ];

  for (const item of faqItems) {
    await prisma.faqItem.upsert({
      where: { question: item.question },
      update: {
        answer: item.answer,
        level: item.level,
        order: item.order,
        editorialReviewedAt,
        normativeSource: item.normativeSource
      },
      create: {
        ...item,
        editorialReviewedAt
      }
    });
  }

  const checklistItems = [
    {
      title: "Conferir dados cadastrais antes da validação",
      description: "Revise nome, CPF e e-mail para evitar bloqueio ou duplicidade de acesso.",
      level: ContentLevel.FUNDAMENTOS,
      order: 1,
      normativeSource: "Manual de Cadastro de Usuário Externo e-Proc/TJAC"
    },
    {
      title: "Validar anexos e assinatura antes de protocolar",
      description: "Garanta legibilidade, tipo documental correto e assinatura digital compatível com o sistema.",
      level: ContentLevel.OPERACAO_DIARIA,
      order: 2,
      normativeSource: "Boas práticas operacionais de protocolo no e-Proc/TJAC"
    },
    {
      title: "Confirmar documentação institucional para NUSAN",
      description: "Inclua ato de nomeação, documento profissional e contato oficial para retorno de credenciais.",
      level: ContentLevel.CASOS_ESPECIAIS,
      order: 3,
      normativeSource: "Fluxo NUSAN para perfis institucionais — TJAC"
    }
  ];

  for (const item of checklistItems) {
    await prisma.operationalChecklistItem.upsert({
      where: { title: item.title },
      update: {
        description: item.description,
        level: item.level,
        order: item.order,
        editorialReviewedAt,
        normativeSource: item.normativeSource
      },
      create: {
        ...item,
        editorialReviewedAt
      }
    });
  }
}

main().finally(() => prisma.$disconnect());
