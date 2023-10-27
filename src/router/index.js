import Vue from 'vue'
import VueRouter from "vue-router"


const Film = () => import(/* webpackChunkName: "Film" */"../views/Film.vue");
const Cinema = () => import(/* webpackChunkName: "Cinema" */"../views/Cinema.vue");
const Login = () => import(/* webpackChunkName: "Login" */"../views/Login.vue");
const Detail = () => import(/* webpackChunkName: "Detail" */"../views/Detail.vue");
const Nowplaying = () => import(/* webpackChunkName: "Nowplaying" */"../views/film/Nowplaying.vue");
const Comingsoon = () => import(/* webpackChunkName: "Comingsoon" */"../views/film/Comingsoon.vue");
const Search = () => import(/* webpackChunkName: "Search" */"../views/Search.vue");
const City = () => import(/* webpackChunkName: "City" */"../views/City.vue");

const routes = [{
    name: 'film',
    path: '/',
    component: Film,
    redirect:'/film/nowplaying',
    children: [{
        name:'nowplaying',
        path: 'film/nowplaying',
        component: Nowplaying
    }, {
        name:'comingsoon',
        path: 'film/comingsoon',
        component: Comingsoon
    },
    ]
},
{
    name: 'cinema',
    path: '/cinema',
    component: Cinema
},
{
    name: 'search',
    path: '/cinema/search',
    component: Search
},
{
    name: 'city',
    path: '/city',
    component: City
},
{
    name: 'detail',
    path: '/detail',
    component: Detail
},
{
    name: 'login',
    path: '/login',
    component: Login
},
{
    name:"*",
    path: '*',
    redirect: "/"
}
];
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'hash',
    routes
});

export default router;