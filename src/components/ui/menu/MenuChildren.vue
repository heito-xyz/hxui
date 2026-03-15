<template>
    <div class="ui-menu-children" ref="el">
        <MenuButton :disabled="disabled">
            <slot/>

            <ChevronRight/>
        </MenuButton>

        <div class="children-menu">
            <slot name="content"/>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref, onMounted, onUnmounted } from 'vue';

import MenuButton from './MenuButton.vue';

import { ChevronRight } from 'lucide-vue-next';


type OptionType = 'button' | 'seperator';

interface Option {
    type: OptionType;
}

defineProps<{
    disabled?: boolean;
    options?: Array<Option>;
}>();


const el = ref<HTMLDivElement>();

let target: HTMLElement | null = null;
let intersectionObserver: IntersectionObserver | null = null;


onMounted(() => {
    if (!el?.value) return;
    
    target = el.value.querySelector('.children-menu')!;
    
    intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const isVisible = entry.isIntersecting && window.getComputedStyle(entry.target).display !== 'none';
            
            if (isVisible) {
                console.log('🎉 Элемент появился!', new Date().toLocaleTimeString());
                // Ваш код при появлении
            } else if (!entry.isIntersecting) {
                console.log('👋 Элемент скрылся!', new Date().toLocaleTimeString());
                // Ваш код при скрытии
            }
        });
    }, {
        threshold: 0.01
    });
    
    intersectionObserver.observe(target);
});

onUnmounted(() => {
    if (target) intersectionObserver?.unobserve(target);
});

</script>

<style lang="scss" scoped>

.ui-menu-children {
    position: relative;

    :deep(.ui-menu-button) {
        &:not(:disabled):hover {
            & + .children-menu {
                display: flex;
            }
        }

        svg.lucide:last-child {
            margin-left: auto;
        }
    }

    .children-menu {
        display: none;
        padding: 4px;
        max-width: 256px;
        min-width: 128px;
        position: absolute;
        top: -5px;
        left: calc(100% + 8px);
        border-radius: var(--hx-border-radius);
        border: 1px solid var(--hx-background-transparent);
        background-color: var(--hx-background-secondary);
        flex-direction: column;
        transition: opacity .2s;
        box-sizing: border-box;
        
        &:hover {
            display: flex;
        }
    }
}

</style>