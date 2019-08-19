<template>
    <footer class='footer'>
        <div class='container'>
            <h2 v-if='footer.addresses_title[0]' class='footer-title'>
                <span>{{footer.addresses_title[0].text}}</span>
            </h2>

            <ul v-if='footer.addresses' class='addresses'>
                <li v-for='address in footer.addresses' :key='address.line1'>
                    <img v-if='address.img.url' :alt='address.img.alt' :src='address.img.url'>
                    <p>
                        {{address.line1}} <br>
                        {{address.line2}} <br>
                        {{address.line3}}
                    </p>
                    <a v-if='address.map.url' :href='address.map.url' :target='address.map.target'>Plan</a>
                </li>
            </ul>

            <h2 v-if='footer.title_other[0]' class='footer-title'>
                <span>{{footer.title_other[0].text}}</span>
            </h2>

            <div class='footer-galaxies'>
                <ul class='col-1'>
                    <li v-if='footer.linkedin.url'><a :href='footer.linkedin.url' :target='footer.linkedin.target'>LinkedIn</a></li>
                    <li v-if='footer.fb.url'><a :href='footer.fb.url' :target='footer.fb.target'>Facebook</a></li>
                    <li v-if='footer.medium.url'><a :href='footer.medium.url' :target='footer.medium.target'>Medium</a></li>
                </ul>

                <div class='col-1'>
                    <h3 v-if='footer.title_contact[0]' class='no-top'>{{footer.title_contact[0].text}}</h3>
                    <a v-if='footer.email' :href='"mailto:" + footer.email'>{{footer.email}}</a>

                    <h3 v-if='footer.title_docs[0]'>{{footer.title_docs[0].text}}</h3>
                    <ul v-if='footer.docs' class='list-simple'>
                        <li v-for='doc in footer.docs' :key='doc.link.url'>
                            <nuxt-link v-if='doc.link.url' :to='doc.link.url'>
                                {{doc.link.name}}
                            </nuxt-link>
                        </li>
                    </ul>
                </div>

                 <div class='col-2'></div>

                <div class='col-3'>
                    <h3 v-if='footer.title_newsletter[0]'>{{footer.title_newsletter[0].text}}</h3>
                    <p v-if='footer.text_newsletter'>{{footer.text_newsletter}}</p>

                    <!-- Begin Mailchimp Signup Form -->
                    <div id="mc_embed_signup">
                        <form action="https://lacapsule.us3.list-manage.com/subscribe/post?u=29f10c7e72171be564e02543f&amp;id=ff9e158c70" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                            <div id="mc_embed_signup_scroll">
                                <div class="mc-field-group">
                                    <label for="mce-EMAIL">Email Address </label>
                                    <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
                                </div>
                                <div id="mce-responses" class="clear">
                                    <div class="response" id="mce-error-response" style="display:none"></div>
                                    <div class="response" id="mce-success-response" style="display:none"></div>
                                </div>
                                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_29f10c7e72171be564e02543f_ff9e158c70" tabindex="-1" value=""></div>
                                <div class="clear"><input type="submit" value="› S'inscrire" name="subscribe" id="mc-embedded-subscribe"></div>
                            </div>
                        </form>
                    </div>
                    <!--End mc_embed_signup-->
                </div>
            </div>

            <div class='footer-bottom'>
                <p v-if='footer.text_footer'>{{footer.text_footer}}</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    components: {
    },
    computed: {
        settings() {
            return this.$store.state.settings;
        },
        footer() {
            return this.$store.state.footer;
        },
    },
    methods: {
    },
    watch: {
    },
    data() {
        return {
        };
    },
    mounted(){
    }
};
</script>

<style lang='scss' scoped>
h3{
    font-size: 1.8rem;
    &.no-top{
        margin: 0.5em 0;
    }
}

.list-simple{
    > li{
        padding: 0;
        &:before{
            content: none;
        }
    }
    a{
        color: inherit;
        text-decoration: none;
        &:before{
            content: '› ';
            position: static;
        }
    }
}

.footer{
    position: relative;
    margin: 100px 0 0;
    z-index: 10;
}

.footer-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.85em 0;
    > span{
        padding: 0 $gutter;
        flex-shrink: 0;
    }
    &:before, &:after{
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background: #fff;
    }
}

.addresses{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > li{
        width: 25%;
        padding: 0 $gutter $gutter;
        &:before{
            content: none;
        }
    }
    p{
        margin: 25px 0 0;
        font-weight: 700;
    }
}

.footer-galaxies{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.col-1, .col-2, .col-3{
    padding: 0 $gutter;
}
.col-1{
    width: 25%;
}
.col-2{
    width: 50%;
}
.col-3{
    width: 75%;
    margin: 0 0 0 auto;
}

.footer-bottom{
    padding: $gutter;
    margin: 50px 0 0;
    background: linear-gradient(360deg, rgba(#000, 0.25) 0%, rgba(#000, 0.25) 72%);
    border-radius: 18px;
    font-size: 1.7rem;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    p{
        margin: 0;
    }
}

form{
    > div{
        display: flex;
        align-items: center;
    }
}

label{
    display: none;
}

input{
    margin: 0;
    &[type=submit]{
        border: 0;
        padding: 0;
        margin: 0 0 0 70px;
        color: $primary;
        text-decoration: underline;
        font-style: italic;
        text-align: left;
    }
}
</style>
