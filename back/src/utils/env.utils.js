import { config } from "dotenv";

import args from "./arguments.utils.js";

const setEnvironmentVariables = () => {
    const { env } = args;
    let path

    if (env == "production") path = "./.env.prod"
    else if (env == "dev") path = "./.env.dev"
    else path = "./.env.test"

    config({ path });
}


setEnvironmentVariables()