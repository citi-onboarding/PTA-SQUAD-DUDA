-- CreateEnum
CREATE TYPE "PatientSpecie" AS ENUM ('SHEEP', 'CAT', 'PIG', 'COW', 'HORSE', 'DOG');

-- CreateEnum
CREATE TYPE "ConsultType" AS ENUM ('FIRST', 'VACINATION', 'RETURN', 'CHECKUP');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tutorName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "species" "PatientSpecie" NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "type" "ConsultType" NOT NULL,
    "description" TEXT NOT NULL,
    "doctorName" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
