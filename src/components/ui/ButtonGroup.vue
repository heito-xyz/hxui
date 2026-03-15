<template>
    <div class="ui-button-group">
        <slot/>
    </div>
</template>

<script lang="ts" setup>



</script>

<style lang="scss" scoped>

.ui-button-group {
    display: flex;
    margin-top: 12px;
    align-items: center;
    justify-content: end;

        ::v-deep(.ui-button) {
        border-radius: 0;
    }

    ::v-deep(> :first-child) {
        .ui-button,
        &.ui-button {
            border-top-left-radius: var(--hx-border-radius-left-top);
            border-bottom-left-radius: var(--hx-border-radius-left-bottom);
        }
    }

    ::v-deep(> :last-child) {
        .ui-button,
        &.ui-button {
            border-top-right-radius: var(--hx-border-radius-right-top);
            border-bottom-right-radius: var(--hx-border-radius-right-bottom);
        }
    }

    ::v-deep(> :not(:last-child)) {
        .ui-button,
        &.ui-button {
            border-right: 1px solid var(--hx-background-secondary);
        }
    }
}

</style>