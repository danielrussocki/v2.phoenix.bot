/* controllers */
import { appTournamentController } from '@app/repos/phoenix/controllers/tournament.controller'
/* builders */
import { getUserMenuRow } from '../tournaments.builder'
/* handlers */
import { AppCustomResponse } from '@app/handlers/embeds/response.embed'
/* consts */
import { CAppSuccessColor } from '@app/constants/embed.constants'
/* utils */
import { snakeCase } from '@app/utils/string.util'
/* dtos */
import type { TCommandResponse } from '@app/dtos/response.dto'

export async function create(title: string, description: string): Promise<TCommandResponse> {
	const tournament = await appTournamentController.create({ id: snakeCase(title), title, description })
	return {
		embeds: [
			AppCustomResponse({
				color: CAppSuccessColor,
				title: `Torneo ${tournament.title} creado!`,
				description: `El torneo \`${tournament.id}\` se ha creado correctamente.\nDescripción: \`${tournament.description}\``,
			}),
		],
		components: [getUserMenuRow(String(tournament._id))],
	}
}