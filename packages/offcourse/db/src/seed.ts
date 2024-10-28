import 'dotenv/config'
import { db } from ".";
import { metaData } from "./schema"
import { readFileSync } from 'fs';
import { parse } from 'yaml'


async function main() {
  const fileName = process.argv[2];
  if (fileName) {
    const data = readFileSync(fileName, 'utf8');
    const meta = parse(data);
    const res = await db.insert(metaData).values(meta).onConflictDoNothing()
    console.log(res);
  }
}

main();

