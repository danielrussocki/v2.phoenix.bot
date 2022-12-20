import type { CacheType, ChatInputCommandInteraction } from 'discord.js'
import type { SlashCommandBuilder } from '@app/repos/discord/app.discord.builders'
import type { IDiscordClient } from '@app/repos/discord/dtos/discord.dto'

export type IExecute = (interaction: ChatInputCommandInteraction<CacheType> & {
	client: IDiscordClient;
}) => unknown

export interface ICommandCollection {
	data: SlashCommandBuilder
	execute: IExecute
	userSelectMenu?: (i: unknown) => unknown
	autocomplete?: (i: unknown) => unknown
}
