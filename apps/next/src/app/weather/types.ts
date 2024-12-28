export type Condition =
	| 'Clear'
	| 'Partly cloudy'
	| 'Cloudy'
	| 'Overcast'
	| 'Mist'
	| 'Fog'
	| 'Drizzle'
	| 'Rain'
	| 'Thunderstorms'
	| 'Snow'
	| 'Hail'
	| 'Sleet'
	| 'Tornado'
	| 'Hurricane'
	| 'Blizzard'
	| 'Dust'
	| 'Sand'
	| 'Volcanic ash'

export type Data = {
	location: {
		name: string
	}
	current: {
		temp_f: number
		temp_c: number
		condition: {
			text: Condition
		}
	}
}
