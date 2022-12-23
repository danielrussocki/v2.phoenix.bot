/* controllers */
import { appTournamentController } from '@app/repos/phoenix/controllers/tournament.controller'
/* handlers */
import { AppSimpleResponse } from '@app/handlers/embeds/response.embed'
/* dtos */
import type { User } from 'discord.js'
import type { TCommandResponse } from '@app/dtos/response.dto'

export async function remove(id: string, user: User): Promise<TCommandResponse> {
	const row = await appTournamentController.remove(id, user.id)
	if (!row) throw new Error('El usuario no se encuentra en el torneo o el torneo no existe!')
	if (row.modifiedCount) return { embeds: [AppSimpleResponse('Usuario removido correctamente!')] }
	throw new Error('Nada se actualizó')
}