import { Command } from "commander";

const args = new Command();

args.option("--env <env>", "environment", "production");

args.parse();

export default args.opts();