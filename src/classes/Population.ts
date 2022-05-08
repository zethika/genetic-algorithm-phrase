import DNA from "@/classes/DNA";
import mapValueToRange from "@/helpers/mapValueToRange";

export default class{
    private readonly populationSize: number;
    private readonly mutationRate: number;
    private readonly target: string;
    private highestFitness: number;
    private population: DNA[];

    private pool: Array<number>

    constructor(populationSize: number, mutationRate: number, target: string) {
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;
        this.target = target;
        this.highestFitness = 0;
        this.pool = []

        const dnaSize = target.length;
        this.population = []
        for(let i = 0; i < populationSize; i++){
            this.population.push(new DNA(dnaSize))
        }
    }

    /**
     * Calculates the fitness for each element of the population and determines the highest fitness in the population
     */
    calculatePopulationFitness(){
        this.population.forEach(dna => {
            dna.determineFitness(this.target)
            if(dna.fitness > this.highestFitness)
                this.highestFitness = dna.fitness
        })
    }

    /**
     * Generates the mating pool by looping over each DNA element and filling an array with an index reference to the DNA element.
     * The number of times the dna's index is generated is the same as its fitness.
     * The fitness is mapped between 0 and 100 to limit the array size.
     */
    generateMatingPool(){
        this.population.forEach((dna,index) => {
            const percentage = Math.floor(mapValueToRange(dna.fitness,0,this.highestFitness,0,100))
            this.pool = this.pool.concat(new Array(percentage).fill(index))
        })
    }

    /**
     *
     */
    generateNextGeneration(){
        const matingPoolSize = this.pool.length
        for(let i = 0; i < this.populationSize; i++){
            const partnerA = this.population[Math.floor(Math.random()*matingPoolSize)];
            const partnerB = this.population[Math.floor(Math.random()*matingPoolSize)];
            let child = partnerA.crossOver(partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
    }
}