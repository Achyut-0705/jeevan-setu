import { resetDatabase, setMeta } from "./store";
import { ensureSeeded } from "./seed";

resetDatabase();
setMeta("seedVersion", "");
ensureSeeded();
// eslint-disable-next-line no-console
console.log("[db:reset] Database reset and reseeded.");
