/* controllers */
import { appTournamentController } from '@app/repos/phoenix/controllers/tournament.controller'
/* handlers */
import { AppSimpleResponse } from '@app/handlers/embeds/response.embed'
/* dtos */
import type { TCommandResponse } from '@app/dtos/response.dto'

export async function leaderboard(id: string): Promise<TCommandResponse> {
	const [table] = await appTournamentController.leaderboard(id)
	return {
		embeds: [
			AppSimpleResponse(
				`**Tabla de posiciones:**\n\n${table?.users?.map?.((v, ind) => `${ind + 1}.- <@${v.id}> \`${v.points}pt\``).join('\n')}`,
			),
		],
	}
}
