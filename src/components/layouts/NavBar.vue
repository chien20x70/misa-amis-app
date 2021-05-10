<template>
    <div class="navbar">
        <div class="navbar-header">
            <div class="toggle"></div>
            <div class="logo"></div>
        </div>
        <div class="menu-item">
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-dashboard"></div>
                <div class="navbar-content-text">Tổng quan</div>
            </a>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-cash"></div>
                <div class="navbar-content-text">Tiền mặt</div>
            </a>
            <router-link class="navbar-content" to="/employee">
                <div class="navbar-content-icon sidebar-bank"></div>
                <div class="navbar-content-text">Danh sách nhân viên</div>
            </router-link>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-pu"></div>
                <div class="navbar-content-text">Mua hàng</div>
            </a>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-sale"></div>
                <div class="navbar-content-text">Bán hàng</div>
            </a>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-invoice"></div>
                <div class="navbar-content-text">Quản lý hóa đơn</div>
            </a>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-stock"></div>
                <div class="navbar-content-text">Kho</div>
            </a>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-tools"></div>
                <div class="navbar-content-text">Công cụ dụng cụ</div>
            </a>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-fixed-assets"></div>
                <div class="navbar-content-text">Tài sản cố định</div>
            </a>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-tax"></div>
                <div class="navbar-content-text">Thuế</div>
            </a>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-price"></div>
                <div class="navbar-content-text">Giá thành</div>
            </a>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-general"></div>
                <div class="navbar-content-text">Tổng hợp</div>
            </a>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-budget"></div>
                <div class="navbar-content-text">Ngân sách</div>
            </a>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-report"></div>
                <div class="navbar-content-text">Báo cáo</div>
            </a>
            <a class="navbar-content" href="#">
                <div class="navbar-content-icon sidebar-finance"></div>
                <div class="navbar-content-text">Phân tích tài chính</div>
            </a>
        </div>        
    </div>
</template>
<script>
export default {};
</script>
<style scoped>
.navbar {
  width: 178px;
  height: 100vh;
  background-color: #393a3d;
}
.navbar .navbar-header{
    height: 48px;
    display: flex;
    align-items: center;
}
.navbar .navbar-header .toggle{
    flex-shrink: 0;
    margin-left: 24px; 
    width: 24px;
    height: 24px;
    margin-right: 10px;
    background: url('../../assets/Sprites.5f05e81f.svg') no-repeat -424px -86px;
}
.navbar .navbar-header .logo{
    height: 32px;
    width: 100%;
    background-image: url("../../assets/Logo_Module_TiengViet_White.66947422.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left;
    flex-shrink: 0;
}
.navbar .menu-item{
    padding-top: 14px;
}
.menu-item .navbar-content{
    height: 42px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
}
/* .navbar-content:focus{
    font-weight: 700;
} */
.navbar-content:hover{
    background-color: rgba(255, 255, 255, 0.2);   
}
.navbar-content-icon{
    background: url("../../assets/Sprites.5f05e81f.svg") no-repeat;
    cursor: pointer;
    min-width: 24px;
    min-height: 24px;
    height: 24px;
    width: 24px;
    margin-left: 8px;
    margin-right: 8px;
}
.navbar-content-text{
    font-weight: 400;
}
.sidebar-dashboard {
    background-position: -30px -1585px;
}
.sidebar-cash {
    background-position: -73px -1628px;
}
.sidebar-bank {
    background-position: -117px -1628px;
}
.sidebar-pu {
    background-position: -161px -1628px;
}
.sidebar-sale {
    background-position: -204px -1628px;
}
.sidebar-invoice {
    background-position: -249px -1628px;
}
.sidebar-stock {
    background-position: -291px -1628px;
}
.sidebar-tools {
    background-position: -336px -1628px;
}
.sidebar-fixed-assets {
    background-position: -378px -1630px;
}
.sidebar-tax {
    background-position: -423px -1630px;
}
.sidebar-price {
    background-position: -467px -1628px;
}
.sidebar-general {
    background-position: -510px -1628px;
}
.sidebar-budget {
    background-position: -378px -1659px;
}
.sidebar-report {
    background-position: -547px -1628px;
}
.sidebar-finance {
    background-position: -204px -1664px;
}
</style>