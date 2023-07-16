import { IPingResponse } from './dtos/sorteo.dto'
/* builder */
import { data } from './sorteo.builder'
import { execute } from './sorteo.execute'

export const command: IPingResponse = {
	data,
	execute,
}