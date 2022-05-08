import getRandomCharacter from "@/helpers/getRandomCharacter";

export default class{
    private genes: Array<string>;

    constructor(size: number) {
        this.genes = [];
        for(let i = 0; i < size; i++){
            this.genes.push(getRandomCharacter())
        }
    }
}