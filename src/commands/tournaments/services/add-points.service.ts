/* controllers */
import { appTournamentController } from '@app/repos/phoenix/controllers/tournament.controller'
/* handlers */
import { AppSimpleResponse } from '@app/handlers/embeds/response.embed'
/* dtos */
import type { TCommandResponse } from '@app/dtos/response.dto'
import type { User } from 'discord.js'

export async function addPoints(id: string, user: User, points: number): Promise<TCommandResponse> {
	await appTournamentController.addPoints(id, user.id, points)
	return { embeds: [AppSimpleResponse(`Puntos añadidos al usuario <@${user.id}>`)] }
}