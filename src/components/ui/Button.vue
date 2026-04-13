<template>
    <button :class="['ui-button', variant]"
        :disabled="disabled"

        @click="$emit('click', $event)"
    >
        <slot/>
    </button>
</template>

<script lang="ts" setup>

export type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';

const $emit = defineEmits({
    click(event: MouseEvent) {
        return event;
    }
});


const props = withDefaults(defineProps<{
    variant?: ButtonVariant;
    disabled?: boolean;
}>(), {
    variant: 'default',
    disabled: false
});

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

.ui-button {
    display: flex;
    padding: var(--hx-padding-xl);
    min-height: 32px;
    color: #000;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    color: var(--hx-button-text-primary);
    border-radius: var(--hx-border-radius);
    background-color: var(--hx-button-background-primary);
    box-sizing: border-box;
    transition: filter .2s, box-shadow .2s, background-color .2s;
    gap: 4px;
}

:deep(svg.lucide) {
    width: 16px;
    height: 16px;
}

.ui-button:disabled {
    cursor: not-allowed;
    filter: brightness(0.8);
    opacity: .7;
}

.ui-button:not(:disabled):hover {
    cursor: pointer;
    filter: brightness(0.8);
}

.ui-button:not(:disabled):active {
    filter: brightness(0.6);
}

.ui-button.outline:not(:disabled):active {
    box-shadow: 0 0 0 3px var(--background-secondary);
}

.ui-button:hover .content,
.ui-button:hover .after,
.ui-button:hover .before {
    z-index: 2;
}
.ui-button .content:hover,
.ui-button .after:hover,
.ui-button .before:hover {
    z-index: 1;
}



.ui-button:disabled .content,
.ui-button .before:disabled,
.ui-button .after:disabled {
    cursor: not-allowed;
    filter: brightness(0.7);
}


/* ? Secondary style */
.ui-button.secondary {
    color: var(--hx-text-primary);
    background-color: #ffffff15;
}


/* ? Destructive style */
.ui-button.destructive {
    color: var(--hx-text-primary);
    background-color: var(--hx-color-red);
}


/* ? Outline style */
.ui-button.outline {
    color: var(--hx-text-primary);
    border: 1px solid var(--hx-background-transparent);
    background-color: var(--hx-background-secondary);
}


/* ? Ghost style */
.ui-button.ghost {
    color: var(--text-primary);
    background-color: transparent;
}

.ui-button.ghost:hover {
    background-color: #ffffff15;
}

</style>