<template>
  
    <div class="bloc-createComment">
      <div class="bloc-user">
        <router-link :to="{ name: 'Profile' }">
          <img class="user-image" :src="userData.imageURL" alt="photo de profile">
        </router-link>
      </div>
      <form  @submit.prevent="onCreateComment(post)">
        
          <textarea
            :id="`comment-area-${post.id}`"
            v-model="content"
            class="comment-area border-0"
            placeholder="Écrivez un commentaire "
            aria-label="Écrire un commentaire"
          >
          </textarea>
          <input 
          type="file"
          name="multimedia"
          @change="onSelectFile"
          >
          
          <button type="submit">Envoyer</button>
      </form>
    </div>
  
</template>

<script>
import serviceComments from '@/service/ServiceComments'



export default {
 name: 'CreateComment',
  components: {
  
  },
  props: ['post'],

  data () {
    return {
      
      content: '',
      fileURL:'',
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },

  methods: {
 onSelectFile (event) {
            this.fileURL = event.target.files[0];
        },

    async onCreateComment(post_id){
          const formData = new FormData();
          let userId = this.userData.id;

          formData.append('contenu', this.content);
          formData.append('userId', userId);
          formData.append('multimedia', this.fileURL);
              /*for(let fd of formData.entries()){
                    console.log(fd[0] + ' , ' + fd[1])
                }*/
          await serviceComments.createComment(post_id, formData);
          this.$emit('rerenderComponent')
    },

  },


}

</script>

<style lang="scss">
.bloc-createComment{
  margin: 20px 5px 0 5px;
  display: flex;
  .bloc-user{
    width: 8%;
  }
  form{
    width: 90%;
  }
  textarea{
    width: 95%;
    resize: none;
    border: none;
  }
}
.user-image{
  width: 90%;
}
  
</style>