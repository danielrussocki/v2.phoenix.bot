/* handlers */
import { AppSimpleResponse } from '@app/handlers/embeds/response.embed'
/* model */
import { appTournamentController } from '@app/repos/phoenix/controllers/tournament.controller'
/* dtos */
import type { TUserSelectMenuInteraction } from '@app/repos/discord/dtos/discord.dto'
import type { IUserTournament } from '@app/repos/phoenix/models/schema/dtos/tournament.dto'

export const userSelectMenu = async (interaction: TUserSelectMenuInteraction) => {
	const { values, customId } = interaction
	const users: IUserTournament[] = values.map((v) => ({ id: v }))
	const people = await appTournamentController.updateUsers(users, customId)
	return await interaction.update({
		embeds: [AppSimpleResponse(`Se agregaron a los usuarios ${people?.users?.map?.((v) => `<@${v.id}>`)?.join?.(',')}.\n No te preocupes, puedes cambiar esto más tarde.`)],
		components: [],
	})
}
