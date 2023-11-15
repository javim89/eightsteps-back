import QuestionsAndAnswers from "../../models/QuestionsAndAnswers.js";
import Category from "../../models/Category.js";
import { categories } from "../../utils/constants.js";

export default async function scienceQuestions() {
  const scienceCategory = await Category.findOne({ name: categories.SCIENCE }).exec();

  const questionsAndAnswers = await QuestionsAndAnswers.find({
    category: scienceCategory,
  });
  if (questionsAndAnswers.length === 0) {
    let scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Los electrones tienen carga positiva?",
      answer: false,
      helperText: "Los electrones tienen carga negativa.",
      category: scienceCategory,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Tierra gira alrededor del Sol?",
      answer: true,
      category: scienceCategory,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El agua hierve a 100 grados Celsius a nivel del mar?",
      answer: true,
      category: scienceCategory,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Luna tiene su propia luz, similar al Sol?",
      answer: false,
      helperText: "La Luna refleja la luz del Sol, no la genera.",
      category: scienceCategory,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El ADN es la molécula que contiene la información genética en los seres vivos?",
      answer: true,
      category: scienceCategory,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Los dinosaurios coexistieron con los seres humanos?",
      answer: false,
      helperText: "Los dinosaurios se extinguieron mucho antes de la aparición de los seres humanos.",
      category: scienceCategory,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El oxígeno es el elemento químico más abundante en la Tierra?",
      answer: false,
      helperText: "El elemento más abundante en la Tierra es el hierro.",
      category: scienceCategory,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La ley de la conservación de la energía establece que la energía no puede crearse ni destruirse, solo transformarse?",
      answer: true,
      category: scienceCategory,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Los virus son considerados seres vivos?",
      answer: false,
      helperText: "Los virus no son considerados seres vivos porque no tienen células y no pueden realizar funciones vitales por sí mismos.",
      category: scienceCategory,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El Sol es una estrella enana roja?",
      answer: false,
      helperText: "El Sol es una estrella enana amarilla.",
      category: scienceCategory,
    });
    await scienceQuestionAndAnswer.save();
  }
}
