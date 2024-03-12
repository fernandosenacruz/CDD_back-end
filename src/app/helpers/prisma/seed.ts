import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const ximira = await prisma.user.upsert({
    where: { email: 'ximira@prisma.io' },
    update: {},
    create: {
      name: 'Ximira',
      userName: 'ximira',
      email: 'ximira@prisma.io',
      password: '$2b$10$kkY.KJmOSkfG/J2FzwAJ0.MTENZAbmHO2wK18S0.ab7sVucKf2TCO',
      posts: {
        create: [
          {
            phrase: 'A gambiarra a gente aceita. Agente só não aceita é a derrota.',
            imgURL: 'https://img.global.news.samsung.com/br/wp-content/uploads/2017/10/Nilce-e-Leon-640x334.jpg',
            published: true,
          },
          {
            phrase: 'Sem lutas não há derrotas!',
            imgURL: 'https://transporteenegocios.eslsistemas.com.br/wp-content/uploads/2016/06/Derrota-768x460.jpg',
            published: true,
          },
          {
            phrase: 'É só questão de tempo e dará errado!',
            imgURL: 'https://cf.shopee.com.br/file/833c7d0bc96cf3aa7dd1abd30c84a35e',
            published: true,
          },
          {
            phrase: 'Não se importe com a derrota de hoje. amanhã tem mais!',
            imgURL: 'https://cdn.leouve.com.br/2019/08/for%C3%A7a.png',
            published: true,
          },
          {
            phrase: 'Se algo parece que vai dar errado é porque vai mesmo',
            imgURL: 'https://holos.org.br/wp-content/uploads/2018/08/960-2.jpg',
            published: true,
          },
          {
            phrase: 'O não você já tem. Busque a humilhação',
            imgURL: 'https://evorastudio.com.br/wp-content/uploads/2021/02/fotos-para-coach-7-scaled-e1613489885317.jpg',
            published: true,
          },
          {
            phrase: 'Nunca deixe ninguém dizer que você não consegue. Diga você mesmo: eu não consigo!',
            imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIoTYWQ4S5PQ7hEHRXneYWu3O-Re0_xc7rQA&usqp=CAU',
            published: true,
          },
          {
            phrase: 'Mais que uma caixinha de surpresas,a vida é um container de decepções.',
            imgURL: 'https://uploads.metropoles.com/wp-content/uploads/2018/01/03163332/os-melhores-do-mundo.jpg',
            published: true,
          },
          {
            phrase: 'Não deixe para desistir amanhã do que você pode desistir ainda hoje!',
            imgURL: 'https://fogao24horas.com.br/wp-content/uploads/2020/11/20201123-download-3.png',
            published: true,
          },
          {
            phrase: 'Não sabendo que era impossível, foi lá e soube!',
            imgURL: 'https://www.psicologoeterapia.com.br/wp-content/uploads/conviver-com-o-arrependimento.jpg',
            published: true,
          },
        ]
      },
    },
  })
  const xibil = await prisma.user.upsert({
    where: { email: 'xibil@prisma.io' },
    update: {},
    create: {
      name: 'Xibil',
      userName: 'xibil',
      email: 'xibil@prisma.io',
      password: '$2b$10$kkY.KJmOSkfG/J2FzwAJ0.MTENZAbmHO2wK18S0.ab7sVucKf2TCO',
      posts: {
        create: [
          {
            phrase: 'O seu propósito na vida seja servir de aviso para os outros.',
            imgURL: 'https://www.folhavitoria.com.br/entretenimento/blogs/na-balada/wp-content/uploads/2021/09/Tiago-dionisio-2-800x500.jpg',
            published: true,
          },
          {
            phrase: 'Hoje é sempre uma oportunidade de mostrar que você pode ser pior do que ontem.',
            imgURL: 'https://blog.unopar.com.br/wp-content/uploads/2021/09/post_thumbnail-cef4bad7c8b8f6dc4cd73508838d5b26.jpeg',
            published: true,
          },
          {
            phrase: 'Pare de tentar e comece a desistir.',
            imgURL: 'https://www.sitedecuriosidades.com/wp-content/uploads/2021/02/7B9D2.jpg',
            published: true,
          },
          {
            phrase: 'O caminho é longo, mas a derrota é certa.',
            imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvwyyntSY1l9uqmb0WT0YfcrcXJq0Se3A8wWL5rvBEJ_M_APoG-I7FiDncn158qx-GaA&usqp=CAU',
            published: true,
          },
          {
            phrase: 'Você ainda vai calar a boca de muitos que te elogiaram.',
            imgURL: 'https://s2.glbimg.com/_LHoaIUl0RDbu97ZD__K_7a-lXc=/0x0:1600x1066/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/X/2/CBTh5fT0G667NHzu9DIg/foto-texto-maior-coach-do-brasil.jpg',
            published: true,
          },
          {
            phrase: 'Nunca foi azar, sempre foi incompetência.',
            imgURL: 'https://cdn.autopapo.com.br/box/uploads/2019/02/08143145/limpador_traseiro.jpg',
            published: true,
          },
          {
            phrase: 'Há dois caminhos na vida: a derrota ou a desistência',
            imgURL: 'https://hqscomcafe.com.br/wp-content/uploads/2021/07/frases-murilo-coach-800x445.jpg',
            published: true,
          },
          {
            phrase: 'Na minha máquina roda... e quebra.',
            imgURL: 'https://cdn.pixabay.com/photo/2019/11/05/21/42/sad-4604666_960_720.jpg',
            published: true,
          },
          {
            phrase: 'Não tenha medo do fracasso! Tenha costume!',
            imgURL: 'https://static.sbt.com.br/noticias/images/133750.jpg',
            published: true,
          },
          {
            phrase: 'Se a vida é uma sopa eu tô de garfo.',
            imgURL: 'https://midias.correiobraziliense.com.br/_midias/jpg/2022/01/07/766x527/1_coach__1_42421-7299134.jpg?20220107101657?20220107101657',
            published: true,
          },
        ],
      },
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });