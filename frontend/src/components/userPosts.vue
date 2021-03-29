<template>
    <div class="userPostBloc">
        
        <div class="post-header">
            <img v-if="user.imageURL" class="user-image" :src="user.imageURL" alt="photo de profile">
            <p>{{ post.username }}</p>
            <p>{{ post.date_publication }}</p>
            <BtnEdit
                :post="post"
                :isAdmin="userStatus == 'Admin'"
                :isUser="userID == post.id_user"
            />
        </div>

        <div class="post-content">
            {{ post.contenu }} <br/>
            <img v-if="post.fileURL" class="imgContenu" :src="post.fileURL" alt="image envoyé par l'utilisateur">
        </div>

        <div class="post-footer">
            <span class="icon-comment"><font-awesome-icon @click="displayComments(post)" :icon="['fas', 'comment-dots']" /></span>
            <span class="icon-heart" :class="[isLiked ? 'changeColor' : '']" @click="onLikePost()"><font-awesome-icon  icon="heart" /><p v-if="post.likes">{{post.likes}}</p></span>
        </div> 
        <CommentsList v-if="this.commentsAreVisible" 
            :post="post.id" 
        />

    </div>
</template>

<script>

//import ServicePosts from '@/service/ServicePosts'
import ServicePosts from '@/service/ServicePosts'

import CommentsList from '@/components/CommentsList.vue'
import BtnEdit from '@/components/BtnEdit'

export default {
    components: {
        CommentsList,
        BtnEdit,

    },
    props:['post'],

    data () {
        return {
            user:{},
            userStatus: localStorage.getItem('userStatus'),
            userID: localStorage.getItem('userID'), 
            commentsAreVisible: false,
            isLiked: false,
        }
    },

    async created (){
        await this.LikeStatus(this.post);     
    },
    
    methods: {
       displayComments(){
            if(this.commentsAreVisible == true){
                this.commentsAreVisible = false
            } else {
                this.commentsAreVisible = true
            }
        },

        async LikeStatus(post){
            const userData = JSON.parse(localStorage.getItem('userData'));
        
                const postInfosObj = {
                    "id_user" : userData.id
                }

                const getLikesStatut =  ServicePosts.likesStatusInfo(post.id_post, postInfosObj);
               
                getLikesStatut.then((response) => {
                    if(response.data && response.data.length > 0){
                    this.isLiked = true;
                    }  
                });
           
        },

       async onLikePost(){
           const userData = JSON.parse(localStorage.getItem('userData'));
            
            if(!this.isLiked){

                if(this.post.likes === (null || NaN)){
                    this.post.likes = 1;
                    this.post.isLiked = true;

                    const post = {"likes" : this.post.likes,
                        "id_user" : userData.id};

                    await ServicePosts.likePost(this.post.id_post, post)

                }else{
                     this.post.likes += 1;
                    this.isLiked = true;
                    const post = {"likes" : this.post.likes,
                        "id_user" : userData.id};
                    await ServicePosts.likePost(this.post.id_post, post)
                }
                   

            } else {
                this.post.likes = this.posts.likes -= 1;
                if(isNaN(this.post.likes)){
                    this.post.likes = 0
                    const post = {"likes" : this.post.likes,
                        "id_user" : userData.id};
                    await ServicePosts.dislikePost(this.post.id_post, post)
                }
                this.isLiked = false;
            }
            
        },  
       
    },
   
   
}
</script>

<style lang="scss" >
    .userPostBloc{
        width: 50%;
        border: 2px solid #E57373;
        border-radius: 13px;
        margin: 10px 0 10px 0;

        .post-header{
            display: flex;
            justify-content: space-between;
            margin: 19px 30px 0 19px;
            position: relative;

            .user-image{
                width: 5%;
                margin-right: 5%;
                border-radius: 100%;
            }

            .icon-dots{
                cursor: pointer;
            }

            .displayOption{
                position: absolute;
                right: -150px;
            }

            .displayNone{
                display: none;
            }
            
            
        }
        .post-content{
            margin: 10px 28px 0 10%;

            .imgContenu{
                width: 100%;
            }
        }
        .post-footer{
            margin: 10px 28px 22px 10%;

            .icon-heart{
                cursor: pointer;
                margin-left: 20px;
                
                p{
                    display: inline;
                    margin-left: 5px;
                }
            }
            .changeColor{
                color:crimson;
            }
        }
    }
</style>