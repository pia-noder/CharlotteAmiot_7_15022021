<template>
  <div class="connection">
    <img class="logo-connexion" src="@/assets/icon-above-font.svg" alt="logo Groupomania">


    <div class="bloc-connexion">
        <form  class="bloc-SignIn" @submit.prevent="onSubmitRegisterForm" novalidate>
            <input type="email" v-model="email" placeholder="Email" @blur="$v.email.$touch()">
            <div v-if="$v.email.$error">
                <p  class="errorDisplay" v-if="!$v.email.required">Entrer un email</p>
                <p class="errorDisplay" v-if="!$v.email.email">Veuillez entrer un format d'email valide</p>
            </div>
            
            <input type="text" v-model="username" placeholder="User" @blur="$v.username.$touch()">
            <div v-if="$v.username.$error">
                <p class="errorDisplay" v-if="!$v.username.required">Entrer un nom d'utilisateur</p>
            </div>

            <input type="text" v-model="password" placeholder="mot de passe" @blur="$v.password.$touch()">
            <div v-if="$v.password.$error">
                <p class="errorDisplay" v-if="!$v.password.required">Entrer un password</p>
                <p class="errorDisplay" v-if="!$v.password.minLength">Chosir un mot de passe avec au moins 8 caractères</p>
            </div>

            <input type="text" v-model="repeatPassword" placeholder="Répéter le mot de passe" @blur="$v.repeatPassword.$touch()">
            <div v-if="$v.repeatPassword.$error">
                <p class="errorDisplay" v-if="!$v.repeatPassword.required">Remplir le champ</p>
                <p class="errorDisplay" v-if="!$v.repeatPassword.sameAs">Mot de passe différente</p>
            </div>

            <button type="submit" :disabled="$v.$invalid">Valider</button>
        </form>
        <p>vous avez déjà un compte ?<router-link to="/LogIn">Connectez-vous</router-link> </p>
    </div>

    
  </div>
</template>

<script>

import { required, minLength,  sameAs, email } from 'vuelidate/lib/validators'

export default {
  
    name: 'SignUp',
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
        onSubmitRegisterForm () {
            this.$v.$touch();
            if (!this.$v.$invalid){
                fetch('http://localhost:3000')
                .then(response => console.log(response))
                .catch(error => console.log(error));
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap');

.logo-connexion{
    width: 42%;
}
.connection{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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

.btnValider{
    margin-top: 20px;
}

p{
    font-weight: 700;
}


.btntoSignBloc{
    margin-top: 48px;
    background-color: #E57373;
    width: 100%;
}

button {
        background: linear-gradient(270deg, rgba(229, 115, 155) 30%, rgba(229, 115, 155, 0.3));
        font-size: 24px;
        padding: 20px 47px;
        border-radius: 27px;
        border:none;
    }
.errorDisplay {
    font-size: 10px;
}
</style>