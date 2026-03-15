<template>
    <slot
        :show="show"
        :hide="hide"
        :toggle="toggle"
        :isOpened="isOpened"
    />

    <Teleport to="body">
        <Transition :name="typeof transition === 'string' ? transition : transition?.name">
            <div :class="['dialog', ...dialogSide]" v-show="isOpened"
                :style="{ '--gap-v': dialogPadding[0] + 'px', '--gap-h': dialogPadding[1] + 'px' }"
            >
                <div class="background"
                    @click.prevent.stop="closeOnClickOutside && hide()"
                ></div>

                <div class="content" :style="style">
                    <div class="header" v-if="isShowedHeader">
                        <h2>
                            <slot name="title">
                                {{ title }}
                            </slot>
                        </h2>

                        <p>
                            <slot name="description">
                                {{ description }}
                            </slot>
                        </p>
                    </div>

                    <slot name="content"
                        :show="show"
                        :hide="hide"
                        :toggle="toggle"
                        :isOpened="isOpened"
                    />

                    <div class="buttons">
                        <div @click="hide">
                            <X :size="16"/>
                        </div>

                        <div v-for="(button, idx) of buttons" :key="idx"
                            @click.prevent.stop="button?.click?.($event)"
                        ></div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>

import { ref, computed, type StyleValue } from 'vue';

import { X } from 'lucide-vue-next';

// * Types
export type Side = 'top' | 'right' | 'bottom' | 'left' | 'center';

export type Align = 'start' | 'end';

export interface DefaultSlotProps {
    show(event: MouseEvent): void;
    hide(): void;
    toggle(event: MouseEvent): void;
    isOpened: boolean;
}

export interface DialogButton {
    icon?: string;
    label: string;
    text?: string;
    click?: (event: MouseEvent) => void;
}

type TransitionOptions = string | {
    name: string;
};

const $slots = defineSlots<{
    default(props: DefaultSlotProps): void;
    content(props: DefaultSlotProps): void;
    title(): void;
    description(): void;
}>();

const $emit = defineEmits<{
    (e: 'update:open', bool: boolean): void;
    (e: 'show'): void;
    (e: 'hide'): void;
}>();

const props = withDefaults(defineProps<{
    title?: string;
    description?: string;
    side?: Side | [Side, Align];
    transition?: TransitionOptions;
    collisionPadding?: number | [number, number];
    closeOnClickOutside?: boolean;
    buttons?: Array<DialogButton>;
    style?: StyleValue;
}>(), {
    side: () => 'center',
    transition: () => 'show-dialog',
    collisionPadding: () => 24,
    closeOnClickOutside: true,
    buttons: () => []
});

const isOpened = ref<boolean>(false);

const dialogSide = computed(() => typeof props.side === 'string' ? [props.side, 'center'] : props.side);
const dialogPadding = computed(() => typeof props.collisionPadding === 'number' ? [props.collisionPadding, props.collisionPadding] : props.collisionPadding);

const isShowedHeader = computed(() => {
    return Boolean(props.title) || Boolean(props.description) || Boolean($slots.title) || Boolean($slots.description);
})

let targetEvent: MouseEvent | null = null;

function setOpen(bool: boolean) {
    isOpened.value = bool;

    $emit('update:open', bool);
}

function show(event: MouseEvent) {
    setOpen(true);

    targetEvent = event;

    $emit('show');
}

function hide() {
    setOpen(false);

    targetEvent = null;

    $emit('hide');
}

function toggle(event: MouseEvent) {
    if (isOpened.value) hide();
    else show(event);
}

</script>

<style lang="scss" scoped>

.show-dialog-enter-active,
.show-dialog-leave-active {
    opacity: 0;

    .content {
        transform: scale(.65);
    }
}


.dialog {
    display: flex;
    padding: var(--gap-v, 4px) var(--gap-h, 4px);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: .2s;
    z-index: 205;

    &.center,
    &.right,
    &.left {
        &.start { align-items: start; }
        &.end { align-items: end; }
    }

    &.top,
    &.bottom {
        &.start { justify-content: start; }
        &.end { justify-content: end; }
    }

    &.center { justify-content: center; }
    &.top { align-items: start; }
    &.right { justify-content: end; }
    &.bottom { align-items: end; }
    &.left { justify-content: start; }

    &.right,
    &.top.end,
    &.bottom.end {
        .buttons {
            left: -36px;
        }
    }


    .background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #00000095;
        transition: 2s;
        z-index: 1;
    }

    .content {
        padding: 12px;
        position: relative;
        color: var(--hx-text-primary);
        border-radius: var(--hx-border-radius);
        border: 1px solid var(--hx-background-transparent);
        background-color: var(--hx-background-secondary);
        transition: transform .2s;
        z-index: 2;

        .header {
            margin-bottom: 12px;

            h2 {
                font-size: 18px;
                font-weight: 600;
            }

            p {
                margin-top: 4px;
                font-size: 14px;
                opacity: .7;
            }
        }
    }

    .buttons {
        position: absolute;
        top: 0;
        left: calc(100% + 12px);

        div {
            cursor: pointer;
            display: flex;
            width: 28px;
            height: 28px;
            border-radius: var(--hx-border-radius);
            border: 1px solid var(--hx-background-transparent);
            align-items: center;
            justify-content: center;
            background-color: var(--hx-background-secondary);
        }
    }
}

</style>