<template>
  <div>

    <div  v-for="comment in comments" :key="comment.id" >

      <Comment  
        :comment="comment" 
        :post="post" 
        @delete-comment="pullCommentFromComments"
      />

    </div>

    <button
      v-if="count > 1 && !allCommentsDisplayed"
      @click="getAllComments(post)"
    >

      <span v-if="count > 1">Afficher {{ count - 1 }} autres commentaires</span>
      <span v-else>Afficher {{ count - 1 }} autre commentaire</span>

    </button>

    <CreateComments 
      :user="user" 
      :post="post" 
      @comment-created="pushNewCommentInComments"
      
    />

  </div>
</template>

<script>
import ServiceComments from '@/service/ServiceComments'

import CreateComments from '@/components/CreateComments'
import Comment from '@/components/Comment'


export default {
name: 'CommentsList',
  components: {
    CreateComments,
    Comment,
  },
  props:['post', 'user'],

  created() {
        this.getOneOfAllComments(this.post);
      },

  data () {
        return {
            postIncommentsList:this.post,
            allCommentsDisplayed: false,
            comments:[],
            count:0,
        }
    },
  

  methods:{

    getOneOfAllComments(post) {
      const getFistComment = ServiceComments.getOneOfAllComments(post);

      getFistComment.then((response) => {
        this.comments = response.data[0];
        this.count = response.data[1][0].count;
      })    
    },

    async getAllComments(post){
      ServiceComments.getAllComments(post).then(response => {
        this.comments = response.data;
      });
      this.allCommentsDisplayed = true;
    },

    pushNewCommentInComments(newComment){
      this.comments.push(newComment)
    },
    pullCommentFromComments(deletedComment){
       this.comments = this.comments.filter(comment => comment.comments_id !== deletedComment)
    }
  },
}

</script>

<style>

</style>