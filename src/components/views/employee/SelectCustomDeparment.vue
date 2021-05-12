<template>
    <div>
        <div class="select-custom" :class="{'invisible' : valueShowDepartment}">
            <div class="item" v-for="(department, index) in departments" :key="index" :value="department.departmentId" @click="btnDepartmentClick(department.departmentId)"
            :class="{'color': saveValueDepartment == department.departmentId}"
            >{{department.departmentName}}</div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:{
        valueShowDepartment: { type: Boolean, selectcor: false}
    },
    data(){
        return{
            departments: [],
            saveValueDepartment: null,
        }
    },
    created(){
        /* 
        Lấy ra danh sách các phòng ban rồi bind vào ô Select Department
        */
        axios.get("https://localhost:44314/api/v1/Departments").then(res =>{
        this.departments = res.data;
        }).catch(res =>{
        console.log(res);
        })
    },
    methods:{
        btnDepartmentClick(valueId){
            this.saveValueDepartment = valueId;
            this.$emit('passValueDepartment', valueId);
        }
    }
}
</script>
<style scoped>
.select-custom{
    position: absolute;
    width: 392px;
    height: 166px;
    top: 190px;
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