/* controllers */
import { appTournamentController } from '@app/repos/phoenix/controllers/tournament.controller'
/* handlers */
import { AppSimpleResponse } from '@app/handlers/embeds/response.embed'
/* dtos */
import type { User } from 'discord.js'
import type { TCommandResponse } from '@app/dtos/response.dto'

export async function add(id: string, user: User): Promise<TCommandResponse> {
	const row = await appTournamentController.addUser(id, { id: user.id })
	if (!row) throw new Error('Usuario no agregado')
	return { embeds: [AppSimpleResponse(`Usuario <@${user.id}> agregado correctamente`)] }
}