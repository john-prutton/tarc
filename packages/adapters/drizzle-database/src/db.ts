import { Config, createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

import * as schema from "./schema"

export function createDb(config: Config) {
  const client = createClient(config)
  const db = drizzle(client, { schema })
  return db
}
