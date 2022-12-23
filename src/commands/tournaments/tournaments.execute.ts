/* services */
import { add } from './services/add.service'
import { list } from './services/list.service'
import { sortInit, sort } from './services/sort.service'
import { create } from './services/create.service'
import { remove } from './services/remove.service'
import { confirm } from './services/confirm.service'
import { addPoints } from './services/add-points.service'
import { setPoints } from './services/set-points.service'
import { leaderboard } from './services/leaderboard.service'
import { tournamentDelete } from './services/delete.service'
/* dtos */
import type { User } from 'discord.js'
import type { IExecute } from '@app/dtos/command.dto'

export const execute: IExecute = async (interaction) => {
	if (interaction.options.getSubcommand() === 'create') {
		const title: string = interaction.options.getString('title', true)
		const description: string = interaction.options.getString('description', true)
		const response = await create(title, description)
		return await interaction.reply(response)
	}
	if (interaction.options.getSubcommand() === 'list') {
		const id: string | null = interaction.options.getString('id')
		const confirmed: boolean | null = interaction.options.getBoolean('confirmed')
		const response = await list(id, confirmed, interaction?.client?.users)
		return interaction.reply(response)
	}
	if (interaction.options.getSubcommand() === 'delete') {
		const id: string = interaction.options.getString('id', true)
		const response = await tournamentDelete(id)
		return interaction.reply(response)
	}
	if (interaction.options.getSubcommand() === 'add') {
		const id: string = interaction.options.getString('id', true)
		const user: User = interaction.options.getUser('user', true)
		const response = await add(id, user)
		return interaction.reply(response)
	}
	if (interaction.options.getSubcommand() === 'confirm') {
		const id: string = interaction.options.getString('id', true)
		const user: User = interaction.options.getUser('user', true)
		const response = await confirm(id, user)
		return interaction.reply(response)
	}
	if (interaction.options.getSubcommand() === 'remove') {
		const id: string = interaction.options.getString('id', true)
		const user: User = interaction.options.getUser('user', true)
		const response = await remove(id, user)
		return interaction.reply(response)
	}
	if (interaction.options.getSubcommand() === 'sort') {
		const id: string = interaction.options.getString('id', true)
		const groups: number = interaction.options.getInteger('groups', true)
		await interaction.reply(sortInit())
		const response = await sort(id, groups, interaction.client.users)
		return interaction.editReply(response)
	}
	if (interaction.options.getSubcommand() === 'set-points') {
		const id: string = interaction.options.getString('id', true)
		const user: User = interaction.options.getUser('user', true)
		const points: number = interaction.options.getInteger('points', true)
		const response = await setPoints(id, user, points)
		return interaction.reply(response)
	}
	if (interaction.options.getSubcommand() === 'add-points') {
		const id: string = interaction.options.getString('id', true)
		const user: User = interaction.options.getUser('user', true)
		const points: number = interaction.options.getInteger('points', true)
		const response = await addPoints(id, user, points)
		return interaction.reply(response)
	}
	if (interaction.options.getSubcommand() === 'leaderboard') {
		const id: string = interaction.options.getString('id', true)
		const response = await leaderboard(id)
		return interaction.reply(response)
	}
}
