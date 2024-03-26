import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const __filename = fileURLToPath(join(import.meta.url, "../"));
const __dirname = dirname(__filename);

export default __dirname;
