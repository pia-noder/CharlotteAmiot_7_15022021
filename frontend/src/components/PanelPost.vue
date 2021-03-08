<template>
    <div class="panel">

        <div class="panelTitle">
            {{ title }}
        </div>
        <div class="content">
            <slot>
                No slot content defined !!!
            </slot>
        </div>

    </div>
</template>

<script>

export default {
    nom: 'Post',
    props: ['title'],
    data() {
        return {
            /*img: '',
            username: 'Batiste',
            date: '3 min ago',
            content:'What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            commentsNb: 5,
            likesNb: 25,*/
        
        }
    },

    
}
</script>

<style lang='scss' scope>
#postBloc {
    border: black solid 2px;
    display: flex;
    flex-direction: column;

        .headerBloc{
            display: flex;
        }
}
</style>