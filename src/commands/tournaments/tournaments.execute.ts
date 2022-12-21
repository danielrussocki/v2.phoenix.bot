import { getUserMenuRow } from './tournaments.builder'
/* handlers */
import { AppCustomResponse, AppSimpleResponse } from '@app/handlers/embeds/response.embed'
/* model */
import { appTournamentController } from '@app/repos/phoenix/controllers/tournament.controller'
/* consts */
import { CAppSuccessColor } from '@app/constants/embed.constants'
/* utils */
import { snakeCase } from '@app/utils/string.util'
/* dtos */
import type { IExecute } from '@app/dtos/command.dto'
import type { User } from 'discord.js'
import { appShuffleArray } from '@app/utils/array.util'

export const execute: IExecute = async (interaction) => {
	if (interaction.options.getSubcommand() === 'create') {
		const title: string = interaction.options.getString('title', true)
		const description: string = interaction.options.getString('description', true)
		/* service */
		const tournament = await appTournamentController.create({ id: snakeCase(title), title, description })

		return await interaction.reply({
			embeds: [
				AppCustomResponse({
					color: CAppSuccessColor,
					title: `Torneo ${tournament.title} creado!`,
					description: `El torneo \`${tournament.id}\` se ha creado correctamente.\nDescripción: \`${tournament.description}\``,
				}),
			],
			components: [getUserMenuRow(String(tournament._id))],
		})
	}
	if (interaction.options.getSubcommand() === 'list') {
		const id: string | null = interaction.options.getString('id')
		const confirmed: boolean | null = interaction.options.getBoolean('confirmed')

		if (id) {
			if (confirmed) {
				const [tournament] = await appTournamentController.findOneActiveAndConfirmed(id)
				if (!tournament) throw new Error('No hay usuarios confirmados')
				const description = `Participantes:\n${tournament.users?.map?.((v, i) => `${i + 1}.- <@${v.id}>`)?.join?.('\n')}`
				return await interaction.reply({
					embeds: [
						AppCustomResponse({
							color: CAppSuccessColor,
							title: tournament.title,
							description,
						}),
					],
				})
			}
			const tournament = await appTournamentController.findOneActive(id)
			if (!tournament) throw new Error('Torneo no existe!')
			const description = `Participantes:\n${tournament.users?.map?.((v, i) => `${i + 1}.- <@${v.id}>`)?.join?.('\n')}`
			return await interaction.reply({
				embeds: [
					AppCustomResponse({
						color: CAppSuccessColor,
						title: tournament.title,
						description,
					}),
				],
			})
		}
		/* service */
		const tournaments = await appTournamentController.listActive()
		const description = tournaments.map((v, i) => `${i + 1}.- ${v.title} \`${v._id}\``)

		return await interaction.reply({
			embeds: [
				AppCustomResponse({
					color: CAppSuccessColor,
					title: 'Lista de torneos activos',
					description: description.join('\n'),
				}),
			],
		})
	}
	if (interaction.options.getSubcommand() === 'delete') {
		const id: string = interaction.options.getString('id', true)
		const row = await appTournamentController.delete(id)
		if (!row) throw new Error('Torneo no existe')
		if (row.modifiedCount) return await interaction.reply({ embeds: [AppSimpleResponse('Eliminado correctamente!')] })
		throw new Error('Nada se actualizó')
	}
	if (interaction.options.getSubcommand() === 'add') {
		const id: string = interaction.options.getString('id', true)
		const user: User = interaction.options.getUser('user', true)

		const row = await appTournamentController.addUser(id, { id: user.id })
		if (!row) throw new Error('Usuario no agregado')
		return await interaction.reply({ embeds: [AppSimpleResponse(`Usuario <@${user.id}> agregado correctamente`)] })
	}
	if (interaction.options.getSubcommand() === 'confirm') {
		const id: string = interaction.options.getString('id', true)
		const userId = interaction.member?.user.id || ''
		const row = await appTournamentController.confirm(id, userId)
		if (!row) throw new Error('El usuario no se encuentra en el torneo o el torneo no existe!')
		if (row.modifiedCount) return await interaction.reply({ embeds: [AppSimpleResponse('Usuario confirmado correctamente!')] })
		throw new Error('Nada se actualizó')
	}
	if (interaction.options.getSubcommand() === 'remove') {
		const id: string = interaction.options.getString('id', true)
		const user: User = interaction.options.getUser('user', true)
		const row = await appTournamentController.remove(id, user.id)
		if (!row) throw new Error('El usuario no se encuentra en el torneo o el torneo no existe!')
		if (row.modifiedCount) return await interaction.reply({ embeds: [AppSimpleResponse('Usuario removido correctamente!')] })
		throw new Error('Nada se actualizó')
	}
	if (interaction.options.getSubcommand() === 'sort') {
		const id: string = interaction.options.getString('id', true)
		const groups: number = interaction.options.getInteger('groups', true)
		const tournament = await appTournamentController.findOneActive(id)
		const tournamentCopy = appShuffleArray(tournament?.users || [])
		const count: number = tournamentCopy?.length || 0

		await interaction.reply({ embeds: [AppSimpleResponse('Generando grupos...')] })

		const generated: Array<Array<string | undefined>> = []
		for (let i = 0; i < groups; i++) {
			generated.push([])
		}

		let index = 0
		for (let i = 0; i < count; i++) {
			const userStr = tournamentCopy?.[i]?.id
			const userData = await interaction?.client?.users?.fetch?.(userStr || '')
			generated[index].push(`• <@${userStr}> - \`${userData.username}\``)
			if (index < groups - 1) ++index
			else index = 0
		}

		const description = generated?.map?.((v) => v?.map?.((vi) => vi)?.join?.('\n')).join('\n\n')

		return interaction.editReply({
			embeds: [
				AppCustomResponse({
					color: CAppSuccessColor,
					title: 'Grupos',
					description,
				}),
			],
		})
		// let timer_counter = 1
		// const MINUTOS = 2.5
		// for (let i = 0; i < GUYS_PER_GROUP; i++) {
		// 	for (let j = 0; j < GROUPS_QUANTITY; j++) {
		// 		(function() {
		// 			setTimeout(() => {
		// 				const rnd_nmb = Math.floor(Math.random() * arr.length)
		// 				const rnd_usr = arr[rnd_nmb]
		// 				groups[j][i] = `${colors[j]} <@${rnd_usr.id}>\n`
		// 				arr.splice(rnd_nmb, 1)
		// 				exampleEmbed = update_embed(groups)
		// 				msg.edit({
		// 					files: [my_icon, tournament_icon],
		// 					embed: exampleEmbed,
		// 				})
		// 			}, timer_counter * (MINUTOS * 60000))
		// 		})(j)
		// 		++timer_counter
		// 	}
		// }
	}
}
