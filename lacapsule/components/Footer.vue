<template>
    <footer class='footer'>
        <div class='container'>
            <h2 v-if='footer.addresses_title[0]' class='title-line'>
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

            <h2 v-if='footer.title_other[0]' class='title-line'>
                <span>{{footer.title_other[0].text}}</span>
            </h2>

            <div class='footer-galaxies'>
                <ul class='col-1 social'>
                    <li v-if='footer.twitter.url' class='twitter'><a :href='footer.twitter.url' :target='footer.twitter.target'>Twitter</a></li>
                    <li v-if='footer.linkedin.url' class='linkedin'><a :href='footer.linkedin.url' :target='footer.linkedin.target'>LinkedIn</a></li>
                    <li v-if='footer.medium.url' class='medium'><a :href='footer.medium.url' :target='footer.medium.target'>Medium</a></li>
                </ul>

                <div class='col-1'>
                    <h3 v-if='footer.title_contact[0]' class='no-top'>{{footer.title_contact[0].text}}</h3>
                    <a v-if='footer.email' :href='"mailto:" + footer.email'>{{footer.email}}</a>
                    
                    <h3 v-if='footer.title_docs[0].text'>{{footer.title_docs[0].text}}</h3>
                    <ul v-if='footer.docs[0]' class='list-simple'>
                        <li v-for='doc in footer.docs' :key='doc.link.url'>
                            <a v-if='doc.link.url' :href='doc.link.url'>
                                {{doc.text}}
                            </a>
                        </li>
                    </ul>
                </div>

                 <div class='col-2'></div>

                <div class='col-3'>
                    <h3 v-if='footer.title_newsletter[0]'>{{footer.title_newsletter[0].text}}</h3>
                    <p v-if='footer.text_newsletter'>{{footer.text_newsletter}}</p>

                    <!-- Begin Mailchimp Signup Form
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
                                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_29f10c7e72171be564e02543f_ff9e158c70" tabindex="-1" value=""></div>
                                <div class="clear"><input type="submit" value="› S'inscrire" name="subscribe" id="mc-embedded-subscribe"></div>
                            </div>
                        </form>
                    </div>
                    End mc_embed_signup-->
                    <div id='hubspotForm'></div>
                </div>
            </div>

            <div class='footer-bottom'>
                <p v-if='footer.text_footer'>
                    {{footer.text_footer}}
                    <span v-if='footer.legal_link.url'> - </span>
                    <nuxt-link v-if='footer.legal_link.url' :to='footer.legal_link.url'>
                        {{footer.legal_link.name}}
                    </nuxt-link>
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    computed: {
        settings() {
            return this.$store.state.settings;
        },
        footer() {
            return this.$store.state.footer;
        },
    },
    mounted(){
        window.hbspt.forms.create({
            portalId: "6299131",
            formId: "78b3bc5e-2d7a-45e2-9fe1-6902a15819ed",
            target: "#hubspotForm"
        });
    }
};
</script>

<style lang='scss' scoped>
@import "./assets/scss/abstracts/_variables.scss";

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
        font-style: normal;
        color: inherit;
        text-decoration: none;
        &:before{
            content: '› ';
            position: static;
        }
        &:hover, &:focus{
            color: $primary;
        }
    }
}

.footer{
    position: relative;
    margin: 100px 0 0;
    z-index: 10;
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

.social{
    height: 220px;
    position: relative;
    margin: 0;
    > li{
        position: absolute;
        padding: 0;
        &:before{
            content: none;
        }
        &:nth-child(2):before, &:nth-child(3):before, &:nth-child(3):after{
            content: '';
            width: 145px;
            height: 2px;
            position: absolute;
            z-index: -1;
            background: #fff;
            border-radius: 0;
            box-shadow: 0 0 24px rgba(#fff, 0.25), 0 0 15px rgba(#fff, 0.68);
        }
        &:nth-child(2){
            top: 20px;
            left: 135px;
            &:before{
                left: -85px;
                top: 27px;
                transform: rotate(13deg);
            }
        }
        &:nth-child(3){
            top: 105px;
            left: 55px;
            &:before{
                left: -50px;
                top: -15px;
                transform: rotate(73deg);
            }
            &:after{
                right: -74px;
                top: 0;
                transform: rotate(-45deg);
            }
        }
    }
    a{
        display: block;
        width: 72px;
        height: 72px;
        text-decoration: none;
        font-size: 0;
    }
}

.linkedin{
    background: url(../static/img/linkedin.png);
}
.twitter{
    background: url(../static/img/twitter.png);
}
.medium{
    background: url(../static/img/medium.png);
}

.footer-bottom{
    padding: $gutter;
    margin: 60px 0 0;
    background: linear-gradient(360deg, rgba(#000, 0.25) 0%, rgba(#000, 0.25) 72%);
    border-radius: 18px;
    font-size: 1.7rem;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    p{
        margin: 0;
    }
    a{
        font-weight: 400;
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
        &:hover, &:focus{
            color: #fff;
        }
    }
}

@media (max-width: $desktop){
    .col-1{
        width: 50%;
    }

    .col-2, .col-3{
        width: 100%;
    }

    .col-3{
        margin: 0;
    }
}

@media (max-width: $tablet){
    .addresses{
        > li{
            width: 50%;
        }
    }
}

@media (max-width: $phone){
    .addresses{
        > li{
            width: 100%;
            padding-left: 0;
            padding-right: 0;
        }
    }

    .col-1, .col-2, .col-3{
        padding: 0;
    }

    .col-1{
        width: 100%;
    }

    form > div{
        display: block;
    }

    input{
        &[type=submit]{
            margin: 20px 0 0;
        }
    }
}
</style>
