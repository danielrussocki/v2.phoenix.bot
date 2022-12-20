import type { AutocompleteInteraction, CacheType, Client, Collection, Interaction, UserSelectMenuInteraction } from 'discord.js'
import type { ICommandCollection } from '@app/dtos/command.dto'

export interface IDiscordSettings {
	readonly prefix: string
	readonly token: string | undefined
}

export interface IDiscordClient extends Client<boolean> {
	commands?: Collection<string, ICommandCollection>
}

export type TUserSelectMenuInteraction = UserSelectMenuInteraction<CacheType> & {
	client: IDiscordClient
}

export type TAutocompleteInteraction = AutocompleteInteraction<CacheType> & {
	client: IDiscordClient
}

export type TInteraction = Interaction<CacheType> & {
	client: IDiscordClient
}
