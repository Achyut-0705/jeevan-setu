import { familyContactsTable } from "../db/repo";
import type { RecommenderContext } from "./recommender";

export function buildRecommenderContext(userId: string): RecommenderContext {
  return {
    hasCamera: true,
    hasMic: true,
    hasFamilyContact: familyContactsTable.findBy("userId", userId).some((f) => f.canAttest),
  };
}
