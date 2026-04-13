<template>
    <div class="ui-button-group">
        <slot/>
    </div>
</template>

<style lang="scss" scoped>

.ui-button-group {
    display: flex;
    margin-top: 12px;
    align-items: center;
    justify-content: end;

    :deep([class^="ui-"]) {
        min-height: 32px;
        border-radius: 0;
    }

    :deep(> :first-child) {
        [class^="ui-"],
        &[class^="ui-"] {
            border-top-left-radius: var(--hx-border-radius-left-top);
            border-bottom-left-radius: var(--hx-border-radius-left-bottom);
        }
    }

    :deep(> :last-child) {
        [class^="ui-"],
        &[class^="ui-"] {
            border-top-right-radius: var(--hx-border-radius-right-top);
            border-bottom-right-radius: var(--hx-border-radius-right-bottom);
        }
    }

    :deep(> :not(:last-child)) {
        [class^="ui-"],
        &[class^="ui-"] {
            // margin-right: 1px;
            border-right: 1px solid var(--hx-background-secondary);
        }
    }
}

</style>