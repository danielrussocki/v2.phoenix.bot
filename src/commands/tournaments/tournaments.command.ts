/* builder */
import { data } from './tournaments.builder'
import { execute } from './tournaments.execute'
import { userSelectMenu } from './tournaments.user-select-menu'
import { autocomplete } from './tournaments.autocomplete'

export const command = {
	data,
	execute,
	userSelectMenu,
	autocomplete,
}