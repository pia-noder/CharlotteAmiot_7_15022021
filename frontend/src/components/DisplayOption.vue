<template>
  <div class="displayOption">
      <div class="deleteOption">
            <font-awesome-icon class="icon-search-trash" icon="trash-alt" />
            <p>Supprimer</p>
      </div>
      <div class="modifyOption">
            <font-awesome-icon class="icon-search-exchange" icon="exchange-alt" />
            <p>Supprimer</p>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DisplayOption'
}
</script>

<style lang="scss" scoped>

    .displayOption{

        padding: 5px;
        box-shadow: 1px 2px 13px 5px rgba(0,0,0,0.45);

        .deleteOption, .modifyOption {
        display: flex;
        padding: 3px;

            p{
                margin-left: 10px;
            }
        }
    }
    
</style>