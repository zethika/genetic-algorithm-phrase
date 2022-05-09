<script setup lang="ts">
import {computed} from "vue";

declare type acceptedColors = 'grey' | 'red' | 'green' | 'transparent' | 'blue';
const props = defineProps<{
    color?: acceptedColors,
}>()


const classes = computed(() => {
    let classes: Array<string> = ['cursor-pointer'];

    const color = typeof props.color === 'undefined' ? 'blue' : props.color;

    if(color !== 'transparent')
        classes.push('px-6');

    switch (color) {
        case "blue":
            return classes.concat(['text-white','bg-blue','hover:bg-blue-lightest'])
        case "grey":
            return classes.concat(['text-white','bg-grey','hover:bg-grey-lighter'])
        case "green":
            return classes.concat(['text-white','bg-blue','bg-green','hover:bg-green-lightest'])
        case "red":
            return classes.concat(['text-white','bg-red','hover:bg-red-lightest'])
        case "transparent":
            return classes.concat(['bg-transparent','text-grey','hover:text-blue'])
    }
})

</script>

<template>
    <div v-else class="flex items-center rounded-lg text-center h-10 transition-colors duration-200 ease-in-out" :class="classes">
        <slot v-else />
    </div>
</template>
