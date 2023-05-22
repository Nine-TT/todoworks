import { createRouter, createWebHistory } from "vue-router"
import Home from "../Views/Home.vue"
import About from "../Views/About.vue"
import NotFound from "../components/NotFound.vue"
import Work from "../Views/Work.vue"
import Login from "../Views/Login.vue"

const routes = [
    {
        path: "/",
        name: "home-page",
        component: Home
    },

    {
        path: "/login",
        component: Login
    },

    {
        path: "/about",
        component: About
    },

    // Dynamic - params
    {
        path: "/work/:id",
        component: Work
    },

    // redirect 
    {
        path: "/home",
        redirect: "/"
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router