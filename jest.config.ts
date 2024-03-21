import { Config } from "jest"

const defaults: Config = {
  preset: "ts-jest",
  testEnvironment: "node"
}
const config: Config = {
  projects: [
    {
      displayName: "web-app",
      testMatch: ["<rootDir>/packages/web-app/**/*.test.ts"]
    },
    {
      displayName: "domain",
      testMatch: ["<rootDir>/packages/domain/**/*.test.ts"]
    },
    {
      displayName: "database",
      testMatch: ["<rootDir>/packages/adapters/drizzle-database/**/*.test.ts"],
      runner: "jest-serial-runner"
    }
  ].map((projectConfig) => ({ ...defaults, ...projectConfig }))
}

export default config
