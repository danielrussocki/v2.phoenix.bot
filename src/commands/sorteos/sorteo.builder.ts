import {
	SlashCommandBuilder,
	PermissionFlagsBits,
} from '@app/repos/discord/app.discord.builders'

export const data = new SlashCommandBuilder()
	.setName('sorteo')
	.setDescription('Sorteo de finales Mini Olimpiadas.')
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers)
	.setDMPermission(false)
