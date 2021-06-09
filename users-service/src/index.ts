import "reflect-metadata"

import accessEnv from "#root/helpers/accessEnv"
import { initConnection } from "#root/db/connection"
import { App } from "#root/server/App"

const PORT = parseInt(accessEnv("PORT", "7101"), 10)

initConnection().then(() => {
	// app must be initiated after connection initated
	const app = new App().app
	app.listen(PORT, "0.0.0.0", () => { console.info(`Users service listening on ${PORT}...`) })
})

