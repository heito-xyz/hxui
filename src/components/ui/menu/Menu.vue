<template>
    <div class="ui-menu">
        <slot>

        </slot>
    </div>
</template>

<script lang="ts" setup>

type OptionType = 'button' | 'seperator';

interface Option {
    type: OptionType;
}

defineProps<{
    options?: Array<Option>;
}>();

</script>

<style lang="scss" scoped>

.ui-menu {
    display: flex;
    flex-direction: column;
}

</style>