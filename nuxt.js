import { defineNuxtModule, addComponent } from '@nuxt/kit';

// * Components
import * as components from '@heito/hxui';

export default defineNuxtModule({
    meta: {
        name: 'hxui',
        configKey: 'hxUI'
    },
    defaults: {
        prefix: 'UI'
    },
    setup(options, nuxt) {
        for (const componentKey in components) {
            if (componentKey === 'default') continue;
            
            addComponent({
                name: options.prefix + componentKey,
                mode: 'client',
                export: componentKey,
                filePath: '@heito/hxui'
            });
        }

        nuxt.options.css.push('@heito/hxui/styles');
    }
});