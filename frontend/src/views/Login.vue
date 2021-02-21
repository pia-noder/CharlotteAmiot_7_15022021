<template>
  <div class="connection">
    <img src="@/assets/icon-above-font.svg" alt="logo Groupomania">

    <div class="bloc-connexion" v-if="state === 'default'">
        <div class="bloc-logIn">
            <input type="text" placeholder="User ou email">
            <input type="text" placeholder="mot de passe">
            <a href="#">Mot de passe oublié ?</a>
            <btnConnection />
        </div>
        <button v-on:click="changeStateToSignIn('SignIn')" class="btntoSignBloc">Incrivez-vous</button>
    </div>

    <div class="bloc-connexion" v-if="state === 'SignIn'">
        <div class="bloc-SignIn" >
        <input type="text" placeholder="Email">
        <input type="text" placeholder="User ou email">
        <input type="text" placeholder="mot de passe">
        <input type="text" placeholder="mot de passe">
        <btnConnection />
    </div>
        <p>vous avez déjà un compte ? <a v-on:click="changeStateToSignIn('default')" href="#" onclick="return false;">Connectez-vous</a></p>
    </div>

    
  </div>
</template>
<script>
import btnConnection from '@/components/btnConnection.vue'
export default {
    name: 'logIn',
    components:{
        btnConnection,
    },
    data() {
        return {
             state: 'default',
        }
    },
    methods: {
        changeStateToSignIn (newState) {
            this.state = newState;
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap');

img{
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

.bloc-SignIn input{
    font-size: 16px;
    background-color: #DDDCDC;
    margin: 5px 0;
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
</style>