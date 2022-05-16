<template>
  <aside class="menu" v-show="isMenuVisible">

      <div class="sub-menu">
         <div>
             <router-link to="/event">
            <i class="fa fa-ticket"></i> Eventos
          </router-link>
         </div>
         <div>
            <router-link to="/about">
            <i class="fa fa-info"></i>  Contato
          </router-link>
         </div>
           
      </div>
       
  </aside>

</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Menu",
  computed: mapState(["isMenuVisible"]),
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  
}

.sub-menu {
  text-decoration: none;
  padding: 40px;
    height: 100%;
  position: relative;

  
}

.sub-menu i {
  color: #FFF;
  margin-right: 10px;
  
}
</style>
