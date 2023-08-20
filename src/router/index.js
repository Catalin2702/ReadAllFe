import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/view/HomeView.vue";
import ExploreView from "@/view/ExploreView.vue";
import SettingsView from "@/view/SettingsView.vue";
import AccountView from "@/view/AccountView.vue";
import ReaderView from "@/view/ReaderView.vue";
import MediaView from "@/view/MediaView.vue";


function routeExists(routes, name){
    return routes.some(route => route.name === name)
}

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HomeView
    },
    {
        name: 'Explore',
        path: '/explore',
        component: ExploreView,
    },
    {
        name: 'Settings',
        path: '/settings',
        component: SettingsView,
    },
    {
        name: 'Account',
        path: '/account',
        component: AccountView,
    },
    {
        name: 'Media',
        path: '/media',
        component: MediaView,
        props: true
    },
    {
        name: "Reader",
        path: '/reader',
        component: ReaderView
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    if (!routeExists(routes, to.name)) {
        next('');
    } else {
        next();
    }
});



export default router;