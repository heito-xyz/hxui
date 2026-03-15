<template>
    <label class="ui-checkbox">
        <input type="checkbox"
            :name="name"
            :value="value"

            v-model="model"
        >

        <div>
            <div></div>
        </div>

        <div class="content">
            <slot>
                <span>{{ label }}</span>
            </slot>
        </div>
    </label>
</template>

<script lang="ts" setup>

const model = defineModel();

withDefaults(defineProps<{
    label?: string;
    name: string;
    value?: string | number | boolean;
}>(), {
    value: false
});

</script>

<style lang="css" scoped>

.ui-checkbox {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    user-select: none;

    input {
        display: none;
    }

    input + div {
        margin-right: 8px;
        width: 32px;
        height: 18px;
        border-radius: 25px;
        background-color: var(--hx-background-transparent);
        transition: .2s;

        div {
            margin: 1px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: var(--hx-text-primary);
            transition: .2s;
        }
    }

    input:checked + div {
        background-color: var(--hx-text-primary);
        
        div {
            margin: 1px 1px 1px 15px;
            background-color: var(--hx-background-primary);
        }
    }
}

</style>