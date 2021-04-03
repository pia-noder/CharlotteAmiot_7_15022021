
import API from '@/service/APIClient';


export default {

    getAllPosts (data) {
       
        return API().get('posts', data );
    },

    getOnePost (id) {
        
        return API().get('posts/:id', id);
    },

    createOnePost (data) {
        return API().post('posts', data );
    },

    deleteOnePost(id){
        return API().delete('posts/:id', { data: { id_post: id } });
    },
    getUserPosts(userId){
        return API().get('auth/'+ userId + '/posts')             
    },

    //Gestion du système de likes & dislikes
    likePost(id_post, post ){
        return API().put('posts/' + id_post+ '/likes', post);
        
    },

    dislikePost(id_post, post){
        return API().put('posts/' + id_post+ '/dislikes', post);
        
    },

    likesStatusInfo(id_post, postInfos) {
        return API().post('posts/' + id_post+ '/likes', postInfos);

    },
}
