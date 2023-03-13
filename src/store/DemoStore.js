import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useDemoStore = defineStore('demo', () => {
    let a = ref(0)
    let b = ref([1])
    let c = ref([1])
    
  
    return {a,b,c}
  
  }, {
    persist: {
      enable:true,
      storage: sessionStorage,
      debug:true,
    }
  }
  )