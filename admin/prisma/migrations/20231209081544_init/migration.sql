/*
  Warnings:

  - A unique constraint covering the columns `[addedBy]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Lead_addedBy_key" ON "Lead"("addedBy");
