import { defineStore } from "pinia";
// @ts-ignore
export const usePersonState = defineStore("person", {
    state: () => ({
        username: "" as string,
        id: "" as string,
        isSelectedSpecies: false as boolean,
        isAdmin: false as boolean,
    }),
    actions: {
        clear() {
            this.username = "";
            this.id = "";
            this.isSelectedSpecies = false;
            this.isAdmin = false;
        },
    },
    persist: true,
});