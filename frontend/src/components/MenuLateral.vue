<template>

  <div class="menuLateral">
      <button title="Publier Poste" class="btnModalPost" @click="openModal"><font-awesome-icon class="icon-trash" icon="pencil-alt" /></button>
      <div id="modal">
          <CreatePost @close-modal='closeModal' class="modal-content" ></CreatePost>
      </div>
  </div>

</template>

<script>

window.onclick = function(event) {
var modal = document.getElementById("modal");
    console.log('click')
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


import CreatePost from '@/components/CreatePost.vue'
export default {
    nom: 'MenuLateral',
    components: {
        CreatePost,
    },
    data(){
        return{
            userId: localStorage.getItem('userID'),
        }
    },
    methods: {
        openModal () {
            var modal = document.getElementById("modal");
            modal.style.display = "block";
        },
        closeModal(){
            var modal = document.getElementById("modal");
            modal.style.display = "none";
        }
    },
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.menuLateral {
    position: fixed;
    right:20px;
    bottom: 20px ;

    .btnModalPost {
        cursor: pointer;
        height: 50px;
        width: 50px;
        margin-left: 25%;
        padding: 10px 0px;
        border: none;
        border-radius: 100%;
        background-color: rgb(229, 115, 115);
        color: white;
        &:hover{
            background-color: darken(rgb(229, 115, 115), 20%);
        }
    }
    #modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 10; /* Sit on top */
        left: 0;
        top: 10px;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

        .modal-content {
            z-index: 20;
                background-color: #fefefe;
                margin: 15% auto; /* 15% from the top and centered */
                padding: 20px;
                border: 1px solid #888;
                width: 80%; /* Could be more or less, depending on screen size */
        }
    }
}

</style>