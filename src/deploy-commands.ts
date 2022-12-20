import * as dotenv from 'dotenv'
import 'module-alias/register'
/* init env variables */
dotenv.config()

import { REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js'
import fs from 'node:fs'
import path from 'path'
/* handlers */
import { Winston } from '@app/handlers/loggers/winston.logger'
/* types */
import type { ICommandCollection } from './application/dtos/command.dto'

const token: string = process.env.DISCORD_BOT_TOKEN || ''
const clientId: string = process.env.DEV_CLIENT_ID || ''
// const guildId = process.env.DEV_GUILD_ID || ''

const commands: Array<RESTPostAPIApplicationCommandsJSONBody> = []
const commandPath = path.resolve(__dirname, './commands')
const commandFolders = fs.readdirSync(commandPath);

// and deploy your commands!
(async () => {
	try {
		for (const folder of commandFolders) {
			// Grab all the command files from the commands directory you created earlier
			const commandFiles = fs.readdirSync(`${commandPath}/${folder}`).filter(file => file.endsWith('.command.js'))
			// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
			for (const file of commandFiles) {
				const { command }: { command: ICommandCollection } = await import(`${commandPath}/${folder}/${file}`)
				commands.push(command.data.toJSON())
			}
		}

		const rest = new REST({ version: '10' }).setToken(token)

		Winston.info(`Started refreshing ${commands.length} application (/) commands.`)

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = <Array<unknown>> await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		)

		Winston.info(`Successfully reloaded ${data.length} application (/) commands.`)
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		Winston.error(error)
	}
})()