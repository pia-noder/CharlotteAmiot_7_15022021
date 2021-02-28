<template>

  <div class="menuLateral">
      <router-link class="link" to="/Notifications">Notifications</router-link>
      <router-link class="link" to="/Newsletter">Newsletter</router-link>
      <button class="btnModalPost" @click="openModal">Publier</button>
      <div id="modal">
          <DisplayToPost class="modal-content" ></DisplayToPost>
      </div>
  </div>

</template>

<script>

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


import DisplayToPost from '@/components/DisplayToPost.vue'
export default {
    nom: 'MenuLateral',
    components: {
        DisplayToPost,
    },
    methods: {
        openModal () {
            var modal = document.getElementById("modal");
            modal.style.display = "block";
        },
    },
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.menuLateral {
    display: flex;
    flex-direction: column;

    margin-top: 95px;

    .link {
        margin-left: 25%;
        font-size: 1.5rem;
        font-family: 'Montserrat', sans-serif;
    }

    .btnModalPost {
        width: 25%;
        margin-left: 25%;
        padding: 10px 0px;
        border-radius: 13px;
    }
    #modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

        .modal-content {
                background-color: #fefefe;
                margin: 15% auto; /* 15% from the top and centered */
                padding: 20px;
                border: 1px solid #888;
                width: 80%; /* Could be more or less, depending on screen size */
        }
    }
}

</style>