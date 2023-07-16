import type { IExecute } from '@app/dtos/command.dto'
import { AppSimpleResponse } from '@app/handlers/embeds/response.embed'
import { randomInt } from 'crypto'

const juegos = ['Stumble Guys', 'UNO (Roblox)', 'Clash Royale', 'Stumble Guys', 'Brawl Stars', 'Crash of Cars']

export const execute: IExecute = async (interaction) => {
	await interaction.reply({
		embeds: [AppSimpleResponse('Generando sorteo...')],
	})

	return await interaction.editReply({
		embeds: [AppSimpleResponse(`El juego elegido es: ${juegos[randomInt(juegos.length)]}`)],
	})
}
