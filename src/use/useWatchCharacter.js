import { watch } from "vue"

export function useWatchCharacter(valueToWacth,maxChars) {
    watch(valueToWacth, (newValue) => {
        if (newValue.length === maxChars) {
          alert(`Only ${ maxChars } characters allowed!`)
        }
      })
}