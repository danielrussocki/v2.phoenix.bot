import { model } from '../app.phoenix.repo'
/* schema */
import { AppVoteSchema } from './schema/vote.schema'

AppVoteSchema.static(
	'findOneOrCreate',
	async function findOneOrCreate(condition, doc) {
		try {
			const exists = await this.findOne(condition)
			if (exists) await this.updateOne(condition, doc)
			return exists || (await this.create(doc))
		}
		catch {
			throw new Error('Error fetching Vote')
		}
	},
)

export const AppVoteModel = model('Votes', AppVoteSchema)