<template>
    <div class="ui-menu-label">
        <slot/>
    </div>
</template>

<script lang="ts" setup>



</script>

<style lang="scss" scoped>

.ui-menu-label {
    display: flex;
    padding: var(--hx-padding-xl);
    font-size: 14px;
    font-weight: 600;
    align-items: center;

    ::v-deep(svg.lucide) {
        margin-right: 8px;
        width: 16px;
        height: 16px;
    }
}

</style>