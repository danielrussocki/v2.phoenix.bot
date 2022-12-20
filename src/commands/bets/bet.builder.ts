import { SlashCommandBuilder } from '@app/repos/discord/app.discord.builders'

/* command data */
const data = new SlashCommandBuilder()
/* basic command data */
data.setName('bets')
data.setDescription('Lista de apuestas activas')
/* command config */
// (add cooldown, permissions & maybe usage)
// ...
/* subcommands data */
data.addSubcommand((subcommand) =>
	subcommand.setName('all').setDescription('Obtener todas las apuestas (activas e inactivas)'),
)
data.addSubcommand((subcommand) =>
	subcommand.setName('active').setDescription('Obtener las apuestas activas'),
)
data.addSubcommand((subcommand) =>
	subcommand
		.setName('get')
		.setDescription('Obtener información de una apuesta')
		.addIntegerOption((option) =>
			option.setName('id').setDescription('Escribe el ID de la apuesta que deseas ver').setRequired(true),
		),
)
data.addSubcommand((subcommand) =>
	subcommand
		.setName('close')
		.setDescription('Cerrar una apuesta')
		.addIntegerOption((option) =>
			option.setName('id').setDescription('Escribe el ID de la apuesta que deseas cerrar').setRequired(true),
		),
)
data.addSubcommand((subcommand) =>
	subcommand
		.setName('votes')
		.setDescription('Ver los votos de una apuesta')
		.addIntegerOption((option) =>
			option.setName('id').setDescription('Escribe el ID de la apuesta que deseas ver sus votos').setRequired(true),
		),
)
data.addSubcommand((subcommand) =>
	subcommand
		.setName('winners')
		.setDescription('Ver los ganadores de una apuesta')
		.addIntegerOption((option) =>
			option.setName('id').setDescription('Escribe el ID de la apuesta que deseas ver sus ganadores').setRequired(true),
		),
)
data.addSubcommand((subcommand) =>
	subcommand
		.setName('losers')
		.setDescription('Ver los perdedores de una apuesta')
		.addIntegerOption((option) =>
			option
				.setName('id')
				.setDescription('Escribe el ID de la apuesta que deseas ver sus perdedores')
				.setRequired(true),
		),
)

export { data }