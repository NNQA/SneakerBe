import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import connectToDatabase from "./mongodb.js";
import routeProduct from "./routes/product.js";
const app = Express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
connectToDatabase();
const allowedOrigins = ["https://strong-starlight-e633d6.netlify.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/api/v1", routeProduct);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("App running");
});
