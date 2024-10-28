import { metaData } from "../schema"
import { db } from "..";

export const getMeta = async () => {
  const entries = await db.select().from(metaData)
  return entries[0];
}
