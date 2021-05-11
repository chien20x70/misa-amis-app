<template>
    <div class="select-custom" :class="{'invisible': selectState}">
        <div class="item" value="10" @click="btnSelectClick(10)">10 bản ghi trên 1 trang</div>
        <div class="item" value="20" @click="btnSelectClick(20)">20 bản ghi trên 1 trang</div>
        <div class="item" value="30" @click="btnSelectClick(30)">30 bản ghi trên 1 trang</div>
        <div class="item" value="50" @click="btnSelectClick(50)">50 bản ghi trên 1 trang</div>
        <div class="item" value="100" @click="btnSelectClick(100)">100 bản ghi trên 1 trang</div>
    </div>
</template>

<script>
export default {
    props:{
        selectState:{ type: Boolean, selector: false}
    },
    methods:{
        btnSelectClick(value){
            this.addClass = true;
            this.$emit('passValueToSelect', value);
        }
    },
    data(){
        return{
            addClass: false,
        }
    }
    
}
</script>
<style scoped>
.select-custom{
    position: absolute;
    width: 200px;
    height: 166px;
    top: -161px;
    min-width: 200px;
    background-color: white;
    border: 1px solid #bbb;
}
.select-custom .item{
    height: 32px;
    width: 100%;
    padding: 0 14px 0 10px;
    text-align: left;
    line-height: 32px;
}
.item:hover{
    color: #2ca01c;
    background-color: rgb(219, 219, 219);
}
.invisible{
    display: none;
}
.color{
    background-color: #2ca01c;
    color: white;
}
</style>