<template>
    <panel title="Posts récemment publiés">
        <div class="postBloc" v-for="post in posts" :key="post.id">
            <div class="post-header">
                <img class="user-image" :src="post.imageURL" alt="">
                <p>{{ post.username }}</p>
                <p>{{ post.date_publication }}</p>
            </div>
            <div class="post-content">
                {{ post.contenu }}
            </div>
            <div class="post-footer">
                <span class="icon-comment"><font-awesome-icon :icon="['fas', 'comment-dots']" /></span>
                <span class="icon-search-heart"><font-awesome-icon  icon="heart" /></span>
            </div>
            
            
            
            
        </div>
    </panel>
</template>

<script>
import Panel from '@/components/PanelPost.vue'
import ServicePosts from '@/service/ServicePosts'
export default {
    components: {
        Panel,
    },

    data () {
        return {
            posts: null,
        }
    },

    async mounted () {
        const response = await ServicePosts.getAllPosts();
        this.posts = response.data
        console.log(response.data)
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
            margin: 19px 0 0 19px;
        }
        .post-content{
            margin: 10px 28px 0 19px;
        }
        .post-footer{
            margin: 10px 28px 22px 19px;
        }
    }
</style>