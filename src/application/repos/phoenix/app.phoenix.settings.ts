export const AppPhoenixSettings = {
	server: process.env.PHOENIX_DB_SERVER || '',
	username: process.env.PHOENIX_DB_USERNAME || '',
	password: process.env.PHOENIX_DB_PASSWORD || '',
	database: process.env.PHOENIX_DB_DATABASE || '',
	retryWrites: true,
	w: 'majority',
}