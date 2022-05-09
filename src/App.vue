<script setup lang="ts">
import Controls from "@/components/Controls.vue";
import {useControlsStore} from "@/store/controls";
import {onMounted, reactive, watch} from "vue";
import Population from "@/classes/Population";
const store = useControlsStore();
const allowedSpeed = 1000/30;
const population = new Population(
    store.population,
    store.mutationRate,
    store.phrase
);

const state = reactive({
    bestPhrase: '',
    phrases: [] as Array<string>,
    generations: 0,
    averageFitness: 0,
    bestFitness: 0
})

onMounted(() => {
    console.log(population)
})

function runIteration(){
    console.log('iteration')
    const iterationStart = new Date().getTime();

    population.calculatePopulationFitness()
    population.generateMatingPool()
    population.calculateAverage();
    population.generateNextGeneration()

    population.evaluate();

    if(population.hasTarget)
        store.running = false;

    state.averageFitness = population.averageFitness;
    state.phrases = population.population.map(dna => dna.phrase());
    state.bestPhrase = population.highestFitness.dna === null ? '' : population.highestFitness.dna?.phrase()
    state.bestFitness = population.highestFitness.number
    state.generations = population.generation;
    if(store.running)
    {
        const diff = new Date().getTime() - iterationStart
        setTimeout(() => {
            runIteration()
        },diff > allowedSpeed ? 0 : allowedSpeed-diff )
    }
}

watch(() => store.running, () => {
    if(store.running)
        runIteration()
})

</script>

<template>
    <div class="flex w-screen h-screen">
        <div class="flex-grow p-4">
            <h1 class="text-2xl mb-4">Population</h1>
            <p class="text-xl">Best fit: {{state.bestPhrase}}</p>
            <p>Generation: {{state.generations}}</p>
            <p>Average fitness: {{state.averageFitness.toFixed(2)}}%</p>
            <p>Best fitness: {{state.bestFitness}}</p>
            <p class="mt-4">Phrases:</p>
            <p v-for="phrase in state.phrases">{{phrase}}</p>
        </div>
        <div class="p-4 bg-blue-500 text-white">
            <Controls />
        </div>
    </div>
</template>