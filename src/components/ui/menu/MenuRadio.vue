<template>
    <label class="ui-menu-radio">
        <input type="radio" :name="name" :value="value"
            v-model="modal"
        >

        <div></div>

        <slot>
            <span>{{ label }}</span>
        </slot>
    </label>
</template>

<script lang="ts" setup>

const modal = defineModel();

defineProps<{
    name: string;
    label?: string;
    value: string | number | boolean;
}>();

</script>

<style lang="scss" scoped>

.ui-menu-radio {
    cursor: pointer;
    display: flex;
    padding: var(--hx-padding-xl);
    width: 100%;
    min-height: 32px;
    font-size: 14px;
    align-items: center;
    border-radius: var(--hx-border-radius);
    transition: background-color .2s;
    box-sizing: border-box;

    &:hover {
        background-color: #ffffff15;
    }

    & > div:nth-child(2) {
        display: flex;
        margin-right: 8px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid var(--hx-background-transparent);
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        transition: .2s;
    }

    input {
        display: none;
    
        &:checked + div:nth-child(2) {
            border-width: 5px;
            background-color: var(--hx-text-primary);
        }
    }
}

</style>