<template>
  
    <div class="bloc-createComment">
      <div class="bloc-user">
        <router-link :to="{ name: 'Profile' }">
          <img class="user-image" :src="user[0].imageURL" alt="photo de profile">
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

        <div id="previewFile-comment">
          <img v-if="showImage" id="imagePreview" src="" alt="pré-visualisation du fichier" />
        </div>

        <div class="footer-comment">
          <button
            aria-label="Intégrer un fichier"
            class="btn-file"
            @click="chooseFile"
            type="button"
          >
            <font-awesome-icon class="icon-trash" icon="images" />
          </button>
          <input 
            class="inputFile"
            type="file" 
            ref="file" 
            name="multimedia"
            @change="onSelectFile" 
          >

          <div class="btnPublier">
            <button type="submit">Envoyer</button>
          </div>

        </div>
        
      </form>
    </div> 
</template>

<script>
import ServiceComments from '@/service/ServiceComments'

export default {
 name: 'CreateComment',
  props: ['post', 'user'],

  data () {
    return {
      content: '',
      fileURL:'',
      showImage: false,
    }
  },

  methods: {
    chooseFile () {
      this.$refs.file.click()
        },
    onSelectFile (event) {
      this.fileURL = event.target.files[0];

      const file =event.target.files[0];
        if(file){
          const reader = new FileReader();
          reader.addEventListener('load', function (){ 
            let imagePreview = document.getElementById('imagePreview');
            imagePreview.setAttribute("src", this.result);
          });
          reader.readAsDataURL(file)
          this.showImage = true;

            } else {
                this.showImage = false;
            }
            
        },

    async onCreateComment(post){
        if(this.content || this.fileURL){
          const formData = new FormData();

          let userId = localStorage.getItem('userID');

          formData.append('contenu', this.content);
          formData.append('userId', userId);
          formData.append('multimedia', this.fileURL);

          ServiceComments.createComment(post, formData)
          .then(newComment => {
            let newCommentString = JSON.stringify(newComment);
            newComment = JSON.parse(newCommentString);

            this.$emit('comment-created', newComment.data[0]);
            this.content ='';
            this.fileURL = '';
            let imagePreview = document.getElementById('imagePreview');
            imagePreview.setAttribute("src", '');
            this.showImage = false;
          });

        }else{
          alert('Veuillez rentrer des informations avant de publier un commentaire');
        }   
    },
  },
}

</script>

<style lang="scss">
.bloc-createComment{
  margin: 20px 5px 0 5px;
  padding: 2px;
  display: flex;
  border: 1px solid #f0efeb;
  border-radius: 13px;
  
  .bloc-user{
    width: 8%;
    .user-image{
      width: 30px;
      height: 30px;
      border-radius: 100%;
    }
  }
  form{
    width: 90%;
    margin: 10px 0 10px 10px;
    textarea{
    width: 95%;
    resize: none;
    border: none;
    }
    #previewFile-comment{
    width: 100%;
      img{
      width: 50%;
      }
    }

    .footer-comment{
    display: flex;
    justify-content: space-between;
      .btn-file{
        background-color: white;
        border:none;
      }
      .inputFile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      } 
     .btnPublier{

        width: 25%;
        display: flex;
        align-items: flex-end;

        button {

          width: 80%;

          margin: 0 0 10px 10%;
          padding: 10px 15px 10px 15px;

          background: linear-gradient(270deg, rgb(229, 115, 115) 30%, rgba(229, 115, 115, 0.3));
          border-radius: 10px;
          border: none;
        }
     }
  }

  }  
}
@media (max-width:400px){
.bloc-createComment{
  margin: 20px 5px 0 5px;
  display: flex;
  .bloc-user{
    width: 8%;
    .user-image{
      width: 30px;
      height: 30px;
      border-radius: 100%;
    }
  }
  form{
    .btn-file{
    background-color: white;
    border:none;
  }
  .inputFile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  } 
  .footer-comment{
    display: flex;
    justify-content: space-between;
     .btnPublier{

        width: 50%;
        display: flex;
        align-items: flex-end;

        button {

            width: 80%;

            margin: 0 0 10px 10%;
            padding: 10px 15px 10px 15px;

            background: linear-gradient(270deg, rgb(229, 115, 115) 30%, rgba(229, 115, 115, 0.3));
            border-radius: 10px;
            border: none;
        }
      
     }
  }

  }
  
  
    
}
}
  
</style>