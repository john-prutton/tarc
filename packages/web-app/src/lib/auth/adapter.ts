import { createLucia } from "@repo/auth"

import { databaseAdapter } from "../db/adapter"

export const authAdapter = createLucia(databaseAdapter.auth)
