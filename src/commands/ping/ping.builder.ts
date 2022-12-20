import { SlashCommandBuilder } from '@app/repos/discord/app.discord.builders'

export const data = new SlashCommandBuilder().setName('ping').setDescription('Replies with client info.')
