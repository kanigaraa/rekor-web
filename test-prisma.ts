import { prisma } from "./src/lib/prisma";
async function main() {
  try {
    await prisma.user.findFirst();
    console.log("Query success");
  } catch (e) {
    console.error("Query failed", e);
  }
}
main();
