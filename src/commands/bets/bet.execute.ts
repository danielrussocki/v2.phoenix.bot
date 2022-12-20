import type { IExecute } from '@app/dtos/command.dto'
import { TJSONEmbedResponse } from '@app/handlers/embeds/dtos/embed.dto'
import { AppSimpleErrorResponse, AppSimpleResponse } from '@app/handlers/embeds/response.embed'
/* controller */
import { appBetController } from '@app/repos/phoenix/controllers/bet.controller'
import { IBet } from '@app/repos/phoenix/models/schema/dtos/bet.dto'
import { IVote } from '@app/repos/phoenix/models/schema/dtos/vote.dto'

const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

export const execute: IExecute = async (interaction) => {
	if (interaction.options.getSubcommand() === 'all') {
		const bets = <Array<IBet>> await appBetController.getAllBets()
		return await interaction.reply({
			embeds: [list('Lista de todas las apuestas', bets)],
		})
	}
	if (interaction.options.getSubcommand() === 'active') {
		const bets = <Array<IBet>> await appBetController.getActiveBets()
		if (!bets) throw new Error('No hay apuestas activas en este momento.')
		return await interaction.reply({
			embeds: [list('Lista de apuestas activas', bets)],
		})
	}
	if (interaction.options.getSubcommand() === 'get') {
		const id: number = interaction.options.getInteger('id') || 0
		const bet = <IBet> await appBetController.getActiveBet(id)
		if (!bet) throw new Error('La apuesta ya está cerrada o no existe')
		const message = await interaction.reply({
			embeds: [getBetDetails(`Apuesta #${bet.id}`, bet)],
			fetchReply: true,
		})

		try {
			for (let i = 0; i < emojis.length && i < bet.options.length; i++) {
				await message.react(emojis[i])
			}
		}
		catch {
			return interaction.reply({ embeds: [AppSimpleErrorResponse('Fallaron las reacciones')] })
		}
	}
	if (interaction.options.getSubcommand() === 'close') {
		const id: number = interaction.options.getInteger('id') || 0
		const bet = <IBet> await appBetController.close(id)
		if (!bet) throw new Error('La apuesta ya está cerrada o no existe')
		return await interaction.reply({
			embeds: [AppSimpleResponse(`Se cerró la apuesta número #${bet.id}`)],
		})
	}
	if (interaction.options.getSubcommand() === 'votes') {
		const id: number = interaction.options.getInteger('id') || 0
		const bet = <IBet> await appBetController.getBet(id)
		if (!bet) throw new Error('La apuesta no existe')
		const votes = await appBetController.getVotes(id)
		if (!votes) throw new Error('La apuesta no tiene votos')
		return await interaction.reply({
			embeds: [getVotesDetails(`Apuesta #${id}`, bet, votes)],
		})
	}
}

function list(title: string, bets: Array<IBet>): TJSONEmbedResponse {
	const description = bets.map((v) => `${v.id}.- \`${v.name}\``).join('\n')

	return {
		color: 0x1abc9c,
		title,
		description,
	}
}

function getBetDetails(title: string, bet: IBet): TJSONEmbedResponse {
	const formattedOpts = bet.options.map((v, i) => `${i + 1}.- \`${v}\``).join('\n')

	return {
		color: 0x1abc9c,
		title,
		description: `Título:\n\`${bet.name}\`\n\nDescripción:\n\`${bet.description}\`\n\nOpciones:\n${formattedOpts}`,
		footer: {
			text: 'Reacciona en la sección de abajo para asignar tu apuesta.',
		},
	}
}

function getVotesDetails(title: string, bet: IBet, votes: Array<IVote>) {
	const descriptionOne = `Título:\n\`${bet.name}\`\n\nDescripción:\n\`${bet.description}\`\n\n`
	const options = bet.options

	votes.forEach((value) => {
		value
	})

	const filteredVotes = votes.map((v, i) => {
		return votes.filter((vt) => vt.answer === options.indexOf(emojis[i]))
	})

	const barSize = 10
	const totalVotes = votes.length
	const percentBarsValues = filteredVotes.map((v) => (v.length * 1000) / totalVotes)

	const barLength = '▒'.repeat(barSize)
	const percentBars = percentBarsValues.map((item) => '█'.repeat(Math.round((item * barSize) / totalVotes)))
	const barStrings = percentBars.map((v) => `${barLength.slice(0, barSize - v.length)} ${percentBars ? 0 : percentBars}%`)


	const description = `${descriptionOne}${bet.options}\n${barStrings}`

	return {
		color: 0x1abc9c,
		title,
		description,
		footer: {
			text: `Número total de votos: ${totalVotes}`,
		},
	}
}