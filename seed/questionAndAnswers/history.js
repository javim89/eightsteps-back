import QuestionsAndAnswers from "../../models/QuestionsAndAnswers.js";
import Category from "../../models/Category.js";
import categories from "../../utils/constants.js";

export default async function historyQuestions() {
  const historyCategory = await Category.findOne({ name: categories.HISTORY }).exec();

  const questionsAndAnswers = await QuestionsAndAnswers.find({
    category: historyCategory,
  });
  if (questionsAndAnswers.length === 0) {
    let historyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Revolución de Mayo de 1810 en Argentina tuvo lugar el 25 de mayo?",
      answer: true,
      category: historyCategory,
    });
    historyQuestionAndAnswer.save();

    historyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Argentina obtuvo su independencia de España en 1820?",
      answer: false,
      helperText: "La independencia de Argentina se declaró el 9 de julio de 1816.",
      category: historyCategory,
    });
    await historyQuestionAndAnswer.save();

    historyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Juan Domingo Perón fue presidente de Argentina en tres ocasiones no consecutivas?",
      answer: true,
      category: historyCategory,
    });
    await historyQuestionAndAnswer.save();

    historyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Guerra de las Malvinas entre Argentina y el Reino Unido ocurrió en la década de 1980?",
      answer: true,
      category: historyCategory,
    });
    await historyQuestionAndAnswer.save();

    historyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Constitución Nacional de Argentina se promulgó en 1853?",
      answer: true,
      category: historyCategory,
    });
    await historyQuestionAndAnswer.save();

    historyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Revolución de 1890 en Argentina fue un levantamiento militar contra el gobierno de Miguel Juárez Celman?",
      answer: true,
      category: historyCategory,
    });
    await historyQuestionAndAnswer.save();

    historyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Argentina se convirtió en un país independiente de facto en 1810?",
      answer: true,
      category: historyCategory,
    });
    await historyQuestionAndAnswer.save();

    historyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La \"Década Infame\" se refiere al período de gobiernos democráticos y estabilidad en Argentina?",
      answer: false,
      category: historyCategory,
      helperText: "La \"Década Infame\" se refiere a un período de corrupción y fraude electoral en la década de 1930",
    });
    await historyQuestionAndAnswer.save();

    historyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Guerra del Paraguay (1864-1870) involucró a Argentina, Brasil y Uruguay en una lucha contra Paraguay?",
      answer: true,
      category: historyCategory,
    });
    await historyQuestionAndAnswer.save();

    historyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Eva Perón fue la primera mujer en Argentina en aspirar a la presidencia?",
      answer: true,
      category: historyCategory,
    });
    await historyQuestionAndAnswer.save();
  }
}
