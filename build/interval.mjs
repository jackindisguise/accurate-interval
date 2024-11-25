// build/interval.js
var intervals = {};
var nextIntervalID = 0;
function setAbsoluteInterval(callback, interval) {
  const intervalID = nextIntervalID++;
  const _now = Date.now();
  const startTime = _now - _now % interval;
  let cycle = 0;
  const __next = () => {
    let target;
    do
      target = startTime + interval * ++cycle;
    while (target < Date.now());
    const remainder = target - Date.now();
    intervals[intervalID] = setTimeout(() => {
      __next();
      callback(remainder);
    }, remainder);
  };
  __next();
  return intervalID;
}
function setRelativeInterval(callback, interval) {
  const intervalID = nextIntervalID++;
  const startTime = Date.now();
  let cycle = 0;
  const __next = () => {
    let target;
    do
      target = startTime + interval * ++cycle;
    while (target < Date.now());
    const now = Date.now();
    const remainder = target - now;
    intervals[intervalID] = setTimeout(() => {
      __next();
      callback(remainder);
    }, remainder);
  };
  __next();
  return intervalID;
}
function clearCustomInterval(...ids) {
  for (const id of ids) {
    if (!(id in intervals))
      continue;
    const timeoutID = intervals[id];
    delete intervals[id];
    clearTimeout(timeoutID);
  }
}
export {
  clearCustomInterval,
  setAbsoluteInterval,
  setRelativeInterval
};
