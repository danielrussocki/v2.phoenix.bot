import { SlashCommandBuilder } from '@app/repos/discord/app.discord.builders'

export const data = new SlashCommandBuilder()
	.setName('announcements')
	.setDescription('Command for announcements creation')
	.setNameLocalizations({
		'es-ES': 'anuncios',
	})
	.setDescriptionLocalizations({
		'es-ES': 'Comando para la creación de anuncios',
	})
	.addStringOption((option) =>
		option
			.setName('content')
			.setDescription('Announcement content')
			.setNameLocalizations({ 'es-ES': 'contenido' })
			.setDescriptionLocalizations({ 'es-ES': 'Contenido del anuncio' })
			.setRequired(true),
	)
	.addStringOption((option) =>
		option
			.setName('title')
			.setDescription('Announcement title')
			.setNameLocalizations({ 'es-ES': 'título' })
			.setDescriptionLocalizations({ 'es-ES': 'Título del anuncio' }),
	)
	.addChannelOption((option) =>
		option
			.setName('channel')
			.setDescription('Announcement channel')
			.setNameLocalizations({ 'es-ES': 'canal' })
			.setDescriptionLocalizations({ 'es-ES': 'Canal a donde se enviará el anuncio' }),
	)
