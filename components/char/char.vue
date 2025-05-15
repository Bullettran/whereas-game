<script lang="ts">
import { defineComponent } from "vue";
import { useCharStore } from "~/stores/char";

export default defineComponent({
    name: "Char",
    async setup() {
        const char = useCharStore();
        const inventory = reactive([
            { id: "herb-green", name: "Зеленая трава", icon: "🌿", count: 20, type: "material", description: "Простая трава" },
            { id: "beast-milk", name: "Молоко зверя", icon: "⚗️", count: 40, type: "material", description: "Простое молоко" },
            {
                id: "shield1", name: "Щит", icon: "🛡️", count: 1, type: "equip", description: "Щит со статами", stats: {
                    str: 1,
                    def: 0,
                    luc: 0,
                    spd: 0,
                    int: 0,
                    acc: 0,
                    vit: 1,
                    agi: 0,
                },
                set: {
                    type: "",
                },
            },
            {
                id: "weapon1", name: "Мечи", icon: "⚔️", count: 1, type: "weapon",
                description: "Оружие со статами",
                stats: {
                    str: 1,
                    def: 0,
                    luc: 0,
                    spd: 2,
                    int: 0,
                    acc: 0,
                    vit: 0,
                    agi: 0,
                },
                set: {
                    type: "",
                },
                buffs: {
                    value: 0,
                    type: "",
                },
            },
            {
                id: "potion1",
                name: "Зелье маны",
                icon: "️🧪",
                count: 2,
                type: "potion",
                description: "Восполняет ману на 1 ед.",
                buffs: {
                    value: 1,
                    type: "mp",
                },
            },
        ]);

        return {
            char,
            inventory,
        };
    },
    methods: {
        onUpChars(val: number, type: string): void {
            this.char.gameStats.freeCount = this.char.gameStats.freeCount - 1;
            // todo(kharal): Запрос на бек
            this.char.setValChars(val, type);
        },
        profPercentage(exp:number, needExp: number): any {
            return (exp / needExp) * 100;
        }
    },
    computed: {
        // Процент EXP
        expPercentage(): any {
            const expNeeded = this.char.gameStats.level * 10;
            // Если опыт превышает необходимый для уровня
            if (this.char.gameStats.currentExp >= expNeeded) {
                const excessExp = this.char.gameStats.currentExp - expNeeded;
                this.char.setUpLevel();
                this.char.gameStats.currentExp = excessExp; // Переносим избыточный опыт
                // Рекурсивно проверяем, не хватает ли избыточного опыта для следующего уровня
                if (this.char.gameStats.currentExp >= this.char.gameStats.level * 10) {
                    return this.expPercentage;
                }
            }
            return (this.char.gameStats.currentExp / expNeeded) * 100;
        },
    },
    mounted() {
    }
});
</script>

<template>
    <div class="char">
        <button class="char__button button" type="button" data-bs-toggle="modal"
                data-bs-target="#chars-stats">
            <nuxt-img class="char__image" :src="`/images/sprites/persons/${char.species}/icon-${char.species}.png`"
                      alt="Иконка персонажа" />
        </button>
    </div>
    <Modal size="lg" id="chars-stats">
        <div class="block">
            <div class="block__block">
                <div class="block__wrapper">
                    <h3 class="block__title">Характеристики</h3>
                    <div class="block__counts">Доступно очков {{ char.gameStats.freeCount }}</div>
                </div>
                <div class="block__characteristic characteristic">
                    <ul class="characteristic__main list">
                        <li class="characteristic__item">
                            <div class="characteristic__name">Атака</div>
                            <div class="characteristic__value">
                                {{ char.stats.attack }}
                                <button v-if="char.gameStats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'attack')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Крит. шанс</div>
                            <div class="characteristic__value">
                                {{ char.stats.critical }}%
                                <button v-if="char.gameStats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'critical')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Здоровье</div>
                            <div class="characteristic__value">
                                {{ char.stats.hp }}
                                <button v-if="char.gameStats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'hp')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Мана</div>
                            <div class="characteristic__value">
                                {{ char.stats.mp }}
                                <button v-if="char.gameStats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'mp')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Меткость</div>
                            <div class="characteristic__value">
                                {{ char.stats.hitChance }}%
                                <button v-if="char.gameStats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'hitChance')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Шанс уворота</div>
                            <div class="characteristic__value">
                                {{ char.stats.dodge }}
                                <button v-if="char.gameStats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'dodge')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Скорость</div>
                            <div class="characteristic__value">
                                {{ char.stats.speed }}
                                <button v-if="char.gameStats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'speed')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Защита</div>
                            <div class="characteristic__value">
                                {{ char.stats.defence }}
                                <button v-if="char.gameStats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'defence')">+
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="block__line"></div>
                <div class="block__wrapper">
                    <h3 class="block__title">Профессии</h3>
                    <div class="block__level">Ур. {{ char.gameStats.level }}</div>
                    <div class="block__exp">
                        <ProgressBar class="block__progress" :value="expPercentage" :showValue="false"></ProgressBar>
                        <div class="block__value">
                            Опыт {{ char.gameStats.currentExp }}/{{ char.gameStats.level * 10 }}
                        </div>
                    </div>
                </div>

                <div class="block__professions prof">
                    <div class="prof__item" v-for="(prof, index) in char.professions" :key="index">
                        <div class="prof__name">{{prof?.short}}</div>
                        <div class="prof__exp">
                            <div class="prof__wrap">
                                <ProgressBar class="prof__progress" :value="profPercentage(prof.exp, prof.needExp)" :showValue="false"></ProgressBar>
                                <div class="prof__description">
                                    Опыт
                                    <div class="prof__value">
                                        {{ prof.exp }}/{{ prof?.needExp }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="prof__lvl">Ур. {{prof?.lvl}}</div>
                    </div>
                </div>
            </div>
            <div class="block__wrap">
                <Equip />
                <Inventory :inventory="inventory" />
            </div>
        </div>
    </Modal>
</template>

<style scoped lang="scss">
@use "char";
@use "block";
@use "characteristic";
@use "prof"
</style>