import API from '@/service/APIClient';

export default {
    signup (infos) {
        return API().post('auth/signup', infos)
    },

    login (infos) {
        return API().post('auth/login', infos);
    },

    getOneUSer(){
        return API().get('auth/user')
    }
};