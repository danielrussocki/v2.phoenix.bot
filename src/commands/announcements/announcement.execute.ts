import type { IExecute } from '@app/dtos/command.dto'
import { AppCustomResponse, AppSimpleResponse } from '@app/handlers/embeds/response.embed'
import { AttachmentBuilder, TextChannel } from '@app/repos/discord/app.discord.builders'

export const execute: IExecute = async (interaction) => {
	const title: string | null = interaction.options.getString('title')
	const description: string = interaction.options.getString('content', true)
	const channel = interaction.options.getChannel('channel')
	const icon = new AttachmentBuilder('./src/application/assets/images/phoenix-background.png')
	const image = new AttachmentBuilder('./src/application/assets/images/trophy.png')

	if (channel) {
		const channelResponse = interaction.client.channels.cache.get(channel.id) as TextChannel
		await channelResponse.send({
			embeds: [
				AppCustomResponse({
					color: 0xffa500,
					...(title && { title }),
					...(description && { description }),
					author: { name: 'Phoenix | México', icon_url: 'attachment://phoenix-background.png' },
					thumbnail: { url: 'attachment://trophy.png' },
				}),
			],
			files: [icon, image],
		})

		return await interaction.reply({
			embeds: [
				AppSimpleResponse('Anuncio enviado correctamente'),
			],
		})
	}

	return await interaction.reply({
		embeds: [
			AppCustomResponse({
				color: 0xffa500,
				...(title && { title }),
				...(description && { description }),
				author: { name: 'Phoenix | México', icon_url: 'attachment://phoenix-background.png' },
				thumbnail: { url: 'attachment://trophy.png' },
			}),
		],
		files: [icon, image],
	})
}
