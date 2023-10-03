import QuestionsAndAnswers from "../../models/QuestionsAndAnswers.js";
import Category from "../../models/Category.js";
import categories from "../../utils/constants.js";

export default async function sportQuestions() {
  const sportCategory = await Category.findOne({ name: categories.SPORTS }).exec();

  const questionsAndAnswers = await QuestionsAndAnswers.find({
    category: sportCategory,
  });
  if (questionsAndAnswers.length === 0) {
    let sportQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Usain Bolt ostenta el récord mundial de los 100 metros lisos?",
      answer: true,
      category: sportCategory,
    });
    sportQuestionAndAnswer.save();

    sportQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El golfista Tiger Woods ha ganado más de 20 títulos de Grand Slam en su carrera?",
      answer: false,
      helperText: "Tiger Woods ha ganado 15 títulos de Grand Slam.",
      category: sportCategory,
    });
    await sportQuestionAndAnswer.save();

    sportQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Copa Mundial de la FIFA se celebra cada cuatro años?",
      answer: true,
      category: sportCategory,
    });
    await sportQuestionAndAnswer.save();

    sportQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El tenista Rafael Nadal es conocido como \"El Rey de la Hierba\"?",
      answer: false,
      helperText: "Rafael Nadal es conocido como \"El Rey de la Tierra Batida.\"",
      category: sportCategory,
    });
    await sportQuestionAndAnswer.save();

    sportQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Copa América es un torneo de fútbol de selecciones nacionales de América del Sur?",
      answer: true,
      category: sportCategory,
    });
    await sportQuestionAndAnswer.save();

    sportQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El maratonista Eliud Kipchoge es conocido por ser el primer ser humano en correr un maratón en menos de 2 horas?",
      answer: true,
      category: sportCategory,
    });
    await sportQuestionAndAnswer.save();

    sportQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El Super Bowl es el evento deportivo más visto en Estados Unidos cada año?",
      answer: true,
      category: sportCategory,
    });
    await sportQuestionAndAnswer.save();

    sportQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El ciclista Lance Armstrong fue despojado de sus siete títulos del Tour de Francia debido a un escándalo de dopaje?",
      answer: true,
      category: sportCategory,
    });
    await sportQuestionAndAnswer.save();

    sportQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La gimnasta Simone Biles es considerada una de las más grandes gimnastas de todos los tiempos?",
      answer: true,
      category: sportCategory,
    });
    await sportQuestionAndAnswer.save();

    sportQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El baloncestista Michael Jordan jugó la mayor parte de su carrera en los Chicago Bulls?",
      answer: true,
      category: sportCategory,
    });
    await sportQuestionAndAnswer.save();
  }
}
