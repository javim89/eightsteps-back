/* eslint-disable max-len */
import QuestionsAndAnswers from "../../models/QuestionsAndAnswers.js";
import Category from "../../models/Category.js";
import { QuestionsTypeEnum, categories } from "../../utils/constants.js";

export default async function cultureQuestions() {
  const cultureCategory = await Category.findOne({ name: categories.CULTURE }).exec();

  const questionsAndAnswers = await QuestionsAndAnswers.find({
    category: cultureCategory,
  });
  if (questionsAndAnswers.length === 0) {
    let cultureQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El tango es un género musical y de baile originario de Argentina?",
      answer: true,
      category: cultureCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await cultureQuestionAndAnswer.save();

    cultureQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El mate es una bebida tradicional en Argentina, a menudo compartida en reuniones sociales?",
      answer: true,
      category: cultureCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await cultureQuestionAndAnswer.save();

    cultureQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La bandera argentina consta de tres franjas horizontales de igual tamaño, con los colores celeste y blanco?",
      answer: false,
      helperText: "La bandera argentina consta de tres franjas horizontales, pero el orden de los colores es celeste y blanco, con el sol amarillo en el centro.",
      category: cultureCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await cultureQuestionAndAnswer.save();

    cultureQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El fútbol es el deporte más popular en Argentina?",
      answer: true,
      category: cultureCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await cultureQuestionAndAnswer.save();

    cultureQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El Obelisco de Buenos Aires es un famoso monumento y punto de referencia en la ciudad?",
      answer: true,
      category: cultureCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await cultureQuestionAndAnswer.save();

    cultureQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El tango argentino tiene sus raíces en la cultura africana?",
      answer: false,
      helperText: "El tango argentino tiene influencias europeas y rioplatenses, pero no africanas.",
      category: cultureCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await cultureQuestionAndAnswer.save();

    cultureQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La comida típica argentina incluye el asado, empanadas y milanesa?",
      answer: true,
      category: cultureCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await cultureQuestionAndAnswer.save();

    cultureQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Fiesta Nacional de la Vendimia se celebra en la provincia de Mendoza para celebrar la producción de vino?",
      answer: true,
      category: cultureCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await cultureQuestionAndAnswer.save();

    cultureQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El escritor Jorge Luis Borges es uno de los más influyentes de la literatura argentina?",
      answer: true,
      category: cultureCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await cultureQuestionAndAnswer.save();

    cultureQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La Casa Rosada en Buenos Aires es la sede del poder ejecutivo de Argentina?",
      answer: true,
      category: cultureCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await cultureQuestionAndAnswer.save();

    cultureQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Cuántos barrios tiene la Ciudad Autónoma de Buenos Aires?",
      answer: 48,
      category: cultureCategory,
      type: QuestionsTypeEnum.NUMERIC,
    });
    await cultureQuestionAndAnswer.save();

    cultureQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Cuántas provincias tiene Argentina?",
      answer: 23,
      category: cultureCategory,
      type: QuestionsTypeEnum.NUMERIC,
    });
    await cultureQuestionAndAnswer.save();
  }
}
