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

        const {
          inventoryType,
          gamingInventoryType,
          categories,
          adFormat,
          audienceCost,
          richMedia,
        } = req.query;
        let data;

        if (inventoryType && inventoryType !== "All") {
          data = await CPMDatabase.find({ inventoryType });
        } else {
          data = await CPMDatabase.find();
        }

        const getOtherData = async () => {
          if (gamingInventoryType && gamingInventoryType !== "All") {
            data = await data.filter(
              (info) => info.gamingInventoryType === gamingInventoryType
            );
          }

          if (categories && categories !== "All") {
            const categoriesArr = categories.split(",");
            data = await data.filter((info) =>
              categoriesArr.includes(info.categories)
            );
          }

          if (adFormat && adFormat !== "All") {
            const adFormatArr = adFormat.split(",");
            data = await data.filter((info) =>
              adFormatArr.includes(info.adFormat)
            );
          }

          // if (inventoryType !== "All") {

          // }

          let audienceMargin = (10 / 100) * audienceCost;

          let richMediaCost = richMedia === "Yes" ? 0.5 : 0;

          // let totalCPM = audienceCost + audienceMargin + richMediaCost;
        };

        await getOtherData();
        res.status(200).json({ length: data.length, data: data });
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
