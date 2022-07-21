import jwt from "jsonwebtoken";

export default async function stats(req, res) {
	if (req.method === "POST") {
		console.log({ cookies: req.cookies });

		try {
			const token = req.cookie.token;
			if (!token) {
				res.status(403).send({});
			} else {
				const decoded = jwt.verify(token, process.env.JWT_SECRET);
				console.log({ decoded });
				res.send({ msg: "it works" });
			}
		} catch (error) {
			console.error("Error occured /stats", error);
			res.status(500).send({ done: false, error: error?.message });
		}
	}
}
