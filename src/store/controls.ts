import { defineStore } from 'pinia'

const useStore = defineStore('controls', {
    state: () => {
        return {
            running: false,
            phrase: 'To be or not to be.',
            population: 200,
            mutationRate: 10
        }
    },
})