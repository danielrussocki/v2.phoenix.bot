/* controllers */
import { appTournamentController } from '@app/repos/phoenix/controllers/tournament.controller'
/* handlers */
import { AppCustomResponse, AppSimpleResponse } from '@app/handlers/embeds/response.embed'
/* consts */
import { CAppSuccessColor } from '@app/constants/embed.constants'
/* utils */
import { appShuffleArray } from '@app/utils/array.util'
/* dtos */
import type { UserManager } from 'discord.js'
import type { TCommandResponse } from '@app/dtos/response.dto'

export function sortInit(): TCommandResponse {
	return { embeds: [AppSimpleResponse('Generando grupos...')] }
}

export async function sort(id: string, groups: number, users: UserManager | undefined): Promise<TCommandResponse> {
	const generated: Array<Array<string | undefined>> = []
	const [tournament] = await appTournamentController.findOneActiveAndConfirmed(id)
	const tournamentCopy = appShuffleArray(tournament?.users || [])
	const count: number = tournamentCopy?.length || 0
	for (let i = 0; i < groups; i++) {
		generated.push([])
	}

	let index = 0
	for (let i = 0; i < count; i++) {
		const userStr = tournamentCopy?.[i]?.id
		const userData = await users?.fetch?.(userStr || '')
		generated[index].push(`• <@${userStr}> - \`${userData?.username}\``)
		if (index < groups - 1) ++index
		else index = 0
	}

	const description = generated?.map?.((v) => v?.map?.((vi) => vi)?.join?.('\n')).join('\n\n')

	return {
		embeds: [
			AppCustomResponse({
				color: CAppSuccessColor,
				title: 'Grupos',
				description,
			}),
		],
	}
}