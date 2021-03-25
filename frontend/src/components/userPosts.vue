<template>
    <div class="">
        <div class="postBloc" v-for="(post, index) in posts"  :key="index">

            <div class="post-header">
                <img class="user-image" :src="user.imageURL" alt="photo de profile">
                <p>{{ post.username }}</p>
                <p>{{ post.date_publication }}</p>
                <span @click="post.visible = !post.visible" class="icon-dots"><font-awesome-icon  :icon="['fas', 'ellipsis-h']" /></span>

                <DisplayOption  class="displayOption" 
                                v-bind:post="post.id" 
                                v-bind:class="{ displayNone: post.visible }"
                                @delete-post="deletePost">
                </DisplayOption><!--v-bind:posts="post.id_post" ; sert à envoyer l'objet contenu dans data au composant enfant via le props-->
            </div>

            <div class="post-content">
                {{ post.contenu }} <br/>
                <img class="imgContenu" :src="post.fileURL" alt="image envoyé par l'utilisateur">
            </div>

            <div class="post-footer">
                <span class="icon-comment"><font-awesome-icon :icon="['fas', 'comment-dots']" /></span>
                <span class="icon-search-heart"><font-awesome-icon  icon="heart" /></span>
            </div> 
            
        </div>
 </div>
</template>

<script>

import ServicePosts from '@/service/ServicePosts'
import DisplayOption from '@/components/DisplayOption'

export default {
    components: {

        DisplayOption

    },

    data () {
        return {
            posts: [],
            user:{}
           
        }
    },
    async created (){
        await this.prepareDynamicList()
        this.user = JSON.parse(localStorage.getItem('userData'));
    },

    methods: {
       
       async prepareDynamicList(){
            //console.log(this.$route.params.userId)
            let list = await ServicePosts.getUserPosts(this.$route.params.userId);
            //console.log(list.data)
            list.data.forEach(element => {
            this.posts.push({...element, visible: true});
            });
        } ,

        async deletePost(id){
            await ServicePosts.deleteOnePost(id);
        }
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
            margin: 10px 28px 22px 19px;
        }
    }
</style>