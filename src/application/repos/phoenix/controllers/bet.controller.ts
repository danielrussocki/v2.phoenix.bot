import { AppBetModel } from '../models/bet.model'
import { AppVoteModel } from '../models/vote.mode'
/* dtos */
import { IBet } from '@app/repos/phoenix/models/schema/dtos/bet.dto'

class AppBetController {
	async create(data: IBet) {
		return await AppBetModel.create(data)
	}
	async createMany([...bets]: [IBet]) {
		return AppBetModel.insertMany(bets, {
			ordered: false,
		})
	}
	async close(id: number) {
		return await AppBetModel.findOneAndUpdate(
			{ id, active: true },
			{ active: false },
		)
	}
	async setAnswer(id: number, option: number) {
		const bet = await AppBetModel.findOne({ id })
		if (!bet) throw new Error('La apuesta no existe!')
		const optionsLength = bet.options.length || 0

		if (optionsLength <= 0) throw new Error('La apuesta no tiene opciones')
		const selectedOption = option - 1

		if (selectedOption < 0 || selectedOption >= optionsLength) {
			throw new Error('Esa opción no es válida.')
		}

		if (bet.active) {
			throw new Error(
				'Esa apuesta aún está abierta y no puede ser modificada.',
			)
		}

		return await AppBetModel.updateOne({ id }, { winnerOption: bet.options[selectedOption] })
	}
	async getVotes(pollId: number) {
		return await AppVoteModel.find({ pollId })
	}
	async getActiveBets() {
		return await AppBetModel.find({ active: true })
	}
	async getActiveBet(id: number) {
		return await AppBetModel.findOne({ id, active: true })
	}
	async getInactiveBet(id: number) {
		return await AppBetModel.findOne({ id, active: false })
	}
	async getBet(id: number) {
		return await AppBetModel.findOne({ id })
	}
	async getAllBets() {
		return await AppBetModel.find({}).sort({ id: 1 })
	}
}

export const appBetController = new AppBetController()