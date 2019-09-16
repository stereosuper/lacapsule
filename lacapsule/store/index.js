import Vuex from 'vuex';
import Prismic from 'prismic-javascript';

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            settings: {},
            menu: {},
            footer: {},
            pageTransitioning: false,
            menuHTML: {
                hoverBurger: false,
                clickBurger: false
            },
            hasFooter: true,
            popin: '',
        }),
        mutations: {
            setSettings(state, settings) {
                state.settings = settings.results[0].data;
            },
            setMenu(state, menu) {
                state.menu = menu.results[0].data;
            },
            setHasFooter(state, hasFooter) {
                state.hasFooter = hasFooter;
            },
            setFooter(state, footer) {
                state.footer = footer.results[0].data;
            },
            setHoverBurger(state, value) {
                state.menuHTML.hoverBurger = value;
            },
            setClickBurger(state, value) {
                state.menuHTML.clickBurger = value;
            },
            setPageTransitioning(state, value) {
                state.pageTransitioning = value;
            },
            openPopin(state, value) {
                state.popin = value;
            }
        },
        actions: {
            async nuxtServerInit({ commit }) {
                const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
                const api = await Prismic.getApi(apiEndpoint);

                commit('setSettings', await api.query(Prismic.Predicates.at('document.type', 'settings')));

                commit('setMenu', await api.query(Prismic.Predicates.at('document.type', 'menu')));

                commit('setFooter', await api.query(Prismic.Predicates.at('document.type', 'footer')));
            }
        }
    });
};

export default createStore;
