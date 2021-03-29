<template>
  <div class="comment" >
    <div class="bloc-comment" >
      <div class="profile">
        <router-link
        :to="{ name: 'UserProfile', params: { userId: comment.comments_user } }">
          <img class="user-image" :src="comment.imageURL" alt="photo de profile">
        </router-link>
        <router-link
          :to="{ name: 'UserProfile', params: { userId: comment.comments_user } }">
          <p>{{ comment.user_name }}</p>
        </router-link>
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
  border-top: 2px solid cornflowerblue;
  margin: 5px 5px 0 5px;
  .profile{
    display: flex;
    justify-content: left;
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
  .user-image{
  width: 7%;
}
.fileURL{
  width: 50%;
  .fileContenu{
    width: 60%;
  }
}
}

</style>