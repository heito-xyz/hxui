<template>
    <div :class="['ui-select', { selected: Boolean(selectedOption) }]">
        <Popover :side="side" :style="{ width: `${width}px` }">
            <template v-slot="{ toggle }">
                <Button variant="outline" :disabled="disabled"
                    @click.prevent.stop="onClick($event, toggle)"
                >
                    <span>{{ selectedOption ? (selectedOption?.label || selectedOption?.value) : placeholder }}</span>

                    <ChevronsUpDown style="opacity: .5;"/>
                </Button>
            </template>

            <template #content>
                <div class="options">
                    <template v-for="(option, index) in listOptions" :key="index">
                        <template v-if="option?.type === 'label' || option?.type === 'separator' || (option.type === 'option' && option?.useDefaultStyle === true)">
                            <SelectOption :option="option"
                                @click="onSelectOption(option)"
                            />
                        </template>
        
                        <template v-else>
                            <slot name="option"
                                v-bind="{ option, index, select: () => onSelectOption(option) }"
                            >
                                <SelectOption :option="option"
                                    @click="onSelectOption(option)"
                                />
                            </slot>
                        </template>
                    </template>
                </div>
            </template>
        </Popover>
    </div>
</template>

<script lang="ts" setup>

import { computed, ref } from 'vue';

// * Components
import Button from './Button.vue';
import Popover from './Popover.vue';
import SelectOption, { type OptionOption, type Option, type OptionType } from '../modules/ui/SelectOption.vue';
import { ChevronsUpDown } from 'lucide-vue-next';


const $emit = defineEmits({
    select(option: OptionOption) {
        return option;
    }
});


const props = withDefaults(defineProps<{
    value?: string | number | boolean;
    placeholder?: string;
    disabled?: boolean;
    side?: 'top' | 'bottom';
    options?: Array<Option & Partial<{ type: OptionType }>>;
}>(), {
    side: 'bottom',
    disabled: false
});


const width = ref<number>(169);
const selectedValue = ref<string | number | boolean>(props?.value!);


const listOptions = computed(() => 
    (props.options?.map(({ type, ...opt }) => ({
        type: type ?? 'option',
        ...opt
    })) ?? []) as Array<Option>
);

const selectedOption = computed(() => 
    (listOptions.value as Array<OptionOption>).find(o => o.type === 'option' && o.value === selectedValue.value) ?? null
);


let togglePopover: (() => void) | null;


function onSelectOption(option: Option) {
    if (option.type !== 'option') return;

    selectedValue.value = option?.value;

    $emit('select', option);

    if (togglePopover) togglePopover();
}


function onClick(event: MouseEvent, toggle: (event: MouseEvent) => void) {
    const target = event?.currentTarget as HTMLElement;

    if (!target) return;

    toggle(event);

    togglePopover = () => toggle(event);

    width.value = Math.min(Math.max(target?.clientWidth, 169), window.innerWidth > 512 ? 512 : (window.innerWidth - 24));
}

</script>

<style lang="css" scoped>

.show-select-options-enter-active,
.show-select-options-leave-active {
    opacity: 0;
}


.ui-select {
    position: relative;
    user-select: none;
}

.ui-button {
    width: 100%;
}

::v-deep(.ui-button) {
    font-size: 14px;
    justify-content: space-between;
}

::v-deep(.ui-button) span {
    opacity: 0.7;
}

.ui-select.selected ::v-deep(.ui-button) span {
    opacity: 1;
}


.ui-select .options {
    display: flex;
    margin: 4px 0;
    padding: 8px;
    max-width: 512px;
    width: clamp(169px, var(--width), 512px);
    min-width: 169px;
    position: fixed;
    border-radius: var(--hx-border-radius);
    border: 1px solid var(--hx-background-transparent);
    flex-direction: column;
    background-color: var(--hx-background-secondary);
    transform: translateX(calc(var(--width) / 2 - 50%));
    transition: opacity .2s;
    box-sizing: border-box;
    z-index: 101;
}

</style>