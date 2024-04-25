import "dotenv/config"
import express from "express";
import logger from "./utils/logger";
import cors from "cors";

import { router } from "./routes/index.routes";

const port = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true, }));
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(port, async () => {
  logger.info(`Running on port: ${port}`)
});

