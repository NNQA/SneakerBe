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
app.use(
  cors({
    origin: "https://strong-starlight-e633d6.netlify.app/",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.options("*", cors());
app.use("/api/v1", routeProduct);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("App running");
});
