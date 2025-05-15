import { defineStore } from "pinia";
// @ts-ignore
export const useCharStore = defineStore("char", {
    state: () => ({
        id: "" as string,
        species: "",
        speciesName: "",
        gameStats: {
            level: 1,
            freeCount: 0,
            maxEnergy: 10,
            currentEnergy: 10,
            currentExp: 0,
        },
        stats: {
            "hp": 1,
            "mp": 1,
            "dodge": 20,
            "speed": 1,
            "attack": 1,
            "defence": 0,
            "critical": 0,
            "hitChance": 50,
        },
        professions: [] as any,
    }),
    actions: {
        setCharacter(data: any) {
            this.species = data.species;
            this.speciesName = data.species_name;
            this.stats = data.stats;
            this.gameStats = data.game_stats;
            this.professions = data.professions;
        },
        setValChars(val: number, type: string): void {
            // @ts-ignore
            this.stats[type] = this.stats[type] + val;
        },
        setUpLevel() {
            this.gameStats.level += 1;
            this.gameStats.freeCount += 1;
        },
    },
    persist: true,
});