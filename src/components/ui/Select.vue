<template>
    <div :class="['ui-select', { selected: Boolean(selectedOption) }]">
        <Popover :side="side" :style="{ 'max-width': `${width}px`, width: `${width}px` }">
            <template v-slot="slot">
                <slot v-bind="{
                    ...slot,
                    show: (event: MouseEvent) => {
                        return onClick(event, slot.toggle)
                    }
                }">
                    <Button variant="outline" :disabled="disabled"
                        @click.prevent.stop="onClick($event, slot.toggle)"
                    >
                        <span>{{ selectedOption ? (selectedOption?.label || selectedOption?.value) : placeholder }}</span>

                        <ChevronsUpDown style="opacity: .5;"/>
                    </Button>
                </slot>
            </template>

            <template #content>
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
            </template>
        </Popover>
    </div>
</template>

<script lang="ts" setup generic="T">

import { ref, computed, watch, onMounted } from 'vue';

// * Components
import Button from './Button.vue';
import Popover from './Popover.vue';
import SelectOption, { type OptionOption, type Option, type OptionType } from '../modules/ui/SelectOption.vue';

// * Icons
import { ChevronsUpDown } from 'lucide-vue-next';


const $emit = defineEmits({
    select(option: OptionOption<T>) {
        return option;
    }
});


const props = withDefaults(defineProps<{
    value?: T;
    placeholder?: string;
    disabled?: boolean;
    side?: 'top' | 'bottom';
    options: Array<Option<T> & Partial<{ type: OptionType }>>;
}>(), {
    side: 'bottom',
    disabled: false
});


const width = ref<number>(169);
const selectedValue = ref<T>(props?.value!);


const listOptions = computed(() => 
    (props.options?.map(({ type, ...opt }) => ({
        type: type ?? 'option',
        ...opt
    })) ?? []) as Array<Option>
);

const selectedOption = computed(() => 
    (listOptions.value as Array<OptionOption<T>>).find(o => o.type === 'option' && o.value === selectedValue.value) ?? null
);


let togglePopover: (() => void) | null;


function onSelectOption(option: Option) {
    if (option.type !== 'option') return;

    selectedValue.value = option?.value;

    $emit('select', option as OptionOption<T>);

    if (togglePopover) togglePopover();
}


function onClick(event: MouseEvent, toggle: (event: MouseEvent) => void) {
    const target = event?.currentTarget as HTMLElement;

    if (!target) return;

    toggle(event);

    togglePopover = () => toggle(event);

    width.value = Math.min(Math.max(target?.clientWidth, 169), window.innerWidth > 512 ? 512 : (window.innerWidth - 24));
}


watch(() => props.value, value => {
    if (value !== undefined) selectedValue.value = value;
});

onMounted(() => {
    if (props.value !== undefined) selectedValue.value = props.value;
});

</script>

<style lang="scss" scoped>

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

:deep(.ui-button) {
    font-size: 14px;
    justify-content: space-between;

    span {
        opacity: 0.7;
    }
}

.ui-select.selected ::v-deep(.ui-button) span {
    opacity: 1;
}

</style>