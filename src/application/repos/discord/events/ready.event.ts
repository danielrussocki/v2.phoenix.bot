import { Events } from 'discord.js'
import type { IDiscordClient } from '../dtos/discord.dto'
/* logger */
import { Winston } from '@app/handlers/loggers/winston.logger'

const name = Events.ClientReady
const once = true

function execute(client: IDiscordClient) {
	Winston.info(`ready && logged as [${client.user?.tag}]`)
}

export { name, once, execute }