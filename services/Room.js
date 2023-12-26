import { UserStatusEnum } from "../utils/constants.js";

const checkWinners = (currentStep, room) => {
  const participantAnswerCorrect = currentStep.participants.filter((part) => part.answers[currentStep.askQuestion].isAnswerCorrect);

  if (participantAnswerCorrect.length === 1) {
    participantAnswerCorrect[0].status = UserStatusEnum.WINNER;
    room.steps[room.currentStep - 1].participants.push({ user: participantAnswerCorrect[0].user });
  }

  if (participantAnswerCorrect.length === currentStep.participants.length - 1) {
    participantAnswerCorrect.forEach((participant) => {
      const part = participant;
      part.status = UserStatusEnum.WINNER;
      room.steps[room.currentStep - 1].participants.push({ bot: participant.bot });
    });
    room.currentStep -= 1;
  }
};

export default checkWinners;
