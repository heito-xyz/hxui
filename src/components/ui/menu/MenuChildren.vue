<template>
    <div class="ui-menu-children" ref="el">
        <MenuButton :disabled="disabled"
            @click="onClick"
        >
            <slot/>

            <ChevronRight style="margin-left: auto;"/>
        </MenuButton>

        <div :class="['children-menu', { fixed: fixedMenu }]">
            <slot name="content"/>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref, onMounted, onUnmounted, type HTMLAttributes } from 'vue';

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

const fixedMenu = ref(false);

let target: HTMLElement | null = null;
let intersectionObserver: IntersectionObserver | null = null;
let timer: number;


function onClick() {
    fixedMenu.value = !fixedMenu.value;
}


onMounted(() => {
    if (!el?.value) return;
    
    target = el.value.querySelector('.children-menu')!;
    
    intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const isVisible = entry.isIntersecting && window.getComputedStyle(entry.target).display !== 'none';
            
            if (isVisible) {
                timer = setTimeout(() => {
                    fixedMenu.value = true;
                }, 500);
            } else if (!entry.isIntersecting) {
                fixedMenu.value = false;

                clearTimeout(timer);
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
        
        &:hover,
        &.fixed {
            display: flex;
        }
    }
}

</style>