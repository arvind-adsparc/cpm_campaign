import NextCors from "nextjs-cors";
// import moment from "moment";
import { google } from "googleapis";

export default async function handler(req, res) {
  const { method } = req;

  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  // await dbConnect();

  switch (method) {
    case "GET":
      try {
        console.log("getting this far");

        console.log(req.body);

        // const time = moment().format("lll");

        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            client_id: process.env.CLIENT_ID,
            private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(
              /\\n/g,
              "\n"
            ),
          },
          scopes: [
            "https://www.googleapis.com/auth/drive",
            "https://www.googleapis.com/auth/drive.file",
            "https://www.googleapis.com/auth/spreadsheets",
          ],
        });

        const sheets = google.sheets({
          auth,
          version: "v4",
        });

        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: process.env.SPREADSHEET_ID,
          range: "A:L",
        });

        const modifiedData = {
          head: null,
          body: [],
        };

        modifiedData.head = response.data.values[0];

        response.data.values.forEach((info, index) => {
          if (index == 0) {
            modifiedData.head = info;
          } else {
            modifiedData.body.push(info);
          }
        });

        // console.log(modifiedData);

        res.status(201).json({ success: true, data: modifiedData });
      } catch (err) {
        console.log("getting this far 2", err);

        res.status(400).json({ error: err });
      }
      break;
    default:
      console.log("getting this far 3");

      res.status(400).json({ success: false });
      break;
  }
}