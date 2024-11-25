/** Callback supplied to custom intervals. */
export type CustomIntervalCallback = (delay: number) => void;
/**
 * Sets an interval that fires at the given interval with respect to timestamp 0.
 *
 * ```JavaScript
 * const start = Date.now(); // 5555
 *
 * // interval fires every second
 * setAbsoluteInterval(()=>{
 * 	const now = Date.now();
 *	console.log(`${now}: FIRED`);
 * }, 1000);
 *
 * // ideal output:
 * // 6000: FIRED
 * // 7000: FIRED
 * // 8000: FIRED
 * // etc...
 * ```
 * The first time the interval fires, the delay can vary wildly.
 * If you set it at timestamp `###999`, it will want to fire after `1` millisecond.
 * If you set it at timestamp `###001`, it will want to fire after `999` milliseconds.
 * @param callback A callback that is fired on the interval.
 * @param interval The interval to fire the callback at.
 * @returns An ID that tracks this interval.
 */
export declare function setAbsoluteInterval(callback: CustomIntervalCallback, interval: number): number;
/**
 * Sets an interval that fires at the given interval with respect to when it was fired.
 *
 * ```JavaScript
 * const start = Date.now(); // 5555
 *
 * // interval fires every second
 * setAbsoluteInterval(()=>{
 * 	const now = Date.now();
 *	console.log(`${now}: FIRED`);
 * }, 1000);
 *
 * // ideal output:
 * // 6555: FIRED
 * // 7555: FIRED
 * // 8555: FIRED
 * // etc...
 * ```
 * @param callback A callback that is fired on the interval.
 * @param interval The interval to fire the callback at.
 * @returns An ID that tracks this interval.
 */
export declare function setRelativeInterval(callback: CustomIntervalCallback, interval: number): number;
/**
 * Clears a set of relative or absolute intervals.
 * @param ids A set of accurate or relative intervals to cancel.
 */
export declare function clearCustomInterval(...ids: number[]): void;
