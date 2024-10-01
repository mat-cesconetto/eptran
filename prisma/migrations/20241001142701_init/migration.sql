-- CreateEnum
CREATE TYPE "EstadoEnum" AS ENUM ('E', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'NA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- CreateEnum
CREATE TYPE "EscolaridadeEnum" AS ENUM ('ENSINO_FUNDAMENTAL_I', 'ENSINO_FUNDAMENTAL_II', 'ENSINO_MEDIO', 'OUTROS');

-- CreateEnum
CREATE TYPE "SexoEnum" AS ENUM ('MASCULINO', 'FEMININO', 'NAO_DECLARAR');

-- CreateTable
CREATE TABLE "Cadastro" (
    "id_usuario" SERIAL NOT NULL,
    "nome_usuario" VARCHAR(99) NOT NULL,
    "email_usuario" VARCHAR(99) NOT NULL,
    "senha_usuario" VARCHAR(99) NOT NULL,
    "cep_usuario" VARCHAR(99) NOT NULL,
    "rua_usuario" VARCHAR(99) NOT NULL,
    "cidade_usuario" VARCHAR(99) NOT NULL,
    "estado_usuario" "EstadoEnum" NOT NULL,
    "escola_usuario" VARCHAR(100) NOT NULL,
    "data_nascimento_usuario" TIMESTAMP(3),
    "escolaridade_usuario" "EscolaridadeEnum" NOT NULL,
    "sexo_usuario" "SexoEnum" NOT NULL,
    "adm" BOOLEAN NOT NULL,

    CONSTRAINT "Cadastro_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Conquistas" (
    "fk_id_usuario" INTEGER NOT NULL,
    "conquista_1" BOOLEAN NOT NULL,
    "conquista_2" BOOLEAN NOT NULL,
    "conquista_3" BOOLEAN NOT NULL,

    CONSTRAINT "Conquistas_pkey" PRIMARY KEY ("fk_id_usuario")
);

-- CreateTable
CREATE TABLE "FaleConosco" (
    "id" SERIAL NOT NULL,
    "nome_reclamacao" VARCHAR(99) NOT NULL,
    "email_reclamacao" VARCHAR(99) NOT NULL,
    "assunto_reclamacao" VARCHAR(99) NOT NULL,
    "mensagem_reclamacao" TEXT NOT NULL,

    CONSTRAINT "FaleConosco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Videos" (
    "id" SERIAL NOT NULL,
    "video_link" TEXT,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livros" (
    "id" SERIAL NOT NULL,
    "livro_link" TEXT,

    CONSTRAINT "Livros_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conquistas" ADD CONSTRAINT "Conquistas_fk_id_usuario_fkey" FOREIGN KEY ("fk_id_usuario") REFERENCES "Cadastro"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
