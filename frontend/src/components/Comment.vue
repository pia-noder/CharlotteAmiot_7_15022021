<template>
  <div class="comment" >
    <div class="bloc-comment" >
      <div class="profile">
        
        <img class="user-image" :src="comment.imageURL" alt="photo de profile">
        <p>{{ comment.user_name }}</p>
        
      </div>
      
      <div class="comment-block">
        <div class="content">
          
        
          <p >{{ comment.contenu }}</p>
          <div v-if="comment.fileURL" class="fileURL">
            <img class="fileContenu" :src="comment.fileURL" alt="image envoyé par l'utilisateur">
          </div> 
        </div>

        <span v-if="userStatus == 'admin' || userID == comment.comments_user" class="deleteOption" @click="deleteComment(post, comment.comments_id)">
          <font-awesome-icon class="icon-trash" icon="trash-alt" />  
        </span>
      </div>
      
    </div>
  </div>
</template>

<script>
import ServiceComments from '@/service/ServiceComments'

export default {
name: 'Comment',
props:[ 'post', 'comment' ],

    data(){
        return{
            userData: JSON.parse(localStorage.getItem('userData')),
            userStatus: localStorage.getItem('userStatus'),
            userID: localStorage.getItem('userID')
        }
    },
    methods:{
      async deleteComment(post,comment_id){
            await ServiceComments.deleteComment(post, comment_id);
            this.$emit('delete-comment', comment_id);
        },
    }
    
    
}
</script>

<style lang="scss">
.bloc-comment{
  
  margin: 5px 5px 0 5px;
  padding: 5px;
  background: #f0efeb;
  border-radius: 13px;

  .profile{
    display: flex;
    justify-content: left;
    .user-image{
      width: 40px;
      height: 40px;
      border-radius: 100%;
    }
    p{
      margin-left:15px;
    }
  }
  .comment-block{
    display: flex;
    justify-content: space-between;
    min-height: 50px;
    margin: 0 10px 15px 50px;
    border: 2px solid grey;
    border-radius: 13px;
    padding: 10px;
    .deleteOption{
      cursor: pointer;
    }
  }

.fileURL{
  width: 50%;
  .fileContenu{
    width: 60%;
    margin-top: 15px;
  }
}
}
@media (max-width: 400px){
 
 .bloc-comment{
  font-size:0.7em;


    .profile{
      display: flex;
      justify-content: left;

      .user-image{
        width: 20px;
        height: 20px;
      } 
    }
  }
}
</style>