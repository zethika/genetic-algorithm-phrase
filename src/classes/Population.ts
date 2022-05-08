import DNA from "@/classes/DNA";

export default class{
    private readonly populationSize: number;
    private readonly mutationRate: number;
    private dna: DNA[];

    constructor(populationSize: number, mutationRate: number, dnaSize: number) {
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;

        this.dna = []
        for(let i = 0; i < populationSize; i++){
            this.dna.push(new DNA(dnaSize))
        }
    }

    calculatePopulationFitness(){

    }

    generateMatingPool(){

    }

    generateNextGeneration(){

    }
}