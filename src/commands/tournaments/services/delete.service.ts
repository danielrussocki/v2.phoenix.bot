/* controllers */
import { appTournamentController } from '@app/repos/phoenix/controllers/tournament.controller'
/* handlers */
import { AppSimpleResponse } from '@app/handlers/embeds/response.embed'
/* dtos */
import type { TCommandResponse } from '@app/dtos/response.dto'

export async function tournamentDelete(id: string): Promise<TCommandResponse> {
	const row = await appTournamentController.delete(id)
	if (!row) throw new Error('Torneo no existe')
	if (row.modifiedCount) return { embeds: [AppSimpleResponse('Eliminado correctamente!')] }
	throw new Error('Nada se actualizó')
}