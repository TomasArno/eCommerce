import { config } from "dotenv";

import args from "./arguments.utils.js";

(() => {
  const { env } = args;
  let path;

  if (env == "production") path = "./.env.prod";
  else if (env == "test") path = "./.env.test";
  else path = "./.env.dev";

  config({ path });
})();
