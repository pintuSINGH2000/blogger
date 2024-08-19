export const throttle = (callback, delay,onTimerEnd) => {
    let isTimer = false;
    let isMoreChange;
    let timeout = () => {
      if (isMoreChange === null) {
        isTimer = false;
        if (onTimerEnd) {
            onTimerEnd();
          }
      } else {
        callback(isMoreChange);
        isMoreChange = null;
        setTimeout(timeout, delay);
      }
    };
    return function (...args) {
      if (isTimer) {
        isMoreChange = [...args];
        return;
      }
      callback([...args]);
      isTimer = true;
      setTimeout(() => {
        timeout();
      }, delay);
    };
  }