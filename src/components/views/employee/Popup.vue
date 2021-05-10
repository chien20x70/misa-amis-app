<template>
    <div class="popup">
        <div class="model"></div>
        <div class="popup-box"></div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.popup{

}
.popup .model {
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 98;
  transition: all 0.25s ease;
  opacity: 1;
}
.popup .popup-box{
    
}
</style>