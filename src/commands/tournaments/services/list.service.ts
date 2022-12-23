/* controllers */
import { appTournamentController } from '@app/repos/phoenix/controllers/tournament.controller'
/* handlers */
import { AppCustomResponse } from '@app/handlers/embeds/response.embed'
/* consts */
import { CAppSuccessColor } from '@app/constants/embed.constants'
import { TCommandResponse } from '@app/dtos/response.dto'
/* dtos */
import type { UserManager } from 'discord.js'

export async function list(id: string | null, confirmed: boolean | null, users: UserManager | undefined): Promise<TCommandResponse> {
	if (id) {
		if (confirmed) {
			const [tournament] = await appTournamentController.findOneActiveAndConfirmed(id)
			if (!tournament) throw new Error('No hay usuarios confirmados')
			const usersList = await Promise.all(
				tournament.users?.map?.(async (v, i) => {
					const user = await users?.fetch?.(v.id || '')
					return `${i + 1}.- <@${v.id}> - \`${user?.username}\``
				}) || '',
			)
			const description = `Participantes:\n${usersList.join('\n')}`
			return {
				embeds: [
					AppCustomResponse({
						color: CAppSuccessColor,
						title: tournament.title,
						description,
					}),
				],
			}
		}
		const tournament = await appTournamentController.findOneActive(id)
		if (!tournament) throw new Error('Torneo no existe!')
		const description = `Participantes:\n${tournament.users?.map?.((v, i) => `${i + 1}.- <@${v.id}>`)?.join?.('\n')}`
		return {
			embeds: [
				AppCustomResponse({
					color: CAppSuccessColor,
					title: tournament.title,
					description,
				}),
			],
		}
	}
	/* service */
	const tournaments = await appTournamentController.listActive()
	const description = tournaments.map((v, i) => `${i + 1}.- ${v.title} \`${v._id}\``)

	return {
		embeds: [
			AppCustomResponse({
				color: CAppSuccessColor,
				title: 'Lista de torneos activos',
				description: description.join('\n'),
			}),
		],
	}
}