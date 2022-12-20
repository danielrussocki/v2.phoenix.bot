import path from 'path'
import fs from 'node:fs'
/* discord */
import { Client, GatewayIntentBits, Collection } from 'discord.js'
import { AppDiscordSettings } from './app.discord.settings'
/* handlers */
import { Winston } from '@app/handlers/loggers/winston.logger'
/* types */
import type { IDiscordClient } from './dtos/discord.dto'
import type { ICommandCollection } from '@app/dtos/command.dto'

class AppDiscordBotService {
	client: IDiscordClient

	constructor() {
		this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] })
		/* events */
		this.loadEvents()
		this.loadCommandCollection()
	}

	async loadCommandCollection() {
		this.client.commands = new Collection()

		const commandPath = path.join(__dirname, '../../../commands')
		const commandFolders = fs.readdirSync(commandPath)

		for (const folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`${commandPath}/${folder}`)
				.filter((file) => file.endsWith('.command.js'))

			for (const file of commandFiles) {
				const filePath = path.join(`${commandPath}/${folder}`, file)
				const { command }: { command: ICommandCollection } = await import(filePath)
				// Set a new item in the Collection with the key as the command name and the value as the exported module
				if ('data' in command && 'execute' in command) {
					this.client.commands.set(command.data.name, command)
				}
				else {
					Winston.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`)
				}
			}
		}
	}

	/* events */
	async loadEvents() {
		const eventsPath = path.join(__dirname, 'events')
		const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.event.js'))

		for (const file of eventFiles) {
			const filePath = path.join(eventsPath, file)
			const event = await import(filePath)
			if (event.once) {
				this.client.once(event.name, (...args) => event.execute(...args))
			}
			else {
				this.client.on(event.name, (...args) => event.execute(...args))
			}
		}
	}

	/* start */
	async start() {
		try {
			this.client.login(AppDiscordSettings.token)
		}
		catch (e) {
			Winston.error(e)
		}
	}
}

export const AppDiscordBot = new AppDiscordBotService()
