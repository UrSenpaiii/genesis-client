import {defineStore} from 'pinia'

export const useTypeStore = defineStore('typeStore', {
    state: () => ({
        data: [{
            type: 'leads',
            displayName: "Сделка",
            instanceNamePrefix: "Rick"
        },{
            type: 'contacts',
            displayName: "Контакт",
            instanceNamePrefix: "Morty"
        },{
            type: 'companies',
            displayName: "Компания",
            instanceNamePrefix: "Summer"
        }]
    })
})