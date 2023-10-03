import historyQuestions from "./questionAndAnswers/history.js";
import cultureQuestions from "./questionAndAnswers/culture.js";
import entertainmentQuestions from "./questionAndAnswers/entertainment.js";
import sportQuestions from "./questionAndAnswers/sports.js";
import geographyQuestions from "./questionAndAnswers/geography.js";
import scienceQuestions from "./questionAndAnswers/science.js";
import technologyQuestions from "./questionAndAnswers/technology.js";

export default async function seedQAndA() {
  await historyQuestions();
  await cultureQuestions();
  await entertainmentQuestions();
  await sportQuestions();
  await geographyQuestions();
  await scienceQuestions();
  await technologyQuestions();
}
