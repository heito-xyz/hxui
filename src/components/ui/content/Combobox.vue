<template>
    <div class="ui-combobox">
        <Select
            :options="filterOptions"

            @select="selectOption($event)"
        >
            <template v-slot="{ show, hide }">
                <Input
                    :placeholder="placeholder"
                    
                    v-model:value="model"
                    
                    @input="onValue($event as any, show, hide)"
                    @click="show"
                >
                    <template #after>
                        <ChevronsUpDown :size="16" style="margin-left: 8px; opacity: .5;"/>
                    </template>
                </Input>
            </template>
        </Select>
    </div>
</template>

<script lang="ts" setup generic="T extends string">

import { computed } from 'vue';

// * Components
import Select from '../Select.vue';
import Input from '../Input.vue';

// * Icons
import { ChevronsUpDown } from 'lucide-vue-next';

// * Types
import type { OptionOption } from '../../modules/ui/SelectOption.vue';


const $emit = defineEmits({
    select(data: OptionOption<T>) {
        return data;
    }
});

const props = defineProps<{
    placeholder?: string;
    options: Array<OptionOption<T>>;
}>();


const model = defineModel<T>('value', {
    required: false,
    default: ''
});


const filterOptions = computed(() => 
    props.options.filter(option => {
        const regex = new RegExp(String(model.value), 'gi');

        return regex.test(String(option.value));
    }).map(option => ({
        ...option,
        type: option?.type ?? 'option'
    }))
);


let hideEvent: (() => void) | null = null;
let timer: any;

function onValue(event: InputEvent, show: (event: MouseEvent) => void, hide: () => void) {
    clearTimeout(timer);

    timer = setTimeout(() => {
        model.value = (event.target as HTMLInputElement).value as T;

        $emit('select', { value: model.value });

        show({ currentTarget: event.target } as any)
    }, 500);

    hideEvent = hide;
}


function selectOption(option: OptionOption<T>) {
    $emit('select', option);

    model.value = option.value;

    if (hideEvent) hideEvent();
}

</script>

<style lang="scss" scoped>

.ui-combobox-options {
    max-height: 376px;
    overflow-x: hidden;

    :deep(.ui-button) {
        padding: 4px 8px;
        width: 100%;
        min-height: 16px;
        font-size: 12px;
        justify-content: start;
        border-radius: var(--hx-border-radius);

        &:disabled {
            pointer-events: none;
            font-weight: 700;
        }

        span {
            text-align: left;
        }
    }
}

</style>