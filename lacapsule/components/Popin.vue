<template>
    <div class='popin' :class='[{"off": closed}]'>
        <div class='content'>
            <h2>Télécharger un document</h2>
            <form method='post' action='/api/ressource' @submit='checkForm'>
                <div class='field'>
                    <label :for='"email"+labelID'>Email <span>*</span></label>
                    <input type='email' name='email' v-model='email' :id='"email"+labelID'/>
                </div>
                <div class='field-check'>
                    <input type='checkbox' :id='"rgpd"+labelID' name='rgpd' value='1' v-model='rgpd'/>
                    <label :for='"rgpd"+labelID'>
                        J’accepte de recevoir régulièrement, par courrier électronique, les newsletters contenant les derniers articles de blog, l’actualité corporate, évènementiel de La Capsule, et avoir pris connaissance de notre politique de confidentialité.
                    </label>
                </div>
                <button type='submit' class='ok' name='submit'>
                    Télécharger
                    <svg width="11" height="14" viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.541016 13.1653H10.4577V11.7487H0.541016V13.1653ZM10.4577 4.37363H7.62435V0.123632H3.37435V4.37363H0.541016L5.49935 9.33199L10.4577 4.37363Z"/>
                    </svg>
                </button>
            </form>
            <p v-if='formError' class='error'>{{formError}}</p>
            <button class='close' @click='close'>Fermer <div></div></button>
        </div>
    </div>
</template>

<script>
import validator from 'validator';

export default {
    data() {
        return {
            formError: '',
            email: '',
            rgpd: '',
            closed: true
        };
    },
    computed: {
        open() {
            return this.$store.state.popin;
        },
    },
    props: {
        file: {
            type: String,
            required: true
        },
        labelID: {
            type: Number,
            required: true
        }
    },
    methods: {
        close() {
            this.closed = true;
            this.$store.commit('openPopin', 0);
        },
        async checkForm(e){
            e.preventDefault();

            const self = this;

            if( !self.email ){
                self.formError = "L'adresse email est requise!";
                return;
            }

            if( !validator.isEmail(self.email) ){
                self.formError = "L'adresse email semble invalide...";
                return;
            }

            if ( !self.rgpd ){
                self.formError = "Vous devez accepter les conditions d'utilisation!";
                return;
            }
            
            self.$axios.$post('/api/ressource', 'email='+self.email+'&title='+self.file)
                .then(res => {
                    console.log(res);
                    self.formError = "Bien envoyé! La ressource vous sera envoyée par mail :)";
                }, err => {
                    console.log(err);
                    self.formError = "Désolé, un problème est survenu!";
                });
        }
    },
    watch: {
        open() {
            this.closed = this.$store.state.popin !== this.labelID+1;
        }
    }
};
</script>

<style lang='scss' scoped>
@import "./assets/scss/abstracts/_variables.scss";

.popin{
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(#182D52, 0.7);
    overflow-y: auto;
    &.off{
        display: none;
    }
}

.content{
    width: 90%;
    max-width: 630px;
    padding: 55px 30px 65px;
    margin: 25vh 0 30px;
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
}

.close{
    padding: 0 35px 0 0;
    position: absolute;
    top: -40px;
    right: 0;
    font-family: $league;
    div{
        width: 20px;
        height: 2px;
        position: absolute;
        top: 12px;
        right: 0;
        transform-origin: 50% 50%;
        transform: rotate(45deg);
        &:before, &:after{
            content: '';
            position: absolute;
            left: 0;
            border-radius: 2px;
            background: #fff;
            transform-origin: 0 0;
            transition: $transition;
        }
        &:before{
            height: 2px;
            width: 20px;
            top: 0;
            transform: scaleX(1);
        }
        &:after{
            width: 2px;
            height: 20px;
            top: -9px;
            right: 0;
            margin: auto;
            transform: scaleY(1);
        }
    }
}

h2{
    margin: 0;
    font-size: 2.1rem;
    text-align: center;
}

svg{
    fill: currentColor;
}

form{
    max-width: 430px;
    margin: 30px auto 0;
}

label{
    span{
        color: $primary;
    }
}

.field{
    display: flex;
    align-items: center;
    label{
        width: 50px;
        flex-shrink: 0;
    }
}
.field-check{
    display: flex;
    align-items: flex-start;
    padding: 20px 0 0 50px;
    label{
        font-size: 1.2rem;
        line-height: 2;
        cursor: pointer;
    }
    input{
        flex-shrink: 0;
        margin-top: 7px;
    }
}

input{
    margin: 0 15px;
}

.ok{
    padding: 9px 10px 8px;
    margin: 30px 0 0 65px;
    font-family: $league;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    border-radius: 5px;
    background: $primary;
    &:hover, &:focus{
        background: #fff;
        color: $primary;
    }
    svg{
        margin: -4px 0 0 3px;
    }
}

.error{
    margin: 10px 0 0;
    font-size: 1.2rem;
    color: $primary;
}
</style>
