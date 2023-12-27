/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { UserStatusEnum } from "../utils/constants.js";

const getParticipantByAnswerCorrect = (answersCorrect, currentStep) => currentStep.participants.filter((participant) => {
  // Filtrar respuestas correctas
  const respuestasCorrectas = participant.answers.filter((respuesta) => respuesta.isAnswerCorrect === true);
  // Verificar si hay dos respuestas correctas
  return respuestasCorrectas.length === answersCorrect;
});

const checkBooleanAnswers = (currentStep, room) => {
  // ######## #### ##       ######## ########   #######     ########   #######  ########     ##        #######   ######      #######  ##     ## ########     ######   #######  ##    ## ######## ########  ######  ########    ###    ########   #######  ##    ##    ##          ###     ######     ########   #######   ######     ########  #### ######## ##    ##     
  // ##        ##  ##          ##    ##     ## ##     ##    ##     ## ##     ## ##     ##    ##       ##     ## ##    ##    ##     ## ##     ## ##          ##    ## ##     ## ###   ##    ##    ##       ##    ##    ##      ## ##   ##     ## ##     ## ###   ##    ##         ## ##   ##    ##    ##     ## ##     ## ##    ##    ##     ##  ##  ##       ###   ##     
  // ##        ##  ##          ##    ##     ## ##     ##    ##     ## ##     ## ##     ##    ##       ##     ## ##          ##     ## ##     ## ##          ##       ##     ## ####  ##    ##    ##       ##          ##     ##   ##  ##     ## ##     ## ####  ##    ##        ##   ##  ##          ##     ## ##     ## ##          ##     ##  ##  ##       ####  ##     
  // ######    ##  ##          ##    ########  ##     ##    ########  ##     ## ########     ##       ##     ##  ######     ##     ## ##     ## ######      ##       ##     ## ## ## ##    ##    ######    ######     ##    ##     ## ########  ##     ## ## ## ##    ##       ##     ##  ######     ##     ## ##     ##  ######     ########   ##  ######   ## ## ##     
  // ##        ##  ##          ##    ##   ##   ##     ##    ##        ##     ## ##   ##      ##       ##     ##       ##    ##  ## ## ##     ## ##          ##       ##     ## ##  ####    ##    ##             ##    ##    ######### ##   ##   ##     ## ##  ####    ##       #########       ##    ##     ## ##     ##       ##    ##     ##  ##  ##       ##  ####     
  // ##        ##  ##          ##    ##    ##  ##     ##    ##        ##     ## ##    ##     ##       ##     ## ##    ##    ##    ##  ##     ## ##          ##    ## ##     ## ##   ###    ##    ##       ##    ##    ##    ##     ## ##    ##  ##     ## ##   ###    ##       ##     ## ##    ##    ##     ## ##     ## ##    ##    ##     ##  ##  ##       ##   ### ### 
  // ##       #### ########    ##    ##     ##  #######     ##         #######  ##     ##    ########  #######   ######      ##### ##  #######  ########     ######   #######  ##    ##    ##    ########  ######     ##    ##     ## ##     ##  #######  ##    ##    ######## ##     ##  ######     ########   #######   ######     ########  #### ######## ##    ## ### 

  const participantAnswerBothCorrect = getParticipantByAnswerCorrect(2, currentStep);

  // Si (todos contestaron las dos bien < currentStep.participants.length), pasan todos al siguiente escalon.
  if (participantAnswerBothCorrect.length < currentStep.participants.length) {
    participantAnswerBothCorrect.forEach((participant) => {
      const part = participant;
      part.status = UserStatusEnum.WINNER;
      if (participant.user) {
        room.steps[room.currentStep - 1].participants.push({ user: participant.user });
      } else {
        room.steps[room.currentStep - 1].participants.push({ bot: participant.bot });
      }
    });
  }

  // Si (todos contestaron las dos bien == currentStep.participants.length), pregunta numerica
  if (participantAnswerBothCorrect.length === currentStep.participants.length) {
    participantAnswerBothCorrect.forEach((participant) => {
      const part = participant;
      part.status = UserStatusEnum.ANSWERING;
      part.showQuestion = true;
    });
  }

  // ######## #### ##       ######## ########   #######     ########   #######  ########     ##        #######      #######  ##     ## ########     ######   #######  ##    ## ######## ########  ######  ########    ###    ########   #######  ##    ##    ##     ## ##    ##    ###       ########  #### ######## ##    ##     
  // ##        ##  ##          ##    ##     ## ##     ##    ##     ## ##     ## ##     ##    ##       ##     ##    ##     ## ##     ## ##          ##    ## ##     ## ###   ##    ##    ##       ##    ##    ##      ## ##   ##     ## ##     ## ###   ##    ##     ## ###   ##   ## ##      ##     ##  ##  ##       ###   ##     
  // ##        ##  ##          ##    ##     ## ##     ##    ##     ## ##     ## ##     ##    ##       ##     ##    ##     ## ##     ## ##          ##       ##     ## ####  ##    ##    ##       ##          ##     ##   ##  ##     ## ##     ## ####  ##    ##     ## ####  ##  ##   ##     ##     ##  ##  ##       ####  ##     
  // ######    ##  ##          ##    ########  ##     ##    ########  ##     ## ########     ##       ##     ##    ##     ## ##     ## ######      ##       ##     ## ## ## ##    ##    ######    ######     ##    ##     ## ########  ##     ## ## ## ##    ##     ## ## ## ## ##     ##    ########   ##  ######   ## ## ##     
  // ##        ##  ##          ##    ##   ##   ##     ##    ##        ##     ## ##   ##      ##       ##     ##    ##  ## ## ##     ## ##          ##       ##     ## ##  ####    ##    ##             ##    ##    ######### ##   ##   ##     ## ##  ####    ##     ## ##  #### #########    ##     ##  ##  ##       ##  ####     
  // ##        ##  ##          ##    ##    ##  ##     ##    ##        ##     ## ##    ##     ##       ##     ##    ##    ##  ##     ## ##          ##    ## ##     ## ##   ###    ##    ##       ##    ##    ##    ##     ## ##    ##  ##     ## ##   ###    ##     ## ##   ### ##     ##    ##     ##  ##  ##       ##   ### ### 
  // ##       #### ########    ##    ##     ##  #######     ##         #######  ##     ##    ########  #######      ##### ##  #######  ########     ######   #######  ##    ##    ##    ########  ######     ##    ##     ## ##     ##  #######  ##    ##     #######  ##    ## ##     ##    ########  #### ######## ##    ## ### 
  
  const participantAnswerOneCorrect = getParticipantByAnswerCorrect(1, currentStep);
  // Si (1 solo contesto una bien y el resto las dos) perdio
  if (participantAnswerOneCorrect.length === 1
      && participantAnswerOneCorrect.length + participantAnswerBothCorrect.length === currentStep.participants.length) {
    participantAnswerOneCorrect[0].status = UserStatusEnum.LOOSER;
    participantAnswerOneCorrect[0].showQuestion = false;
  }

  // Si (contestaron dos bien + contestaron una bien < currentStep.participants.length) => pasan los que contestaron al menos una bien
  if (participantAnswerBothCorrect.length + participantAnswerOneCorrect.length < currentStep.participants.length) {
    participantAnswerOneCorrect.forEach((participant) => {
      const part = participant;
      part.status = UserStatusEnum.WINNER;
      if (participant.user) {
        room.steps[room.currentStep - 1].participants.push({ user: participant.user });
      } else {
        room.steps[room.currentStep - 1].participants.push({ bot: participant.bot });
      }
    });
  }
  // Si (contestaron dos bien + contestaron una bien == currentStep.participants.length) => pregunta numerica para todos los que contestaron una bien
  if (participantAnswerBothCorrect.length + participantAnswerOneCorrect.length === currentStep.participants.length) {
    participantAnswerOneCorrect.forEach((participant) => {
      const part = participant;
      part.status = UserStatusEnum.ANSWERING;
      part.showQuestion = true;
    });
  }

  // ######## #### ##       ######## ########   #######     ########   #######  ########     ##        #######   ######      #######  ##     ## ########     ######   #######  ##    ## ######## ########  ######  ########    ###    ########   #######  ##    ##    ##          ###     ######     ########   #######   ######     ##     ##    ###    ##           
  // ##        ##  ##          ##    ##     ## ##     ##    ##     ## ##     ## ##     ##    ##       ##     ## ##    ##    ##     ## ##     ## ##          ##    ## ##     ## ###   ##    ##    ##       ##    ##    ##      ## ##   ##     ## ##     ## ###   ##    ##         ## ##   ##    ##    ##     ## ##     ## ##    ##    ###   ###   ## ##   ##           
  // ##        ##  ##          ##    ##     ## ##     ##    ##     ## ##     ## ##     ##    ##       ##     ## ##          ##     ## ##     ## ##          ##       ##     ## ####  ##    ##    ##       ##          ##     ##   ##  ##     ## ##     ## ####  ##    ##        ##   ##  ##          ##     ## ##     ## ##          #### ####  ##   ##  ##           
  // ######    ##  ##          ##    ########  ##     ##    ########  ##     ## ########     ##       ##     ##  ######     ##     ## ##     ## ######      ##       ##     ## ## ## ##    ##    ######    ######     ##    ##     ## ########  ##     ## ## ## ##    ##       ##     ##  ######     ##     ## ##     ##  ######     ## ### ## ##     ## ##           
  // ##        ##  ##          ##    ##   ##   ##     ##    ##        ##     ## ##   ##      ##       ##     ##       ##    ##  ## ## ##     ## ##          ##       ##     ## ##  ####    ##    ##             ##    ##    ######### ##   ##   ##     ## ##  ####    ##       #########       ##    ##     ## ##     ##       ##    ##     ## ######### ##           
  // ##        ##  ##          ##    ##    ##  ##     ##    ##        ##     ## ##    ##     ##       ##     ## ##    ##    ##    ##  ##     ## ##          ##    ## ##     ## ##   ###    ##    ##       ##    ##    ##    ##     ## ##    ##  ##     ## ##   ###    ##       ##     ## ##    ##    ##     ## ##     ## ##    ##    ##     ## ##     ## ##       ### 
  // ##       #### ########    ##    ##     ##  #######     ##         #######  ##     ##    ########  #######   ######      ##### ##  #######  ########     ######   #######  ##    ##    ##    ########  ######     ##    ##     ## ##     ##  #######  ##    ##    ######## ##     ##  ######     ########   #######   ######     ##     ## ##     ## ######## ### 

  const participantAnswerZeroCorrect = getParticipantByAnswerCorrect(0, currentStep);
  // Si hay mas de uno, pregunta numerica.
  if (participantAnswerZeroCorrect.length > 1) {
    participantAnswerZeroCorrect.forEach((participant) => {
      const part = participant;
      part.status = UserStatusEnum.ANSWERING;
      part.showQuestion = true;
    });
  }

  // Si hubo uno solo que contesto las dos mal, avanzan todos al siguiente escalon menos ese jugador
  if (participantAnswerZeroCorrect.length === 1) {
    participantAnswerZeroCorrect[0].status = UserStatusEnum.LOOSER;
    participantAnswerZeroCorrect[0].showQuestion = false;
  }

  console.log({
    both: participantAnswerBothCorrect.length,
    one: participantAnswerOneCorrect.length,
    zero: participantAnswerZeroCorrect.length,
  });
};

const checkNumericAnswers = () => {

};

const showNextQuestion = (currentStep) => {
  currentStep.participants.forEach((participant) => {
    const part = participant;
    part.status = UserStatusEnum.ANSWERING;
    part.showQuestion = true;
  });
};

const checkWinners = (currentStep, room) => {
  switch (currentStep.askQuestion) {
    case 1: checkBooleanAnswers(currentStep, room);
      break;
    case 2: checkNumericAnswers(currentStep, room);
      break;
    default: showNextQuestion(currentStep);
  }
};

export default checkWinners;
