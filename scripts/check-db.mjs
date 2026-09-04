import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();
const tables = await p.$queryRaw`
  SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name
`;
console.log("TABLES:", tables.map((t) => t.table_name).join(", ") || "(no tables)");
await p.$disconnect();