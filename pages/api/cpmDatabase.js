import NextCors from "nextjs-cors";
import dbConnect from "../../lib/dbConnect";
import CPMDatabase from "../../models/CPMDatabase";

export default async function handler(req, res) {
  const { method } = req;

  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        console.log("query", req.query);
        const data = await CPMDatabase.find();
        res.status(200).json({ data: data });
      } catch (err) {
        console.log("err", err);
      }
      break;
    case "POST":
      try {
        const entry = await CPMDatabase.create(JSON.parse(req.body));
        res.status(201).json({ success: true, data: entry });
      } catch (err) {
        console.log("getting this far 2", err);

        res.status(400).json({ error: err });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
