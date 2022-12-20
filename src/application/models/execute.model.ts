export class AppExecute<T> {
	public response?: T

	constructor(init?: Partial<AppExecute<T>>) {
		Object.assign(this, init)
	}
}