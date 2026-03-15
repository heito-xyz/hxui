<template>
    <button class="ui-menu-button" :disabled="disabled">
        <slot/>
    </button>
</template>

<script lang="ts" setup>

defineProps<{
    disabled?: boolean;
}>();

</script>

<style lang="scss" scoped>

button {
    display: flex;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    user-select: none;
}

.ui-menu-button {
    cursor: pointer;
    display: flex;
    padding: var(--hx-padding-xl);
    width: 100%;
    min-height: 32px;
    color: var(--hx-text-primary);
    font-size: 14px;
    white-space: nowrap;
    align-items: center;
    border-radius: var(--hx-border-radius);
    transition: background-color .2s;

    &:not(:disabled):hover {
        background-color: #ffffff15; // var(--hx-background-primary);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: .7;
    }

    ::v-deep(svg.lucide) {
        width: 16px;
        height: 16px;

        &:nth-child(1) {
            margin-right: 8px;
        }
    }
}

</style>