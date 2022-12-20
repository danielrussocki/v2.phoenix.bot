export interface IBet {
  id: number
	name: string
	options: [string]
	description: string
	winnerOption?: string
	active: boolean
}