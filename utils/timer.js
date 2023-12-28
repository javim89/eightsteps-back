let interval;
export default function initTimer(pubSub, roomId) {
  let progress = 0;
  let seconds = 10;
  let miliseconds = 0;
  interval = setInterval(() => {
    if (seconds === 0 && miliseconds === 0) {
      clearInterval(interval);
    } else if (miliseconds === 0) {
      seconds -= 1;
      miliseconds = 99;
    } else {
      miliseconds -= 1;
    }

    if (progress === 10000) {
      clearInterval(interval);
    } else {
      progress += 10;
    }
    pubSub.publish(`ROOM_TIMER_${roomId}`, { roomTimerSubscription: { progress, seconds, miliseconds } });
  }, 10);
}

export function resetTimer(pubSub, roomId) {
  clearInterval(interval);
  initTimer(pubSub, roomId);
}
