import { createStore } from "vuex";
import {en} from './en'
import {vi} from './vi'
export const store = createStore({
  state() {
    return {
        vi: false,
        enContent: en,
        viContent: vi,
    }
  }
});
