import { defineStore } from 'pinia'

export const useControlsStore = defineStore('controls', {
    state: () => {
        return {
            step: 0,
            stepper: undefined as undefined|NodeJS.Timer,
            running: false,
            phrase: 'To be or not to be.',
            population: 200,
            mutationRate: 10
        }
    },
    actions: {
        startStepper(){
            if(this.stepper !== undefined)
                return;

            this.stepper = setInterval(() => {
                this.step++;
            },1000/30)
        },
        stopStepper(){
            if(this.stepper === undefined)
                return;

            clearInterval(this.stepper)
            this.stepper = undefined;
        }
    }
})