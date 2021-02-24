<template>

    <div class="btnConnection">

        <button type="submit" class="btn-connection" >{{title}}</button>

    </div>
  
</template>

<script>
export default {
    nom: 'BtnConnection',
    props: ['title'],
}
</script>

<style lang="scss" scoped>

    .btnConnection {

        .btn-connection {

            margin-top: 20px;
            padding: 20px 47px;

            background: linear-gradient(270deg, rgb(229, 115, 115) 30%, rgba(229, 115, 115, 0.3));
            font-size: 24px;
            
            border-radius: 27px;
            border:none;
        }
    }
</style>

