import DNA from "@/classes/DNA";
import mapValueToRange from "@/helpers/mapValueToRange";

export default class{
    private readonly populationSize: number;
    private readonly mutationRate: number;
    private readonly target: string;
    private _highestFitness: { number: number, dna: DNA|null };
    private population: DNA[];
    private _generation: number;

    private pool: Array<number>

    private _hasTarget: boolean;
    private averageFitness: number;

    constructor(populationSize: number, mutationRate: number, target: string) {
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;
        this.target = target;
        this._highestFitness = {number: 0, dna: null};
        this.pool = []
        this._hasTarget = false;
        this.averageFitness = 0;
        this._generation = 0;

        const dnaSize = target.length;
        this.population = []
        for(let i = 0; i < populationSize; i++){
            this.population.push(new DNA(dnaSize))
        }
    }

    get generation(): number {
        return this._generation;
    }

    get highestFitness(): { number: number; dna: DNA | null } {
        return this._highestFitness;
    }

    get hasTarget(): boolean {
        return this._hasTarget;
    }

    /**
     * Calculates the fitness for each element of the population and determines the highest fitness in the population
     */
    calculatePopulationFitness(){
        this.population.forEach(dna => {
            dna.determineFitness(this.target)
            if(dna.fitness > this._highestFitness.number)
                this._highestFitness = {number: dna.fitness, dna: dna}
        })
    }

    /**
     * Generates the mating pool by looping over each DNA element and filling an array with an index reference to the DNA element.
     * The number of times the dna's index is generated is the same as its fitness.
     * The fitness is mapped between 0 and 100 to limit the array size.
     */
    generateMatingPool(){
        this.population.forEach((dna,index) => {
            const percentage = Math.floor(mapValueToRange(dna.fitness,0,this._highestFitness.number,0,100))
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
        this._generation++;
    }

    /**
     * Evaluates the current generation of the population
     */
    evaluate(){
        let total = 0;
        this.population.forEach(dna => total += dna.fitness)
        this.averageFitness = mapValueToRange(total,0,this.target.length*this.populationSize, 0,100*this.populationSize)/this.populationSize;
        this._hasTarget = this._highestFitness.dna?.phrase() === this.target
    }
}