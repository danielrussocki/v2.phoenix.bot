import { SlashCommandBuilder } from '@app/repos/discord/app.discord.builders'

export const data = new SlashCommandBuilder()
	.setName('assistance')
	.setDescription('assistance about events, tournaments, etc')
	.setNameLocalizations({ 'es-ES': 'asistencia' })
	.setDescriptionLocalizations({ 'es-ES': 'Asistencia sobre eventos, torneos, etc' })
	.addSubcommand((subcommand) =>
		subcommand
			.setName('confirm')
			.setDescription('confirm participation')
			.setNameLocalizations({ 'es-ES': 'confirmar' })
			.setDescriptionLocalizations({ 'es-ES': 'confirmar particiáción' })
			.addStringOption((option) =>
				option
					.setName('id')
					.setDescription('Tournament id')
					.setNameLocalizations({ 'es-ES': 'id' })
					.setDescriptionLocalizations({ 'es-ES': 'ID del torneo' })
					.setAutocomplete(true)
					.setRequired(true),
			),
	)
