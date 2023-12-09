-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT,
    "lastName" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "leadId" INTEGER NOT NULL,
    CONSTRAINT "Address_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("city", "email", "firstName", "id", "lastName", "leadId", "phone", "postalCode") SELECT "city", "email", "firstName", "id", "lastName", "leadId", "phone", "postalCode" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_leadId_key" ON "Address"("leadId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
