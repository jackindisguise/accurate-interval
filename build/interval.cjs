"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// build/interval.js
var interval_exports = {};
__export(interval_exports, {
  clearCustomInterval: () => clearCustomInterval,
  setAbsoluteInterval: () => setAbsoluteInterval,
  setRelativeInterval: () => setRelativeInterval
});
module.exports = __toCommonJS(interval_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clearCustomInterval,
  setAbsoluteInterval,
  setRelativeInterval
});
