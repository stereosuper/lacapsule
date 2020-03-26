<template>
  <div class="main-content">
    <div :class="[{'appear': isMounted}, 'to-anim', 'container']">
      <div class="small-content">
        <div class="title">
          <nuxt-link to="/" class="breadcrumb">Accueil</nuxt-link>
          <h1 class="title">{{ page.title }}</h1>
        </div>
        <div v-if="page.intro" class="intro" v-html="page.intro"/>
        <div v-if="page.text" v-html="page.text"/>
      </div>

      <ul v-if="page.blocks" :class="[{'circle': page.blocks.length === 4}, 'blocks']">
        <listItem v-for="item in page.blocks" :key="item.item_title[0].text" :item="item"/>
      </ul>

      <!--
            <ul v-if='page.logos' class='logos'>
                <listLogo v-for='logo in page.logos' :key='logo.logo_title[0].text' :logo='logo'/>
            </ul> -->

      <ul v-if="page.custom_post === 'references' && refs[0]" class="logos">
        <listRef v-for="ref in refs" :key="ref.title" :reference="ref"/>
        <listRef key="contact" :reference="{'contact': true}"/>
      </ul>
      <ul v-if="refsPages > 1" class="pagination">
        <li v-if="currentPage > 1" class="nav"><nuxt-link :to="'?pages=' + (currentPage - 1)">‹</nuxt-link></li>
        <li v-for="n in refsPages" :key="n">
          <nuxt-link :to="'?pages='+n" :class="[{'nuxt-link-exact-active': currentPage === 1 && n === 1}]">{{ n }}</nuxt-link>
        </li>
        <li v-if="currentPage < refsPages" class="nav"><nuxt-link :to="'?pages=' + (currentPage + 1)">›</nuxt-link></li>
      </ul>

      <form v-if="page.cats" class="cats"> 
        <select v-model="currentCat">
          <option value="all" selected>Toutes les ressources</option>
          <option v-for="cat in page.cats" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </form>
      <ul v-if="page.files" class="files">
        <listFile v-for="(file, i) in page.files" v-if="currentCat == 'all' || currentCat == file.cat" :key="file.file_title[0].text" :nb="i" :file="file" :cat="currentCat"/>
      </ul>

      <contact v-if="page.contact" :content="page.contact"/>

      <who v-if="page.who" :content="page.who" :team="page.team" :story="page.story" :dimensions="page.dimensions" :video="page.video"/>

      <div v-if="page.cta" class="cta">
        <div v-for="(item, i) in page.cta" :key="i">
          <div :class="[{'inverted': item.style === 'transparent'}, 'button']">
            <a v-if="item.link.url" :href="item.link.url">
              {{ item.link_text }}
            </a>
            <button v-else :data-popin="i+1" @click="openPopin">
              {{ item.link_text }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-for="(file, i) in page.files" :key="i" >
      <popin v-if="!file.file.url" :file="file.file_title[0].text" :name="'ressource'+(i+1)" :label-id="i"/>
    </div>

    <div v-for="(item, i) in page.cta" :key="i" >
      <popin v-if="!item.link.url" :file="item.link_text" :name="'cta'+(i+1)" :label-id="i"/>
    </div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

import btn from '~/mixins/btn.js';

import ListItem from '~/components/ListItem.vue';
//import ListLogo from '~/components/ListLogo.vue';
import ListRef from '~/components/ListRef.vue';
import ListFile from '~/components/ListFile.vue';
import Contact from '~/components/Contact.vue';
import Who from '~/components/Who.vue';

import Popin from '~/components/Popin.vue';

export default {
    components: {
        ListItem,
        //ListLogo,
        ListRef,
        ListFile,
        Contact,
        Who,
        Popin
    },
    mixins: [btn],
    data() {
        return {
            isMounted: false,
            currentCat: 'all'
        };
    },
    watchQuery: ['pages'],
    key: to => to.fullPath,
    async asyncData({ params, error, query }) {
        const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
        const api = await Prismic.getApi(apiEndpoint);

        let page = {},
            data = {},
            refData = false,
            refs = [],
            refsPages = 0,
            currentPage = 1;

        await api.query(Prismic.Predicates.at('my.page.uid', params.slug)).then(
            function(response) {
                if (!response.results.length) return;

                data = response.results[0].data;

                page = {
                    type: response.results[0].type,
                    title: data.title[0] ? data.title[0].text : '',
                    desc: data.desc ? data.desc : '',
                    intro: data.intro ? PrismicDOM.RichText.asHtml(data.intro) : '',
                    text: data.text ? PrismicDOM.RichText.asHtml(data.text) : '',
                    custom_post: data.custom_post ? data.custom_post : '',
                    cta: data.cta[0] ? data.cta : '',
                    blocks: data.blocks[0] ? data.blocks : '',
                    //'logos': data.logos[0] ? data.logos : '',
                    cats: data.cats ? data.cats.split(',') : '',
                    files: data.files[0] ? data.files : '',
                    contact: data.contact[0] ? data.contact[0] : '',
                    who: data.who[0] ? data.who[0] : '',
                    team: data.team ? data.team : '',
                    story: data.story_group[0] ? data.story_group[0] : '',
                    dimensions: data.dimensions ? data.dimensions : '',
                    video: data.video_group[0] ? data.video_group[0] : ''
                };
            },
            function(error) {
                error({ statusCode: error.response.status, message: error.message });
            }
        );

        if (Object.keys(page).length === 0 && page.constructor === Object) {
            error({ statusCode: '404', message: 'Page not found' });
        }

        if (query.pages) currentPage = +query.pages;

        await api.query(Prismic.Predicates.at('document.type', 'references'), { pageSize: 7, page: currentPage }).then(
            function(response) {
                if (!response.results.length) return;

                refsPages = response.total_pages;
                refData = response.results;
            },
            function(error) {
                error({ statusCode: error.response.status, message: error.message });
            }
        );

        if (refData) {
            refData.forEach((ref, i) => {
                refs[i] = {
                    url: ref.uid ? '/reference/' + ref.uid : '',
                    title: ref.data.title[0] ? ref.data.title[0].text : '',
                    company: ref.data.company ? ref.data.company : '',
                    logo: ref.data.logo ? ref.data.logo : ''
                };
            });
        }

        return { page, refs, refsPages, currentPage };
    },
    mounted() {
        this.$store.commit('setHoverBurger', false);
        this.$store.commit('setClickBurger', false);
        this.$store.commit('setHasFooter', true);
        document.body.classList.remove('menuOpen');

        //this.page.blocks ? document.body.classList.add('content-under') : document.body.classList.remove('content-under');

        this.setBtn();
        setTimeout(() => {
            this.isMounted = true;
        }, 300);
    },
    head() {
        return {
            title: this.page.title,
            meta: [{ hid: 'description', name: 'description', content: this.page.desc }]
        };
    },
    methods: {
        openPopin(e) {
            this.$store.commit('openPopin', 'cta' + e.currentTarget.dataset.popin);
        }
    }
};
</script>

<style lang='scss' scoped>
@import './assets/scss/abstracts/_variables.scss';

.main-content {
    position: relative;
    z-index: 20;
}

.small-content {
    margin: 0 $col;
}

.cta {
    text-align: center;
    > div {
        margin: 50px 0 0;
    }
}

.blocks,
.logos,
.files {
    display: flex;
    margin: 0 $gutter * -2;
    flex-wrap: wrap;
}

.files {
    justify-content: space-between;
    margin-bottom: 200px;
}

.blocks,
.logos {
    text-align: center;
}

.logos {
    justify-content: center;
    margin-top: -30px;
}

.blocks {
    padding: 80px 0 0;
    justify-content: center;
    &.circle {
        padding: 4vh 0 80px;
        justify-content: space-between;
    }
}

.cats {
    margin: 90px 0 40px;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 7em 0 0;
    font-size: 1.8rem;
    li {
        padding: 10px;
        &:before {
            content: none;
        }
    }
    .nuxt-link-exact-active {
        color: #fff;
        text-decoration: none;
    }
    .nav {
        a {
            text-decoration: none;
        }
    }
}

@media (max-width: 1252px) {
    .blocks,
    .files {
        margin: 0 $gutter * -1;
    }
}

@media (max-width: $container) {
    .logos {
        margin: 0 $gutter * -1;
    }

    .files {
        display: block;
        margin-bottom: 150px;
    }
}

@media (max-width: $desktop) {
    .cta {
        > div {
            &:first-child {
                margin: 0;
            }
        }
    }

    .logos {
        margin: 0 $gutter * -2;
    }

    .blocks {
        margin: 0;
    }
}

@media (max-width: $tablet) {
    .small-content {
        margin: 0;
    }
}

@media (max-width: $phone) {
    .logos {
        margin: 10vh $gutter * -1 0;
    }
}

@media (max-width: $phone-small) {
    .logos {
        margin-left: 0;
        margin-right: 0;
    }
}
</style>
