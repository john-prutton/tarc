import { createLucia } from "@repo/auth"

import { databaseRepo } from "./index"

export const authAdapter = createLucia(databaseRepo.auth)
