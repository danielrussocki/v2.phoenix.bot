import type { IDiscordSettings } from './dtos/discord.dto'

export const AppDiscordSettings: Readonly<IDiscordSettings> = {
	prefix: '=',
	token: process.env.DISCORD_BOT_TOKEN || '',
}
