
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
        return API().get('auth/'+ userId)             
    },

    //Gestion du système de likes & dislikes
    likePost(id_post, likes, id_user){
        return API().put('posts/' + id_post+ '/likes', likes, id_user);
        
    },

    dislikePost(id_post, likes, id_user){
        return API().put('posts/' + id_post+ '/dislikes', likes, id_user);
        
    },

    likesStatusInfo(id_post, postInfos) {
        return API().post('posts/' + id_post+ '/likes', postInfos);

    },
}
