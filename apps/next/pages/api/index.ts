import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	name: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
	// let who: string | string[] = 'anonymous'
	// if (req.body && req.body.who) {
	//   who = req.body.who
	// } else if (req.query.who) {
	//   who = req.query.who
	// } else if (req.cookies.who) {
	//   who = req.cookies.who
	// }

	// res.status(200).send(`hi ${who}, what's up?`)
	res.end('Welcome to my API')
}
