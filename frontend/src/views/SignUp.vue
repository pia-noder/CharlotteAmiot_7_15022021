<template>
  <div class="connection">
    <img class="logo-connexion" src="@/assets/icon-above-font.svg" alt="logo Groupomania">


    <div class="bloc-connexion">
        <form  class="bloc-SignIn" @submit.prevent="onSubmitRegisterForm" novalidate>

            <label for="email"></label>
            <input id="email" type="email" v-model="email" placeholder="Email" @blur="$v.email.$touch()">
            <div v-if="$v.email.$error">
                <p  class="errorDisplay" v-if="!$v.email.required">Entrer un email</p>
                <p class="errorDisplay" v-if="!$v.email.email">Veuillez entrer un format d'email valide</p>
            </div>
            
            <label for="username"></label>
            <input id="username" type="text" v-model="username" placeholder="User" @blur="$v.username.$touch()">
            <div v-if="$v.username.$error">
                <p class="errorDisplay" v-if="!$v.username.required">Entrer un nom d'utilisateur</p>
            </div>

            <label for="password"></label>
            <input id="password" type="password" v-model="password" placeholder="mot de passe" @blur="$v.password.$touch()">
            <div v-if="$v.password.$error">
                <p class="errorDisplay" v-if="!$v.password.required">Entrer un password</p>
                <p class="errorDisplay" v-if="!$v.password.minLength">Chosir un mot de passe avec au moins 8 caractères</p>
            </div>

            <label for="repeatPassword"></label>
            <input id="repeatPassword" type="password" v-model="repeatPassword" placeholder="Répéter le mot de passe" @blur="$v.repeatPassword.$touch()">
            <div v-if="$v.repeatPassword.$error">
                <p class="errorDisplay" v-if="!$v.repeatPassword.required">Remplir le champ</p>
                <p class="errorDisplay" v-if="!$v.repeatPassword.sameAs">Mot de passe différente</p>
            </div>

            <BtnConnection type="submit" :disabled="$v.$invalid" title="Validez"> </BtnConnection>

        </form>
        <p class="linkToLogInPage">vous avez déjà un compte ?<router-link to="/LogIn"><br>Connectez-vous</router-link> </p>
    </div>

    
  </div>
</template>

<script>

import { required, minLength,  sameAs, email } from 'vuelidate/lib/validators'
import BtnConnection from '@/components/BtnConnection.vue'
import ServiceAuth from '@/service/ServiceAuthentification'

export default {
  
    name: 'SignUp',
    components: {
        BtnConnection,
    },

    data() {
        return {
            email: '',
            username: '',
            password: '',
            repeatPassword: '',  
        }
    },

    validations: {
        
         email: {
                required,
                email
        },
         username: {
                required,
        },
        password: {
                required,
                minLength: minLength(8)
        },
        repeatPassword: {
                required,
                sameAs: sameAs('password')
        }
    },

    methods: {
       async onSubmitRegisterForm () {
            console.log('Envoie du formulaire signIn correctement déclenché');
            let response = await ServiceAuth.signup({
                username: this.username,
                email: this.email,
                password: this.password,
                poste: '',
                description: '',
                imageURL: ''
            });
            
            localStorage.setItem('userData',JSON.stringify(response.data.user))
            const userId = localStorage.getItem('userID');
            this.$router.push({
                    name: 'Home', 
                    params: { userId } 
            });
        
            //console.log('Utilisateur correctement crée',response);
        }
    }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.logo-connexion{
    width: 30%;
    min-width: 315px;
    margin: auto;
}
    
.connection{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-bottom: 50px;

    font-family: 'Montserrat', sans-serif;
}
.bloc-logIn, .bloc-SignIn{
    display: flex;
    flex-direction: column;

    padding: 48px 35px 61px 35px;
    border: solid 2px #E57373;
    border-radius: 27px;
}

    
.bloc-logIn input{
    font-size: 16px;
    background-color: #DDDCDC;
    margin: 20px 0;
    border: none;
    padding: 19px 22px
}



a{
    text-decoration: none;
    color: black;
    font-size: 15px;
    margin: 20px 0 32px 0;
}


p{
    font-weight: 700;
}


.btntoSignBloc{
    margin-top: 48px;
    background-color: #E57373;
    width: 100%;
}


.errorDisplay {
    font-size: 10px;
}

.linkToLogInPage{
    margin-top: 10px;
    text-align: center;
}

</style>