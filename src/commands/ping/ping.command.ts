import { IPingResponse } from './dtos/ping.dto'
/* builder */
import { data } from './ping.builder'
import { execute } from './ping.execute'

export const command: IPingResponse = {
	data,
	execute,
}