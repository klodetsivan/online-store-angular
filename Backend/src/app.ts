import express from "express";
import appConfig from "./2-utils/app-config";
import dal from "./2-utils/dal";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import productsController from "./6-controllers/products-controller";


dal.connect();

const server = express();

server.use(express.json());
server.use("/api", productsController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));

