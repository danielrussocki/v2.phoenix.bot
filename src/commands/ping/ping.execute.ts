import type { IExecute } from '@app/dtos/command.dto'
import { AppSimpleResponse } from '@app/handlers/embeds/response.embed'

export const execute: IExecute = async (interaction) => {
	const sent = await interaction.reply({
		embeds: [AppSimpleResponse(`Websocket heartbeat: \`${interaction.client.ws.ping}ms\`.`)],
		fetchReply: true,
	})
	return await interaction.editReply({
		embeds: [
			AppSimpleResponse(
				`Websocket heartbeat: \`${interaction.client.ws.ping}ms.\`\nRoundtrip latency: \`${
					sent.createdTimestamp - interaction.createdTimestamp
				}ms\`.`,
			),
		],
	})
}
