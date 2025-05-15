<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Index",
});
</script>

<template>
    <div class="start">
        <div class="start__container container">
            <div class="start__title">
                <dynamicTitle/>
            </div>
            <div class="start__buttons">
                <button type="button" class="start__button animated-button7" data-bs-toggle="modal"
                        data-bs-target="#registration">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Зарегистрироваться
                </button>
                <button type="button" class="start__button animated-button6" data-bs-toggle="modal"
                        data-bs-target="#auth">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Войти
                </button>
            </div>
            <Modal size="sm" id="auth">
                <Auth/>
            </Modal>
            <Modal size="sm" id="registration">
                <Registration/>
            </Modal>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/index/styles";
</style>