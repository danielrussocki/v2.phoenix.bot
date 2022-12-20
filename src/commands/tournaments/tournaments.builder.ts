import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ActionRowBuilder,
	UserSelectMenuBuilder,
} from '@app/repos/discord/app.discord.builders'

export const data = new SlashCommandBuilder()
	.setName('tournament')
	.setDescription('tournament management')
	.setNameLocalizations({ 'es-ES': 'torneos' })
	.setDescriptionLocalizations({ 'es-ES': 'Crear, editar, administrar y eliminar torneos' })
	.addSubcommand(
		(subcommand) =>
			subcommand
				.setName('create')
				.setDescription('create tournament')
				.setNameLocalizations({ 'es-ES': 'crear' })
				.setDescriptionLocalizations({ 'es-ES': 'Crear torneo' })
				.addStringOption((option) =>
					option
						.setName('title')
						.setDescription('Tournament title')
						.setNameLocalizations({ 'es-ES': 'titulo' })
						.setDescriptionLocalizations({ 'es-ES': 'Título del torneo' })
						.setRequired(true),
				)
				.addStringOption((option) =>
					option
						.setName('description')
						.setDescription('Tournament description')
						.setNameLocalizations({ 'es-ES': 'descripcion' })
						.setDescriptionLocalizations({ 'es-ES': 'Descripción del torneo' })
						.setRequired(true),
				),
	)
	.addSubcommand(
		(subcommand) =>
			subcommand
				.setName('delete')
				.setDescription('delete tournament')
				.setNameLocalizations({ 'es-ES': 'eliminar' })
				.setDescriptionLocalizations({ 'es-ES': 'Eliminar torneo' })
				.addStringOption((option) =>
					option
						.setName('id')
						.setDescription('Tournament id')
						.setNameLocalizations({ 'es-ES': 'id' })
						.setDescriptionLocalizations({ 'es-ES': 'ID del torneo' })
						.setRequired(true),
				),
	)
	.addSubcommand(
		(subcommand) =>
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
	.addSubcommand(
		(subcommand) =>
			subcommand
				.setName('list')
				.setDescription('list all tournaments')
				.setNameLocalizations({ 'es-ES': 'listar' })
				.setDescriptionLocalizations({ 'es-ES': 'Listar todos los torneos' })
				.addStringOption((option) =>
					option
						.setName('id')
						.setDescription('Tournament id')
						.setNameLocalizations({ 'es-ES': 'id' })
						.setDescriptionLocalizations({ 'es-ES': 'ID del torneo' }),
				)
				.addBooleanOption((option) =>
					option
						.setName('confirmed')
						.setDescription('Show only confirmed members')
						.setNameLocalizations({ 'es-ES': 'confirmados' })
						.setDescriptionLocalizations({ 'es-ES': 'Muestra solo miembros confirmados' }),
				),
	)
	.addSubcommand(
		(subcommand) =>
			subcommand
				.setName('add')
				.setDescription('add user to tournament')
				.setNameLocalizations({ 'es-ES': 'agregar' })
				.setDescriptionLocalizations({ 'es-ES': 'Agregar usuario a torneo' })
				.addStringOption((option) =>
					option
						.setName('id')
						.setDescription('Tournament id')
						.setNameLocalizations({ 'es-ES': 'id' })
						.setDescriptionLocalizations({ 'es-ES': 'ID del torneo' })
						.setRequired(true),
				)
				.addUserOption((option) =>
					option
						.setName('user')
						.setDescription('Tournament user')
						.setNameLocalizations({ 'es-ES': 'usuario' })
						.setDescriptionLocalizations({ 'es-ES': 'usuario del torneo' })
						.setRequired(true),
				),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('register')
			.setDescription('add subcommand')
			.setNameLocalizations({ 'es-ES': 'registrar' })
			.setDescriptionLocalizations({ 'es-ES': 'Registrar subcomando' })
			.addUserOption((option) =>
				option
					.setName('user')
					.setDescription('User to be registered')
					.setNameLocalizations({ 'es-ES': 'usuario' })
					.setDescriptionLocalizations({ 'es-ES': 'Usuario a registrar' })
					.setRequired(true),
			),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('sort')
			.setDescription('sort tournament players')
			.setNameLocalizations({ 'es-ES': 'sortear' })
			.setDescriptionLocalizations({ 'es-ES': 'Sortear en grupos a los participantes' })
			.addStringOption((option) =>
				option
					.setName('id')
					.setDescription('tournament id')
					.setNameLocalizations({ 'es-ES': 'id' })
					.setDescriptionLocalizations({ 'es-ES': 'ID del torneo' })
					.setRequired(true),
			)
			.addIntegerOption((option) =>
				option
					.setName('groups')
					.setDescription('number of tournament groups')
					.setNameLocalizations({ 'es-ES': 'grupos' })
					.setDescriptionLocalizations({ 'es-ES': 'Número de grupos del torneo' })
					.setRequired(true),
			),
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers)
	.setDMPermission(false)


export function getUserMenuRow(customId: string) {
	return new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
		new UserSelectMenuBuilder()
			.setCustomId(customId)
			.setPlaceholder('Agrega los usuarios que van a entrar al torneo')
			.setMinValues(1)
			.setMaxValues(20),
	)
}
