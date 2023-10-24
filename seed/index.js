import seedCategory from "./seedCategory.js";
import seedQAndA from "./seedQ&A.js";
import seedUserBot from "./seedBot.js";

export default function startSeeders() {
  seedCategory();
  seedQAndA();
  seedUserBot();
}
