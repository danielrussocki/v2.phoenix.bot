import { Schema, Types, Model } from '../../app.phoenix.repo'
/* dtos */
import { ITournament, IUserTournament } from './dtos/tournament.dto'

type TournamentProps = {
	users: Types.DocumentArray<IUserTournament>
}

type UserTournamentType = Model<ITournament, Record<string, unknown>, TournamentProps>

export const AppTournamentSchema = new Schema<ITournament, UserTournamentType>({
	id: { type: String, index: { unique: true } },
	title: { type: String, required: true },
	description: { type: String, required: true },
	active: { type: Boolean, default: true },
	users: [
		new Schema<IUserTournament>({
			id: { type: String, unique: true },
			confirmed: { type: Boolean, default: false },
			points: { type: Number, default: 0 },
		}),
	],
})
