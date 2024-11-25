import { expect } from "chai";
import {
	setAbsoluteInterval,
	setRelativeInterval,
	clearCustomInterval,
} from "./interval.js";

describe("accurate-intervals", () => {
	describe("setAbsoluteInterval", () => {
		it("average differential within 30ms", (done) => {
			const delay = 250;
			const _now = Date.now();
			const start = _now - (_now % delay);
			let diff = 0;
			let cycle = 0;
			const targetCycles = 20; // cycle 20 times
			const intervalID = setAbsoluteInterval((_delay) => {
				const now = Date.now();
				const target = start + delay * ++cycle;
				diff += now - target;

				if (cycle === targetCycles) {
					clearCustomInterval(intervalID);
					expect(diff / cycle).is.lessThanOrEqual(30); // diff is within 30ms
					done();
				}
			}, delay);
		}).timeout(0);
	});

	describe("setRelativeInterval", () => {
		it("average differential within 30ms", (done) => {
			const delay = 250;
			const start = Date.now();
			let diff = 0;
			let cycle = 0;
			const targetCycles = 20;
			const intervalID = setRelativeInterval((_delay) => {
				const now = Date.now();
				const target = start + delay * ++cycle;
				diff += now - target;

				if (cycle === targetCycles) {
					clearCustomInterval(intervalID);
					expect(diff / cycle).is.lessThanOrEqual(30); // diff is within 30ms
					done();
				}
			}, delay);
		}).timeout(0);
	});
});
