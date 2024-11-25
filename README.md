<div align='center'>
	
[![Static Badge](https://img.shields.io/badge/GitHub-black?style=for-the-badge&logo=github)](https://github.com/jackindisguise/accurate-intervals)
[![Static Badge](https://img.shields.io/badge/Documentation-orange?style=for-the-badge&logo=github)](https://jackindisguise.github.io/accurate-intervals/)
![GitHub package.json version](https://img.shields.io/github/package-json/v/jackindisguise/accurate-intervals?style=for-the-badge&logo=npm)

</div>

# Accurate Intervals
Provides functions for setting intervals that try to correct themselves to align with the targetted intervals.

# Install
`npm i jackindisguise/accurate-intervals`

# Example
## Absolute Intervals
Absolute intervals are intervals that try to fire with respect to timestamp 0.

```TypeScript
import {setAbsoluteInterval} from "accurate-intervals";
setAbsoluteInterval((delay)=>{
	console.log(`(${Date.now()}: Fired after ${delay} milliseconds.`);
}, 1000);
```

If `Date.now()` returns `123###`, setting an absolute interval that fires every `1000` milliseconds should be expected to fire at `124000`, `125000`, `126000`, `127000`, etc...

The first time the interval fires, the delay can vary wildly.
* If you set it at timestamp `###999`, it will want to fire after `1` millisecond.
* If you set it at timestamp `###001`, it will want to fire after `999` milliseconds.

## Relative Intervals
Relative intervals are intervals that try to fire with respect to when they were called.

```javascript
import {setRelativeInterval} from "accurate-intervals";
setRelativeInterval((delay)=>{
	console.log(`(${Date.now()}: Fired after ${delay} milliseconds.`);
}, 1000);
```

If `Date.now()` returns `123###`, setting a relative interval that fires every `1000` milliseconds should be expected to fire at `124###`, `125###`, `126###`, `127###`, etc...

Due to inherent unpredictability in the way intervals and timeouts work, the time between firing will vary, but it will always be between `0ms`\~`1000`ms (in this example). In my experience, you can expect it to vary by `0ms`\~`30ms` on average regardless of the actual interval assigned, with some spikes of `100ms`\~ or more uncommonly.

# Cycle Skipping
Setting an interval below `30ms` is inadvisable in pretty much all circumstances, as you may create a runaway condition where your interval will have to endlessly try to catch up.

In order to avoid this scenario, these interval functions automatically skip cycles that are trying to catch up.

### Canceling intervals.
```TypeScript
import {setRelativeInterval, clearCustomInterval} from "accurate-intervals";
const intervalID = setRelativeInterval((delay)=>{
	clearCustomInterval(intervalID);
	console.log("only fires once");
}, 1000);
```

`clearCustomInterval` clears intervals set by both `setRelativeInterval` and `setAbsoluteInterval`.

# Supports CJS and ESM
## CJS
```JavaScript
const {setAbsoluteInterval} = require("accurate-intervals");
setAbsoluteInterval((delay)=>{
	console.log(`(${Date.now()}: Fired after ${delay} milliseconds.`);
}, 1000);
```

## ESM
```JavaScript
import {setAbsoluteInterval} from "accurate-intervals";
setAbsoluteInterval((delay)=>{
	console.log(`(${Date.now()}: Fired after ${delay} milliseconds.`);
}, 1000);
```