import API from '@/service/APIClient';

export default {
    signup (datas) {
        return API().post('auth/signup', datas)
    },

    login (datas) {
        return API().post('auth/login', datas);
    },

    modifyUser(userId, datas) {
        console.log(datas)
        return API().put('auth/' + userId, datas )
    },

    getOneUSer(){
        return API().get('auth/user')
    },
    deleteUser(userId){
        console.log(userId)
        return API().delete('auth/' + userId);
    },
};