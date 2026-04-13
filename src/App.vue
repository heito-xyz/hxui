<template>
    <main>
        <Dialog>
            <template v-slot="{ show }">
                <Button @click="show">
                    asdasdasd
                </Button>
            </template>

            <template #content>
                <div>asdasdasd</div>
            </template>
        </Dialog>

        <Group>
            <Button @click="a = 'test'">test</Button>
            <Input/>
            <Button @click="a = 'testt'">testt</Button>
            <Combobox :options="[
                {
                    value: 'asd'
                },
                {
                    value: 'asdasdas'
                }
            ]"/>
            <Select style="width: 256px;"
                :options="[
                    {
                        value: 'testt'
                    },
                    {
                        value: 'test'
                    }
                ]"
                :value="a"
            />
        </Group>

        <Popover>
            <template #default="{ toggle }">
                <Button @click="toggle">
                    Menu
                </Button>
            </template>

            <template #content>
                <Menu>
                    <MenuButton>
                        asd
                    </MenuButton>

                    <MenuSeparator/>

                    <MenuChildren>
                        <template #default>
                            <span>asdasd</span>
                        </template>
                        <template #content>
                            <MenuButton>
                                asd
                            </MenuButton>
                            <MenuButton>
                                asd
                            </MenuButton>
                        </template>
                    </MenuChildren>
                </Menu>
            </template>
        </Popover>
    </main>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

import { Button, Group, Dialog, Input, Select, Combobox, Menu, Popover, MenuButton, MenuSeparator, MenuChildren } from './components';

const a = ref('');

</script>

<style lang="scss" scoped>

main {
    display: flex;
    padding: 24px;
    flex-direction: column;
    gap: 12px;
}

</style>
