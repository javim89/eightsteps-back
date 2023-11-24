/* eslint-disable max-len */
import QuestionsAndAnswers from "../../models/QuestionsAndAnswers.js";
import Category from "../../models/Category.js";
import { QuestionsTypeEnum, categories } from "../../utils/constants.js";

export default async function technologyQuestions() {
  const technologyCategory = await Category.findOne({ name: categories.TECHNOLOGY }).exec();

  const questionsAndAnswers = await QuestionsAndAnswers.find({
    category: technologyCategory,
  });
  if (questionsAndAnswers.length === 0) {
    let technologyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El sistema operativo Android es desarrollado por Apple?",
      answer: false,
      helperText: "Android es desarrollado por Google, no por Apple.",
      category: technologyCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await technologyQuestionAndAnswer.save();

    technologyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El término \"Inteligencia Artificial\" se refiere a la capacidad de las máquinas para realizar tareas que normalmente requieren la inteligencia humana?",
      answer: true,
      category: technologyCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await technologyQuestionAndAnswer.save();

    technologyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El Bluetooth es una tecnología de comunicación inalámbrica que utiliza ondas de radio de corto alcance?",
      answer: true,
      category: technologyCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await technologyQuestionAndAnswer.save();

    technologyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El protocolo de seguridad HTTPS garantiza que una conexión web sea segura y cifrada?",
      answer: true,
      category: technologyCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await technologyQuestionAndAnswer.save();

    technologyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El sistema operativo Windows es una distribución de Linux?",
      answer: false,
      helperText: "Windows y Linux son sistemas operativos diferentes.",
      category: technologyCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await technologyQuestionAndAnswer.save();

    technologyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El navegador web Mozilla Firefox es de código abierto?",
      answer: true,
      category: technologyCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await technologyQuestionAndAnswer.save();

    technologyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿La realidad virtual (VR) permite a los usuarios experimentar entornos y situaciones simuladas de manera inmersiva?",
      answer: true,
      category: technologyCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await technologyQuestionAndAnswer.save();

    technologyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El término \"Phishing\" se refiere a intentos de engañar a las personas para obtener información confidencial, como contraseñas, a menudo a través de correos electrónicos fraudulentos?",
      answer: true,
      category: technologyCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await technologyQuestionAndAnswer.save();

    technologyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El término \"criptomoneda\" se refiere a monedas físicas encriptadas?",
      answer: false,
      helperText: "Las criptomonedas son monedas digitales descentralizadas.",
      category: technologyCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await technologyQuestionAndAnswer.save();

    technologyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿El término \"cloud computing\" se refiere a la práctica de almacenar y acceder a datos y aplicaciones a través de internet en lugar de en dispositivos locales?",
      answer: true,
      category: technologyCategory,
      type: QuestionsTypeEnum.BOOLEAN,
    });
    await technologyQuestionAndAnswer.save();

    technologyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Cuántos bits conforman un byte en el ámbito de la informática?",
      answer: 8,
      category: technologyCategory,
      type: QuestionsTypeEnum.NUMERIC,
      helperText: "Un byte está compuesto por 8 bits.",
    });
    await technologyQuestionAndAnswer.save();

    technologyQuestionAndAnswer = new QuestionsAndAnswers({
      question: "¿Cuántos canales de color tiene un píxel en una imagen RGB?",
      answer: 3,
      category: technologyCategory,
      type: QuestionsTypeEnum.NUMERIC,
      helperText: "Un píxel en una imagen RGB tiene tres canales de color: rojo, verde y azul.",
    });
    await technologyQuestionAndAnswer.save();
  }
}
