<script setup lang="ts" generic="T">
import {onClickOutside} from "@vueuse/core";
import {computed, ref} from "vue";
import {get} from "lodash-es";

const modelValue = defineModel<T>()

const props = defineProps<{
  options: Array<T>
  label: string
  trackBy: string
}>();

const focused = ref<Boolean>(false)
const header = ref(null)

const toggleFocus = (e: Event) => {
  if (e.type === 'focusin') focused.value = true
  if (e.type === 'click') focused.value = !focused.value;
};

onClickOutside(header, () => focused.value = false)

const selectOption = (option: T) => modelValue.value = option;
const isSelectedClass = (option: T) => modelValue.value === option;

const displaySelectedOption = computed(() => get(modelValue.value, props.label) || "Не выбрано");
</script>

<template>
  <div>
    <div ref="header"
         @click="toggleFocus"
         class="p-3 border rounded cursor-pointer bg-neutral-800 hover:bg-neutral-700 transition ease-in-out delay-20">
      {{ displaySelectedOption }}
    </div>

    <ul v-if="focused"
        class="absolute border bg-neutral-800 my-1">
      <li v-for="(option, i) in props.options"
          :key="i"
          :class="[
              { 'font-bold': isSelectedClass(option) },
              'p-2 border cursor-pointer hover:bg-neutral-700 transition ease-in-out delay-20 hover:scale-105'
          ]"
          @click="selectOption(option)"
      >
        {{ get(option, props.label) }}
      </li>
    </ul>
  </div>
</template>