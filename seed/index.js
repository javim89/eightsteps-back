import seedCategory from "./seedCategory.js";
import seedQAndA from "./seedQ&A.js";

export default function startSeeders() {
  seedCategory();
  seedQAndA();
}
