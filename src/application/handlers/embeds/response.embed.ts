import type { TJSONEmbedResponse } from './dtos/embed.dto'

export function AppSimpleResponse(description: string | undefined): TJSONEmbedResponse {
	return {
		color: 0x1ac9c9,
		description,
	}
}

export function AppCustomResponse(args: TJSONEmbedResponse): TJSONEmbedResponse {
	return args
}

export function AppSimpleErrorResponse(description: string | undefined): TJSONEmbedResponse {
	return {
		color: 0xe74c3c,
		description,
	}
}