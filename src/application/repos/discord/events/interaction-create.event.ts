import { Events } from '../app.discord.builders'
/* handlers */
import { Winston } from '@app/handlers/loggers/winston.logger'
import { AppSimpleErrorResponse } from '@app/handlers/embeds/response.embed'
/* dtos */
import type { TInteraction, TUserSelectMenuInteraction } from '../dtos/discord.dto'

const name = Events.InteractionCreate

async function execute(interaction: TInteraction) {
	if (interaction.isChatInputCommand()) {
		const command = interaction.client?.commands?.get?.(interaction.commandName)

		if (!command) {
			Winston.error(`No command matching ${interaction.commandName} was found.`)
			return
		}

		try {
			return await command.execute(interaction)
		}
		catch (error) {
			Winston.error(`Error executing ${interaction.commandName}`)
			Winston.error(error)
			return await interaction.reply({ embeds: [AppSimpleErrorResponse(String(error))] })
		}
	}
	else if (interaction.isAutocomplete()) {
		const command = interaction.client.commands?.get(interaction.commandName)

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`)
			return
		}

		try {
			await command?.autocomplete?.(interaction)
		}
		catch (error) {
			console.error(error)
		}
	}
	else if (interaction.isUserSelectMenu()) {
		try {
			const commandName = interaction?.message?.interaction?.commandName?.split?.(' ')?.[0]
			if (commandName) {
				const command = interaction.client?.commands?.get?.(commandName)
				if (command && command.userSelectMenu) return await command.userSelectMenu(interaction as TUserSelectMenuInteraction)
				throw new Error('command error')
			}
			throw new Error('commandName error')
		}
		catch (error) {
			return await interaction.reply({ embeds: [AppSimpleErrorResponse(String(error))] })
		}
	}
}

export { name, execute }