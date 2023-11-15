import QuestionsAndAnswers from "../../models/QuestionsAndAnswers.js";
import Category from "../../models/Category.js";
import { categories } from "../../utils/constants.js";

export default async function geographyQuestions() {
  const geographyCategory = await Category.findOne({ name: categories.GEOGRAPHY }).exec();

  const questionsAndAnswers = await QuestionsAndAnswers.find({
    category: geographyCategory,
  });
  if (questionsAndAnswers.length === 0) {
    let geographyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El río Amazonas es el río más largo del mundo?",
      answer: true,
      category: geographyCategory,
    });
    await geographyQuestionAndAnswer.save();

    geographyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Gran Muralla China es visible desde el espacio?",
      answer: false,
      helperText: "La Gran Muralla China generalmente no es visible a simple vista desde el espacio.",
      category: geographyCategory,
    });
    await geographyQuestionAndAnswer.save();

    geographyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La capital de Australia es Sídney?",
      answer: false,
      helperText: "La capital de Australia es Canberra.",
      category: geographyCategory,
    });
    await geographyQuestionAndAnswer.save();

    geographyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El Sahara es el desierto más grande del mundo?",
      answer: true,
      category: geographyCategory,
    });
    await geographyQuestionAndAnswer.save();

    geographyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La ciudad de Venecia, Italia, se construyó sobre un archipiélago de islas?",
      answer: true,
      category: geographyCategory,
    });
    await geographyQuestionAndAnswer.save();

    geographyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Antártida es el continente más frío de la Tierra?",
      answer: true,
      category: geographyCategory,
    });
    await geographyQuestionAndAnswer.save();

    geographyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El río Nilo fluye de sur a norte?",
      answer: true,
      category: geographyCategory,
    });
    await geographyQuestionAndAnswer.save();

    geographyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El monte Everest es la montaña más alta del mundo?",
      answer: true,
      category: geographyCategory,
    });
    await geographyQuestionAndAnswer.save();

    geographyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿México limita con Estados Unidos al sur?",
      answer: false,
      helperText: "México limita con Estados Unidos al norte.",
      category: geographyCategory,
    });
    await geographyQuestionAndAnswer.save();

    geographyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El Canal de Suez conecta el Mar Rojo con el Mar Mediterráneo?",
      answer: true,
      category: geographyCategory,
    });
    await geographyQuestionAndAnswer.save();
  }
}
