<template>
    <div class='contact'>
        <aside class='contact-sidebar'>
            <div v-if='content.contact_img' class='contact_img'>
                <div><img :src='content.contact_img.url' :alt='content.contact_img.alt'/></div>
            </div>
            <a v-if='content.contact_email' :href='"mailto:"+content.contact_email'>{{content.contact_email}}</a>
        </aside>
        <div class='contact-content'>
            <h2>{{content.form_title[0].text}}</h2>
            <div v-if='text' v-html='text'/>
                <form method='post' action='/api/contact' @submit='checkForm' v-if='!success'>
                    <div :class='[{"error": nameError}, "field"]'>
                        <label for='name'>Votre nom <span>*</span></label>
                        <input type='text' name='name' id='name' v-model='name'/>
                    </div>
                    <div :class='[{"error": emailError}, "field"]'>
                        <label for='email'>Votre email <span>*</span></label>
                        <input type='email' name='email' id='email' v-model='email'/>
                    </div>
                    <div class='field'>
                        <label for='object'>Sujet</label>
                        <input type='text' name='object' id='object' v-model='object'/>
                    </div>
                    <div class='field'>
                        <label for='message'>Votre message</label>
                        <textarea name='message' id='message' v-model='message' placeholder='Je veux challenger des hypothèses, faire émerger une vision commune, dynamiser une équipe projet, stimuler la créativité, définir une feuille de route, cadrer un projet… Aidez-moi !'></textarea>
                    </div>
                    <div :class='[{"error": rgpdError}, "field field-check"]'>
                        <input type='checkbox' name='rgpd' id='rgpd' value='1' v-model='rgpd'/>
                        <label for='rgpd'>J'accepte que les informations saisies soient utilisées exclusivement dans le cadre de ma demande et de la relation commerciale personnalisée qui peut en découler (par e-mail et/ou par téléphone)</label>
                    </div>
                    <div class='button'>
                        <button type='submit' name='submit'>Envoyer</button>
                    </div>
                </form>
                <p v-if='formError' class='error'>{{formError}}</p>
            </div>
        </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import validator from 'validator';

export default {
    props: {
        content: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            text: '',
            formError: '',
            email: '',
            name: '',
            object: '',
            message: '',
            rgpd: '',
            nameError: false,
            emailError: false,
            rgpdError: false,
            success: false
        };
    },
    created() {
        this.text = this.content.form_text ? PrismicDOM.RichText.asHtml(this.content.form_text) : '';
    },
    methods: {
        async checkForm(e){
            e.preventDefault();

            const self = this;

            if (!self.name){
                self.formError = "Le nom est requis!";
                self.nameError = true;
                return;
            }

            self.nameError = false;

            if (!self.email){
                self.formError = "L'adresse email est requise!";
                self.emailError = true;
                return;
            }

            if(!validator.isEmail(self.email)){
               self.formError = "L'adresse email semble invalide...";
               self.emailError = true;
               return;
            }

            self.emailError = false;

            if (!self.rgpd){
                self.formError = "Vous devez accepter les conditions d'utilisation!";
                self.rgpdError = true;
                return;
            }

            self.rgpdError = false;

            self.$axios.$post('/api/contact', 'email='+self.email+'&name='+self.name+'&object='+self.object+'&message='+self.message+'&rgpd='+self.rgpd)
                .then(res => {
                    console.log(res);
                    self.formError = "Votre message a bien été envoyé! Nous répondrons à votre message dans les plus brefs délais :)";
                    self.success = true;
                }, err => {
                    console.log(err);
                    self.formError = "Désolé, un problème est survenu! Veulliez réessayer plus tard.";
                });
        }
    }
};
</script>

<style lang='scss' scoped>
@import "./assets/scss/abstracts/_variables.scss";

.contact{
    display: flex;
    justify-content: space-between;
}
.contact-sidebar {
    max-width: 250px;
    text-align: center;
    h2 {
        margin: 0;
        font-size: 2.1rem;
    }
    a {
        font-weight: 600;
        font-style: normal;
    }
}
.contact_img {
    display: inline-block;
    padding: 20px;
    margin: 0 0 30px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.1);
    > div {
        border: 5px solid #fff;
        border-radius: 50%;
        overflow: hidden;
    }
}
.contact-content{
    flex: 1;
    padding: 30px 65px 30px 30px;
    margin: 0 0 0 70px;
    background: rgba(#000, 0.16);
    border-radius: 10px;
}
h2{
    padding: 0 0 0 15px;
    margin: 0 0 20px 21%;
    + div{
        padding: 0 0 0 15px;
        margin: 0 0 0 21%;
    }
}
form{
    margin: 40px 0 0;
}
.field{
    display: flex;
    margin: 0 0 15px;
    &.error{
        color: $primary;
    }
}
label{
    width: 21%;
    flex-shrink: 0;
    text-align: right;
    span{
        color: $primary;
    }
}
input, textarea{
    margin: 0 0 0 15px;
}
input{
    max-width: 345px;
    &[type=checkbox]{
        width: auto;
        margin: 7px 15px 0 calc(21% + 15px);
        + label{
            width: 100%;
            flex-shrink: 1;
            text-align: left;
        }
    }
    .error &{
        border-color: $primary;
    }
}
.button{
    margin: 25px 0 0 calc(21% + 15px);
}
p.error{
    padding: 0 0 0 15px;
    margin: 30px 0 0 21%;
    color: $primary;
}


@media (max-width: $desktop){
    .contact{
        display: block;
    }
    .contact-sidebar{
        margin: 0 auto;
    }
    .contact-content{
        margin: 50px 0 0;
    }
}

@media (max-width: $tablet){
    h2{
        padding: 0;
        margin-left: 0;
        + div{
            padding: 0;
            margin: 0;
        }
    }

    .field{
        display: block;
    }
    .field-check{
        display: flex;
    }

    label{
        display: block;
        width: 100%;
        text-align: left;
    }

    input, textarea{
        margin: 10px 0 0;
    }

    input{
        &[type=checkbox]{
            margin-left: 0;
        }
    }

    .button{
        margin-left: 0;
    }
}

@media (max-width: $phone){
    .contact-content{
        padding-right: 30px;
    }
}

@media (max-width: $phone-small){
    .contact-content{
        padding: 0;
        background: none;
    }
}
</style>
