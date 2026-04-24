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
    {
      slug: "advogado-cadastro-e-validacao",
      title: "Advogado — cadastro e validação no e-Proc",
      module: "ADVOGADO",
      content:
        "Realize o cadastro no portal eproc do TJAC (menu Cadastre-se Aqui > Cadastrar Advogado). Priorize cadastro com certificado digital para validação automática; sem certificado, conclua pré-cadastro e envie a OAB pelo Fale Conosco para validação do suporte.",
      steps: [
        "Acesse https://eproc1g.tjac.jus.br e selecione Cadastre-se Aqui > Cadastrar Advogado.",
        "Escolha cadastro com certificado digital (preferencial) ou sem certificado.",
        "Preencha dados pessoais e finalize o pré-cadastro.",
        "Se não usar certificado, envie cópia da carteira OAB no menu Fale Conosco.",
        "Após validação, acesse e mantenha senha/dados cadastrais atualizados."
      ]
    },
    {
      slug: "jus-postulandi-cadastro",
      title: "Jus Postulandi — credenciamento e documentos",
      module: "JUS POSTULANDI",
      content:
        "O cadastro de Jus Postulandi também ocorre no portal do eproc TJAC. Sem certificado digital, o suporte exige documento pessoal com foto e comprovante de residência para validação do perfil.",
      steps: [
        "Acesse https://eproc1g.tjac.jus.br > Cadastre-se Aqui > Cadastrar Jus Postulandi.",
        "Escolha a modalidade com certificado digital (dispensa validação posterior).",
        "Caso seja sem certificado, finalize o pré-cadastro normalmente.",
        "Envie RG/CNH e comprovante de residência pelo Fale Conosco.",
        "Aguarde validação do suporte e realize primeiro acesso."
      ]
    },
    {
      slug: "perito-leiloeiro-administrador-judicial",
      title: "Perito, Leiloeiro e Administrador Judicial",
      module: "PERITO / LEILOEIRO / ADMINISTRADOR JUDICIAL",
      content:
        "Para atuação nesses perfis, o tutorial orienta cadastro via serviço CPTEC do TJAC, conforme requisitos específicos de credenciamento para auxiliares da Justiça.",
      steps: [
        "Acesse https://www.tjac.jus.br/servicos/cptec/.",
        "Verifique normativos e exigências para sua categoria profissional.",
        "Preencha o cadastro solicitado pelo serviço correspondente.",
        "Anexe documentação exigida e dados de contato válidos.",
        "Acompanhe comunicações de validação e orientações de acesso."
      ]
    },
    {
      slug: "procurador-chefe-entidade",
      title: "Procurador-Chefe de Entidade — fluxo NUSAN",
      module: "PROCURADOR-CHEFE DE ENTIDADE",
      content:
        "Credenciamento por envio documental ao NUSAN (nusan@tjac.jus.br), sem necessidade de validação presencial, conforme tutorial do TJAC.",
      steps: [
        "Enviar portaria de nomeação do Procurador-Chefe (ou nomeação como Procurador, se comissionado).",
        "Anexar cópia da carteira da OAB do Procurador-Chefe.",
        "Informar telefone e e-mail para recebimento de login/senha.",
        "Encaminhar tudo para nusan@tjac.jus.br.",
        "Aguardar retorno do suporte com dados de acesso."
      ]
    },
    {
      slug: "advogado-titular-sociedade",
      title: "Advogado Titular de Sociedade de Advogados",
      module: "ADVOGADO TITULAR DE SOCIEDADE DE ADVOGADOS",
      content:
        "O sócio majoritário realiza o pedido de credenciamento da sociedade de advogados enviando documentação societária e cadastral ao NUSAN.",
      steps: [
        "Reunir contrato social e últimas alterações da sociedade.",
        "Anexar carteira OAB do sócio majoritário responsável pelo cadastro.",
        "Anexar cartão CNPJ e certidão OAB do registro da sociedade.",
        "Informar telefone e e-mail para envio de credenciais.",
        "Enviar documentação para nusan@tjac.jus.br."
      ]
    },
    {
      slug: "responsavel-unidade-externa",
      title: "Responsável por Unidade Externa",
      module: "RESPONSÁVEL UNIDADE EXTERNA",
      content:
        "A unidade externa encaminha termo de credenciamento, termo de posse e documentos pessoais do responsável ao NUSAN para cadastro no eproc do PJAC.",
      steps: [
        "Preencher e assinar termo de credenciamento.",
        "Anexar termo de posse do responsável pela unidade.",
        "Anexar documento com foto, CPF e OAB (quando houver).",
        "Enviar documentação para nusan@tjac.jus.br.",
        "Aguardar recebimento de dados de acesso e manual de utilização."
      ]
    },
    {
      slug: "representante-legal-pj",
      title: "Representante Legal da Pessoa Jurídica",
      module: "REPRESENTANTE LEGAL DA PESSOA JURÍDICA",
      content:
        "Cadastro realizado no próprio eproc (Cadastre-se Aqui > Cadastrar Representante Legal de PJ), seguindo o manual específico da Pessoa Jurídica indicado no tutorial.",
      steps: [
        "Acessar https://eproc1g.tjac.jus.br e escolher Cadastrar Representante Legal de PJ.",
        "Preencher dados da pessoa física e da pessoa jurídica vinculada.",
        "Conferir dados de contato e informações de representação legal.",
        "Seguir o Manual do Representante Legal para etapas complementares.",
        "Finalizar habilitação e validar acesso ao perfil cadastrado."
      ]
    },
    {
      slug: "advogado-titular-escritorio-nucleo-pratica",
      title: "Advogado-Titular de Escritório/Núcleo de Prática Jurídica",
      module: "ESCRITÓRIO/NÚCLEO DE PRÁTICA JURÍDICA",
      content:
        "A habilitação da instituição de ensino ocorre por envio de documentos ao NUSAN, incluindo nomeações e OAB do advogado titular. O coordenador deve estar previamente cadastrado como advogado no eproc.",
      steps: [
        "Anexar ato de nomeação/posse do Reitor.",
        "Anexar portaria/ato de nomeação do coordenador do Escritório de Prática Jurídica.",
        "Anexar OAB do advogado que atuará como titular.",
        "Informar CNPJ (se houver), telefone e e-mail da instituição.",
        "Enviar documentação para nusan@tjac.jus.br e aguardar instruções de acesso."
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
}

main().finally(() => prisma.$disconnect());
