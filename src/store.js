import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
    state() {
        return {
            count: 1000000,
            label_name: '',
            todoWorks: [],
            listWorks: []
        }
    },

    getters: {
        getTodoWorks(state) {
            return state.todoWorks;
        }
    },

    mutations: {
        increment(state) {
            state.count++
        },

        updateListWork(state, listWorks) {
            state.listWorks = listWorks
        },

        updateLabelName(state, name) {
            state.label_name = name
        },

        setTodoWorks(state, todoWorks) {
            state.todoWorks = todoWorks;
        }

    },

    actions: {
        updateCount(context) {
            context.commit("increment")
        },

        async fetchAllListWorks({ commit }) {
            const res = await axios.get('https://todo-work-98b72-default-rtdb.asia-southeast1.firebasedatabase.app/todoworks.json')
            commit('updateListWork', res.data)
        },

        changLabelName({ commit }, name) {
            commit("updateLabelName", name)
        },

        async fetchTodoWorks(context) {
            try {
                const response = await axios.get('https://todo-work-98b72-default-rtdb.asia-southeast1.firebasedatabase.app/todoworks.json');
                const todoWorks = response.data;

                context.commit('setTodoWorks', todoWorks);
            } catch (error) {
                console.error(error);
            }
        }
    },


})

export default store;