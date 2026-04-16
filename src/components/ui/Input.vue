<template>
    <label :class="['ui-input', type, { error: !validRegex }]">
        <slot name="before"/>

        <input :type="type" v-model="model"
            :placeholder="placeholder"
            :min="min"
            :max="max"
            :maxlength="max"

            @input="$emit('input', $event as any as InputEvent)"
            @change="$emit('change', $event as InputEvent)"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
        >

        <slot name="after"/>
    </label>
</template>

<script lang="ts" setup>

import { computed } from 'vue';

// * Types
type Type = 'text' | 'password' | 'number';

type InputEvent = Event & { target: HTMLInputElement };

interface Props {
    type: Type;
    disabled: boolean;
    placeholder: string;
    min: number;
    max: number;
    regex: RegExp;
}


const $slots = defineSlots<{
    before(): any;
    after(): any;
}>();


const model = defineModel('value');


const $emit = defineEmits({
    input(event: InputEvent) {
        return event;
    },
    change(event: InputEvent) {
        return event;
    },
    focus(event: FocusEvent) {
        return event;
    },
    blur(event: FocusEvent) {
        return event;
    }
});


const props = withDefaults(defineProps<Partial<Props>>(), {
    type: 'text'
});


const validRegex = computed(() => {
    return props?.regex && (model.value !== undefined && model.value !== null && String(model.value).trim() !== '') ? props?.regex?.test(String(model.value)) : true;
});

</script>

<style lang="scss" scoped>

.ui-input {
    display: flex;
    padding: 6px 10px;
    min-height: 32px;
    color: var(--hx-text-primary);
    font-size: 14px;
    border-radius: var(--hx-border-radius);
    border: 1px solid var(--hx-background-transparent);
    align-items: center;
    justify-self: start;
    background-color: var(--hx-background-secondary);
    transition: box-shadow .2s;
    box-sizing: border-box;
    user-select: none;
    overflow: hidden;

    &.error {
        border-color: var(--hx-color-red);
    }

    input {
        padding: 0;
        width: 100%;
        color: var(--hx-text-primary);
        font-size: 14px;
        border: none;
        background-color: transparent;
        outline: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type='number'] {
        -moz-appearance: textfield;
    }

    /* ? Type - number */
    &.number {
        input {
            margin: 0 6px;
            text-align: center;
        }
    }
}

.ui-input:has(> input:focus) {
    box-shadow: 0 0 0 3px var(--hx-background-secondary);
}

</style>