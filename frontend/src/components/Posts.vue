<template>
    
        <div class="postBloc" >
            <div class="post-header">
                <img class="user-image" :src="post.imageURL" alt="photo de profile">
                <p>{{ post.username }}</p>
                <p>{{ post.date_publication }}</p>

                <BtnEdit
                    :post="post"
                    :isAdmin="userStatus == 'admin'"
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
            :post="post.id_post" 
            />
            
        </div>

</template>

<script>
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
            //posts: [],
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
    .postBloc{
        margin-top: 13px;
        border: 2px solid #E57373;
        border-radius: 13px;

        .post-header{
            display: flex;
            justify-content: space-between;
            margin: 19px 30px 0 19px;
            position: relative;
            .user-image{
                width: 5%;
                margin-right: 5%
            }
            .icon-dots{
                cursor: pointer;
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
            margin: 10px 28px 22px ;

            .icon-heart{
                cursor: pointer;
                
                p{
                    display: inline;
                    margin-left: 5px;
                }
            }
            .changeColor{
                color:crimson;
            }
            .icon-comment{
                margin:0 25px 0 7%;
                cursor: pointer;
                p{
                    display: inline;
                    margin: 0 15px 0 5px;
                }
            }
        }
    }
</style>