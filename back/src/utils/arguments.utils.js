import { Command } from "commander";

const args = new Command();

args.option("--env <env>", "environment", "development");

args.parse();

export default args.opts();