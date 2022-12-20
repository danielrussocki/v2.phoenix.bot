/* handlers */
import { AppSimpleResponse } from '@app/handlers/embeds/response.embed'
/* model */
import { appTournamentController } from '@app/repos/phoenix/controllers/tournament.controller'
/* dtos */
import type { IExecute } from '@app/dtos/command.dto'

export const execute: IExecute = async (interaction) => {
	if (interaction.options.getSubcommand() === 'confirm') {
		const id: string = interaction.options.getString('id', true)
		const userId = interaction.member?.user.id || ''
		const row = await appTournamentController.confirm(id, userId)
		if (!row) throw new Error('El usuario no se encuentra en el torneo o el torneo no existe!')
		if (row.modifiedCount) return await interaction.reply({ embeds: [AppSimpleResponse('Usuario confirmado correctamente!')] })
		throw new Error('Nada se actualizó')
	}
}
