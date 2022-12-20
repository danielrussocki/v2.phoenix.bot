import type { SlashCommandBuilder } from '@app/repos/discord/app.discord.builders'
import type { IExecute } from '@app/dtos/command.dto'

export interface IPingResponse {
	data: SlashCommandBuilder
	execute: IExecute
}
