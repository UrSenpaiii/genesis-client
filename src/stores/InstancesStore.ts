import {defineStore} from 'pinia'
import {ref} from "vue";
import {Instance} from "../My.types.ts";

export const useInstanceStore = defineStore('instanceStore', () => {
    const instances = ref<Array<Instance>>([])

    const add = (id: number, name: string) => instances.value.push({id, name})

    return {instances, add}
})