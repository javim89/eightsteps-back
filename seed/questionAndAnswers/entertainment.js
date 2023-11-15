import QuestionsAndAnswers from "../../models/QuestionsAndAnswers.js";
import Category from "../../models/Category.js";
import { categories } from "../../utils/constants.js";

export default async function entertainmentQuestions() {
  const entertainmentCategory = await Category.findOne({ name: categories.ENTERTAINMENT }).exec();

  const questionsAndAnswers = await QuestionsAndAnswers.find({
    category: entertainmentCategory,
  });
  if (questionsAndAnswers.length === 0) {
    let entertainmentQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El actor argentino Ricardo Darín protagonizó la película \"El Secreto de sus Ojos\"?",
      answer: true,
      category: entertainmentCategory,
    });
    await entertainmentQuestionAndAnswer.save();

    entertainmentQuestionAndAnswer = new QuestionsAndAnswers({
      question: " ¿La película \"El Padrino\" fue dirigida por Martin Scorsese?",
      answer: false,
      helperText: "\"El Padrino\" fue dirigida por Francis Ford Coppola",
      category: entertainmentCategory,
    });
    await entertainmentQuestionAndAnswer.save();

    entertainmentQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El grupo musical \"The Beatles\" se formó en Estados Unidos?",
      answer: false,
      helperText: "\"The Beatles\" se formó en Liverpool, Reino Unido",
      category: entertainmentCategory,
    });
    await entertainmentQuestionAndAnswer.save();

    entertainmentQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La serie de televisión \"Breaking Bad\" está ambientada en Albuquerque, Nuevo México?",
      answer: true,
      category: entertainmentCategory,
    });
    await entertainmentQuestionAndAnswer.save();

    entertainmentQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El libro \"Cien años de soledad\" fue escrito por el autor colombiano Gabriel García Márquez?",
      answer: true,
      category: entertainmentCategory,
    });
    await entertainmentQuestionAndAnswer.save();

    entertainmentQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El videojuego \"Super Mario Bros.\" fue lanzado por primera vez en la década de 1980?",
      answer: true,
      category: entertainmentCategory,
    });
    await entertainmentQuestionAndAnswer.save();

    entertainmentQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El actor Johnny Depp interpretó al pirata Jack Sparrow en la saga de películas \"Piratas del Caribe\"?",
      answer: true,
      category: entertainmentCategory,
    });
    await entertainmentQuestionAndAnswer.save();

    entertainmentQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La serie de televisión \"Friends\" se desarrolla en la ciudad de Nueva York?",
      answer: true,
      category: entertainmentCategory,
    });
    await entertainmentQuestionAndAnswer.save();

    entertainmentQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La película \"Forrest Gump\" está basada en una novela escrita por Winston Churchill?",
      answer: false,
      helperText: "\"Forrest Gump\" está basada en una novela escrita por Winston Groom.",
      category: entertainmentCategory,
    });
    await entertainmentQuestionAndAnswer.save();

    entertainmentQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El videojuego \"Minecraft\" fue creado por la empresa Mojang?",
      answer: true,
      category: entertainmentCategory,
    });
    await entertainmentQuestionAndAnswer.save();
  }
}
