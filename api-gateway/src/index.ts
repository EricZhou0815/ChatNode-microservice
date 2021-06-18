import "reflect-metadata"
import config from "config"

import accessEnv from "#root/helpers/accessEnv"
import { App } from "#root/server/App"

const PORT = parseInt(accessEnv("PORT", <string>config.get("PORT")), 10)

const server = new App().app
server.listen(PORT, "0.0.0.0", () => { console.info(`Api gateway listening on ${PORT}...`) })