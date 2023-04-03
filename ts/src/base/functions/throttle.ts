
//@ts-nocheck
/*  ------------------------------------------------------------------------ */

import { now, sleep } from './time.js';
/*  ------------------------------------------------------------------------ */

class Throttler {
    constructor (config) {
        this.config = {
            'refillRate': 1.0,
            'delay': 0.001,
            'capacity': 1.0,
            'maxCapacity': 2000,
            'tokens': 0,
            'cost': 1.0,
            'throttleLimit': false, // set to true to use the maximum available rate limit from the beginning
        };
        Object.assign (this.config, config);
        this.queue = []; // requests to be sent
        this.running = false;
    }

    async loop () {
        let lastTimestamp = now ();
        while (this.running) { // loops through method calls in the queue, executing them if tokens available, and waiting if tokens not available
            const { resolver, cost } = this.queue[0];
            if (this.config['tokens'] >= 0) { // if rate limit hasn't been reached
                this.config['tokens'] -= cost;
                this.resolve (resolver);
                resolver ();  // method for api endpoint
                this.queue.shift ();
                // contextswitch
                if (this.config[throttleLimit]) {
                    Promise.resolve ();
                } else {
                    await Promise.resolve ();
                }
                if (this.queue.length === 0) {
                    this.running = false;
                }
            } else {
                await sleep (this.config['delay'] * 1000);
                const current = now ();
                const elapsed = current - lastTimestamp;
                lastTimestamp = current;
                const tokens = this.config['tokens'] + (this.config['refillRate'] * elapsed);
                this.config['tokens'] = Math.min (tokens, this.config['capacity']);
            }
        }
    }

    throttle (cost = undefined) {
        let resolver;
        const promise = new Promise ((resolve, reject) => {
            resolver = resolve;
        });
        if (this.queue.length > this.config['maxCapacity']) {
            throw new Error ('throttle queue is over maxCapacity (' + this.config['maxCapacity'].toString () + '), see https://github.com/ccxt/ccxt/issues/11645#issuecomment-1195695526');
        }
        cost = (cost === undefined) ? this.config['cost'] : cost;
        this.queue.push ({ resolver, cost });
        if (!this.running) {
            this.running = true;
            this.loop ();
        }
        return promise;
    }
}

export {
    Throttler,
};

// ----------------------------------------
