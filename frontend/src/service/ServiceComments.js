import API from '@/service/APIClient';

export default {
    getAllComments(post_id) {
        return API().get('posts/' + post_id + '/comments')
    },

    getOneOfAllComments(post_id) {
        return API().get('posts/' + post_id + '/comments?limit=1', )
    },
    
    createComment(post_id, data) {
        console.log(post_id)
        return API().post('posts/' + post_id + '/comments', data)
    },

    deleteComment(post_id, comment_id){
        return API().delete('posts/' + post_id + '/comments/' + comment_id)
    }
};