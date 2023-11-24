import QuestionsAndAnswers from "../../models/QuestionsAndAnswers.js";
import Category from "../../models/Category.js";
import { QuestionsTypeEnum, categories } from "../../utils/constants.js";

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
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Tierra gira alrededor del Sol?",
      answer: true,
      category: scienceCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El agua hierve a 100 grados Celsius a nivel del mar?",
      answer: true,
      category: scienceCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Luna tiene su propia luz, similar al Sol?",
      answer: false,
      helperText: "La Luna refleja la luz del Sol, no la genera.",
      category: scienceCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El ADN es la molécula que contiene la información genética en los seres vivos?",
      answer: true,
      category: scienceCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Los dinosaurios coexistieron con los seres humanos?",
      answer: false,
      helperText: "Los dinosaurios se extinguieron mucho antes de la aparición de los seres humanos.",
      category: scienceCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El oxígeno es el elemento químico más abundante en la Tierra?",
      answer: false,
      helperText: "El elemento más abundante en la Tierra es el hierro.",
      category: scienceCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La ley de la conservación de la energía establece que la energía no puede crearse ni destruirse, solo transformarse?",
      answer: true,
      category: scienceCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Los virus son considerados seres vivos?",
      answer: false,
      helperText: "Los virus no son considerados seres vivos porque no tienen células y no pueden realizar funciones vitales por sí mismos.",
      category: scienceCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El Sol es una estrella enana roja?",
      answer: false,
      helperText: "El Sol es una estrella enana amarilla.",
      category: scienceCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Cuántos lóbulos tiene el cerebro humano?",
      answer: 5,
      helperText: "El cerebro humano tiene cinco lóbulos principales: frontal, parietal, temporal, occipital e ínsula.",
      category: scienceCategory,
      type: QuestionsTypeEnum.NUMERIC,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Cuántos cromosomas tiene una célula humana normal?",
      answer: 46,
      helperText: "Una célula humana normal tiene 46 cromosomas, organizados en 23 pares.",
      category: scienceCategory,
      type: QuestionsTypeEnum.NUMERIC,
    });
    await scienceQuestionAndAnswer.save();

    scienceQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Cuántos huesos tiene el cráneo humano?",
      answer: 22,
      helperText: "El cráneo humano está formado por 22 huesos, incluyendo los huesos del cráneo y la mandíbula.",
      category: scienceCategory,
      type: QuestionsTypeEnum.NUMERIC,
    });
    await scienceQuestionAndAnswer.save();
  }
}
