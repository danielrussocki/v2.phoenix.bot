import { appTournamentController } from '@app/repos/phoenix/controllers/tournament.controller'
/* dtos */
import type { TAutocompleteInteraction } from '@app/repos/discord/dtos/discord.dto'

export const autocomplete = async (interaction: TAutocompleteInteraction) => {
	const focusedValue = interaction.options.getFocused()
	const userId = interaction.member?.user.id || ''
	const tournaments = await appTournamentController.findUserTournaments(userId)
	const filtered = tournaments.filter(tournament => tournament.title.startsWith(focusedValue))
	await interaction.respond(
		filtered.map(choice => ({ name: choice.title, value: String(choice._id) })),
	)
}