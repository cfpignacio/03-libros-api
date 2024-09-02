/*
  Warnings:

  - You are about to drop the column `firstname` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Author` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "birthdate" DATETIME NOT NULL
);
INSERT INTO "new_Author" ("birthdate", "id", "nationality") SELECT "birthdate", "id", "nationality" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
