import seedCategory from "./seedCategory.js";
import seedQAndA from "./seedQ&A.js";
import seedUserBot from "./seedBot.js";

export default async function startSeeders() {
  await seedCategory();
  await seedQAndA();
  await seedUserBot();
}
