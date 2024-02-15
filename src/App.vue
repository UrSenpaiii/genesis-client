<script setup lang="ts">
import Button from "./components/Button.vue";
import Dashboard from "./components/Dashboard.vue";
import Dropdown from "./components/Dropdown.vue";
import {ref} from "vue";
import {useTypeStore} from "./stores/TypeStore.ts";
import axios from "axios";
import {useInstanceStore} from "./stores/InstancesStore.ts";
import InstanceItem from "./components/InstanceItem.vue";
import {CreateInstanceRes, Instance, SelectItem, Token} from "./My.types.ts";

const instanceTypes = useTypeStore()?.data
const instanceStore = useInstanceStore()

const selectedType = ref<SelectItem>()
const isAuthorized = ref<boolean>(false)
const accessToken = ref<string>('')
const baseDomain = ref<string>('')

const auth = (data: Token): void => {
  accessToken.value = data.access_token
  baseDomain.value = data.base_domain

  isAuthorized.value = true
}

const generateInstanceName = (): string => {
  const univers: string = 'C' + Math.floor(Math.random() * 1000)
  const name: string | undefined = selectedType.value?.instanceNamePrefix

  return `${name} ${univers}`
}

const addInstanceId = (id: number, type: string): void => {
  getInstanceReq(type, id).then(r => instanceStore.add(r.id, r.name))
}

const accessTokenReq = async (): Promise<Token> =>
    await axios.get('/auth').then(
        (response) => response.data,
        (e) => console.log(e)
    )

const createInstanceReq = async (instanceType: [string]): Promise<CreateInstanceRes> =>
    await axios.post(`/create/${instanceType}`, [baseDomain.value, accessToken.value, {name: generateInstanceName()}]
    ).then(
        (response) => response.data,
        (e) => console.log(e)
    )

const getInstanceReq = async (instanceType: string, instanceId: number): Promise<Instance> =>
    await axios.post(`/get/${instanceType}/${instanceId}`, [baseDomain.value, accessToken.value]
    ).then(
        (response) => response.data,
        (e) => console.log(e)
    )
</script>

<template>
  <div class="flex flex-col items-center w-[400px]">
    <div class="flex flex-col p-2">
      <div :class="['mb-4 text-2xl',isAuthorized ? 'text-green-400' : 'text-red-400']">
        {{ isAuthorized ? "Вы успешно авторизованны!" : "Нажмите кнопку для авторизации:" }}
      </div>
      <Button placeholder="Авторизоваться"
              hasPreloader preloaderPlaceholder="Обработка"
              :is-disabled="isAuthorized"
              :clickHandle="accessTokenReq"
              @handled="(r: Token) => auth(r)"
      />
    </div>

    <hr class="h-px my-6 w-full bg-neutral-500 border-0">

    <div class="flex flex-col items-center w-72 p-2">
      <dashboard>
        <div v-if="!instanceStore.instances.length">Пусто :(</div>
        <instance-item v-for="(instance, i) in instanceStore.instances"
                       :instance="instance" :index="i+1"
        />
      </dashboard>

      <div class="mb-4 w-32">
        <dropdown v-model="selectedType"
                  :options="instanceTypes"
                  track-by="type" label="displayName"
        />
      </div>
    </div>

    <Button placeholder="Создать"
            hasPreloader preloaderPlaceholder="Обработка"
            :is-disabled="!isAuthorized || !selectedType"
            :clickHandle="createInstanceReq"
            :handlerParams="[selectedType?.type]"
            @handled="(r: number) => addInstanceId(r, selectedType.type)"
    />
  </div>
</template>