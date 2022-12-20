import type { SlashCommandBuilder } from 'discord.js'
import type { TJSONEmbedResponse } from './dtos/embed.dto'

export function AppCooldownResponse(command: SlashCommandBuilder, timeLeft: number): TJSONEmbedResponse {
	return {
		color: 0xfee75c,
		description: `Puedes volver a usar el comando \`${command.name}\` dentro de ${timeLeft.toFixed(
			1,
		)} segundo(s).`,
	}
}