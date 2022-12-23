import { AppTournamentModel } from '../models/tournament.model'
/* dtos */
import { ITournament, IUserTournament } from '@app/repos/phoenix/models/schema/dtos/tournament.dto'
import { ObjectId } from 'mongodb'

class AppTournamentController {
	async create(data: ITournament) {
		return await AppTournamentModel.create(data)
	}
	async updateUsers(users: IUserTournament[], id: string) {
		return await AppTournamentModel.findByIdAndUpdate({ _id: id }, { $set: { users } }, { lean: true, new: true })
	}
	async listActive() {
		return await AppTournamentModel.find({ active: true })
	}
	async findUserTournaments(userId: string) {
		return await AppTournamentModel.find({ active: true, users: { $elemMatch: { id: userId } } }, { title: true, description: true })
	}
	async findOneActive(id: string) {
		return await AppTournamentModel.findOne({ _id: id, active: true })
	}
	async findOneActiveAndConfirmed(id: string) {
		return await AppTournamentModel.aggregate<ITournament>([{ $unwind: '$users' }, { $match: { '_id': new ObjectId(id), active: true, 'users.confirmed': true } }, { $group: { _id: '$_id', users: { $push: '$users' } } }])
	}
	async confirm(id: string, userId: string) {
		return await AppTournamentModel.updateOne({ _id: id, 'users.id': userId }, { $set: { 'users.$.confirmed': true } }, { new: true, runValidators: true })
	}
	async setPoints(id: string, userId: string, points: number) {
		return await AppTournamentModel.updateOne({ _id: id, 'users.id': userId }, { $set: { 'users.$.points': points } }, { new: true, runValidators: true })
	}
	async addPoints(id: string, userId: string, points: number) {
		return await AppTournamentModel.updateOne({ _id: id, 'users.id': userId }, { $inc: { 'users.$.points': points } }, { new: true, runValidators: true })
	}
	async leaderboard(id: string) {
		return await AppTournamentModel.aggregate<ITournament>([{ $unwind: '$users' }, { $match: { '_id': new ObjectId(id), active: true, 'users.confirmed': true } }, { $sort: { 'users.points': -1 } }, { $group: { _id: '$_id', users: { $push: '$users' } } }])
	}
	async remove(id: string, userId: string) {
		return await AppTournamentModel.updateOne({ _id: id, 'users.id': userId }, { $pull: { users: { id: userId } } })
	}
	async delete(id: string) {
		return await AppTournamentModel.updateOne({ _id: id }, { active: false })
	}
	async addUser(id: string, user: IUserTournament) {
		const tournament = await AppTournamentModel.findOne({ _id: id })
		if (tournament?.users?.some?.(v => v.id === user.id)) throw new Error('Ya existe')
		return await AppTournamentModel.updateOne({ _id: id, active: true }, { $push: { users: user } })
	}
}

export const appTournamentController = new AppTournamentController()
