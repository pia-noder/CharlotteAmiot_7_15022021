<template>
  <div class="displayToPost">
      <div class="imgProfile">
         <img src="@/assets/profile-user.png" alt="icon du profile"> 
      </div>
      
      <div class="contenu"></div>
      <div class="btnPublier">
        <button>Publier</button>
      </div>
      <!--<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>-->
  </div>
  
</template>

<script>
export default {
    nom: 'DisplayToPost'
}
</script>

<style lang='scss'>
    .displayToPost {
        border: 2px solid black;
        display: flex;
    }
    img{
       width: 18%; 
    }
    .contenu{
        font-size: 15px;
    }
    .btnPublier{
        width: 25%;
    }
    
</style>