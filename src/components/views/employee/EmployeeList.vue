<template>
  <div class="content">   
    <div class="box">
      <div class="content-item">
        <div class="content-item-text">Nhân viên</div>
        <div class="component-btn">
          <div class="btn-utilities">
            <button class="btn-btn hoverxx">
              <div class="flex btn-btn-text">
                <span class="pr-4">Tiện ích</span>
                <div class="header-icon arrow-up--black"></div>
              </div>
            </button>
          </div>
          <div class="btn-utilities">
            <button class="btn-btn color" @click="btnAddClick">
              <div class="flex btn-btn-text">
                <span class="pr-4">Thêm</span>
              </div>
            </button>
            <button class="btn-btn color border">
              <div class="flex btn-btn-text">
                <div class="line"></div>
                <div class="header-icon arrow-up--white"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="flex back">
        <div class="header-icon chevron-left--primary"></div>
        <div>Tất cả danh mục</div>
      </div>
    </div>
    <div class="content-table">
      <div class="item">
        <div class="btn-utilities">
          <button class="btn-btn hoverxx" style="border: 2px solid #b1b2b3">
            <div class="flex btn-btn-text">
              <span class="pr-4" style="color: #afafaf"
                >Thực hiện hàng loạt</span
              >
              <div
                class="header-icon arrow-up--black"
                style="opacity: 0.5"
              ></div>
            </div>
          </button>
        </div>
        <div class="item-right">
          <input
            type="text"
            placeholder="Tìm theo mã, tên nhân viên"
            class="input-search2"
            :value="filter"
            @input="onChangeInputEmployeeFilter"
          />
          <div class="content-icon refresh" @click="btnRefreshClick"></div>
          <div class="content-icon excel__nav" @click="btnExportClick"></div>
          <div class="content-icon setting__list"></div>
        </div>
      </div>
      <div class="content-table-height">
        <table class="tblListEmployee" border="0" width="98%">
          <thead>
            <tr>
              <th style="width: 34px;">
                <input type="checkbox" class="check-box" />
              </th>
              <th>MÃ NHÂN VIÊN</th>
              <th>TÊN NHÂN VIÊN</th>
              <th>GIỚI TÍNH</th>
              <th>NGÀY SINH</th>             
              <th>SỐ CMND</th>
              <th>CHỨC DANH</th>
              <th>TÊN ĐƠN VỊ</th>
              <th>SỐ TÀI KHOẢN</th>
              <th>TÊN NGÂN HÀNG</th>
              <th>CHI NHÁNH TK NGÂN HÀNG</th>
              <th>CHỨC NĂNG</th>
            </tr>
          </thead>         
          <tbody v-if="employees != undefined">
            <tr              
              v-for="(employee, index) in employees"
              :key="index"
              @dblclick="dblClickTable(employee.employeeId)"
            >
              <td style="width: 34px;">
                <input type="checkbox" class="check-box"/>
              </td>
              <td>{{ employee.employeeCode }}</td>
              <td>{{ employee.fullName }}</td>
              <td>{{ employee.gender | showGender }}</td>
              <td>{{ employee.dateOfBirth | dateFormatDDMMYY }}</td>
              <td>{{ employee.identifyNumber }}</td>
              <td>{{ employee.positionName }}</td>
              <td>{{ employee.departmentId | showDepartment }}</td>
              <td>{{ employee.bankAccountNumber }}</td>
              <td>{{ employee.bankName }}</td>
              <td>{{ employee.bankBranchName }}</td>
              <td>
                <div class="btn-edit">
                  <button class="btn-btn hover" @click="btnEditClick(employee.employeeId, employee.employeeCode)">
                      <div class="flex btn-btn-text">
                          <span class="pr-4" style="color: #0075c0; font-weight: 600">Sửa</span>
                      </div>
                  </button>                  
                  <Dropdown @showPopup="showPopup(employee.employeeId, employee.employeeCode)"/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="message" v-if="employees == undefined">
            <div class="img-report">
              <img src="https://actappg2.misacdn.net/img/bg_report_nodata.76e50bd8.svg" alt="" class="nodata-img">
            </div>
            <div class="img-report">Không có dữ liệu</div>            
          </div>
      </div>
      
    </div>
    <div class="content-navpage">
        <div class="content-navpage-text-left">Tổng số: {{totalRecord}} bản ghi</div>
        <div class="footer-complete">
          
          <Selectcustom :selectState="valueSelect" @passValueToSelect="GetValueFromSelect"/>
          <div class="autocomplete">
            <div class="selected-option">
              <input type="text" class="input-select" :value="msgSelected">
              <div class="icon-selected">
                <!-- @click="valueSelect = !valueSelect" -->
                <div class="header-icon arrow-dropdown" @click="showSelected" :class="{'tranform': valueSelect == false}"></div>
              </div>
            </div>
          </div>
          <!-- <select name="" id="" :value="pageSize" @change.prevent="onSelectedValue">
            <option value="10">10 bản ghi trên 1 trang</option>
            <option value="20">20 bản ghi trên 1 trang</option>
            <option value="30">30 bản ghi trên 1 trang</option>
            <option value="40">50 bản ghi trên 1 trang</option>
            <option value="50">100 bản ghi trên 1 trang</option>
          </select> -->
          <button class="style margin" :class="{'disable': (pageIndex == 1)}" @click="onClickPag(pageIndex - 1)">Trước</button>
          <button class="style margin" :class="{'active': (pageIndex == 1)}" @click="onClickPag(1)">1</button>
          <button v-if="pageIndex > 3" class="style margin disable">...</button>
          <button v-for="p in pageIndexs" :key="p" class="style margin" :class="{ 'active': pageIndex == p }" @click="onClickPag(p)">{{ p }}</button>
          <button v-if="pageIndex < totalPages - 3" class="style margin disable">...</button>
          <button class="style margin" :class="{'display': (totalPages == 1), 'active': pageIndex == totalPages}" @click="onClickPag(totalPages)">{{totalPages}}</button>
          <button class="style margin" :class="{'disable': (pageIndex == totalPages)}" @click="onClickPag(pageIndex + 1)">Sau</button>
        </div>        
      </div>
    <EmployeeDialog
      :state="show"
      @hideDialog="hideDialog"
      @hideDialogNotLoad="hideDialogNotLoad"
      :employee="selectedEmployee"
      :flag="status"
    />
    <Popup :popState="valuePopup" @hidePopupNotLoad="hidePopupNotLoad" @hidePopup="hidePopup" :employeeClickCode="recordCode" :employeeClickId="recordId"/>
    <div class="fa-3x" v-if="isBusy">
      <i class="fas fa-spinner fa-spin" style="color: green;"></i>
    </div>
  </div>
</template>
<script>
import EmployeeDialog from "./EmployeeDialog.vue";
import Dropdown from "./Dropdown.vue"
import Popup from "./Popup.vue"
import Selectcustom from "./SelectCustom.vue" 
import axios from "axios";
export default {
  components: {
    EmployeeDialog,
    Dropdown,
    Popup,
    Selectcustom
  },
  data() {
    return {
      employees: [],            // Mảng nhân viên
      show: false,              // Giá trị hiển thị dialog
      selectedEmployee: {},     // data 1 nhân viên khi dblClick hoặc click btn Sửa
      recordId: null,           // Lưu giá trị của EmployeeId để truyền qua Popup
      status: null,             // Trạng thái nút là Thêm mới hay Sửa
      isBusy: false,            // Trạng thái của icon Loading
      valuePopup: true,         // Giá trị hiển thị Popup
      recordCode: null,         // Lưu giá trị Employeecode truyền qua Popup
      totalRecord: 0,           // Tổng số bản ghi Empployee
      pageSize: 20,             // Bao nhiêu nhân viên / trang
      filter:  "",              // Giá trị truyền vào input để lọc
      pageIndex: 1,             // Trang hiện tại
      totalPages: 1,            // Tổng số trang
      valueSelect: true,
      msgSelect: " bản ghi trên 1 trang",
      msgSelected: "20 bản ghi trên 1 trang",
    };
  },
  created() {
    // this.loadData();
    this.filterData();
  },
  methods: {
    /* 
    hàm loadData lấy về 1 danh sách nhân viên từ API
    CreatedBy: NXCHIEN 10/05/2021
    */
    loadData() {
      // Bắt đầu load thì hiển thị icon Load
      this.isBusy = true;
      axios
        .get("https://localhost:44314/api/v1/Employees")
        .then((response) => {
          console.log(response);
          this.employees = response.data;
          // Gán tổng số bản ghi bằng độ lớn của mảng trả về
          this.totalRecord = this.employees.length
        })
        .catch((response) => {
          console.log(response);
        })
        .then(() => {
          // Load xong thì tắt icon load
          this.isBusy = false;
        });
    },

    /* 
    Click thêm mới 1 nhân viên 
    CreatedBy: NXCHIEN 10/05/2021 
    */
    btnAddClick() {
      // Hiển thị dialog
      this.show = true;

      // this.$nextTick(function () {
      // //   console.log(this.$refs.code);
      // //     this.$refs.code.focus();
      // // })
      // Gán giá trị là nút Thêm mới
      this.status = "add";
      axios
        .get("https://localhost:44314/api/v1/Employees/employeeCode")
        .then((response) => {
          console.log(response.data);
          //
          var increCode = response.data;
          // Cắt chuỗi trả về
          increCode = increCode.substring(3);
          // Gán tất cả các ô data của dialog rỗng
          this.selectedEmployee = {};
          // Gán code Max cho ô Mã nhân viên
          this.selectedEmployee.employeeCode = "NV-" + (Number(increCode) + 1);
          this.selectedEmployee.departmentId = "";
        })
        .catch((response) => {
          console.log(response);
        });
    },

    /* 
    Đóng dialog mà không load lại dữ liệu
    CreatedBy: NXCHIEN 10/05/2021 
    */
    hideDialogNotLoad() {
      this.show = false;
    },

    /* 
    Đóng dialog có load lại dữ liệu
    CreatedBy: NXCHIEN 10/05/2021 
    */
    hideDialog() {
      this.show = false;
      this.filterData();     
    },

    /* 
    Hiển thị Popup
    CreatedBy: NXCHIEN 10/05/2021 
    */
    showPopup(employeeId, employeeCode){
      this.valuePopup = false;

      // Lưu giá trị Id khi click vào nút sửa trên bảng.
      this.recordId = employeeId;
      this.recordCode = employeeCode;
    },
    
    /* 
    Đóng popup có load lại dữ liệu
    CreatedBy: NXCHIEN 10/05/2021 
    */
    hidePopup(){
      this.valuePopup = true;
      this.filterData();
      
    },

    /* 
    Đóng popup mà không load lại dữ liệu
    CreatedBy: NXCHIEN 10/05/2021 
    */
    hidePopupNotLoad() {
      this.valuePopup = true;
    },

    /* 
    dblClick vào 1 dòng trong table
    - Lấy ra 1 nhân viên được chọn
    CreatedBy: NXCHIEN 10/05/2021 
    */
    dblClickTable(eId) {
      // gán cờ thành nút sửa
      this.status = "edit";
      //Lấy ra id của employee

      //show Dialog
      this.show = true;
      //Fill employee vào dialog
      axios
        .get("https://localhost:44314/api/v1/Employees/" + eId)
        .then((response) => {
          console.log(response);
          this.selectedEmployee = response.data;
          // format lại dữ liệu hiển thị
          this.selectedEmployee.dateOfBirth = this.dateFormatYYMMDD(this.selectedEmployee.dateOfBirth);
          this.selectedEmployee.dateOfIN = this.dateFormatYYMMDD(this.selectedEmployee.dateOfIN);
        })
        .catch((response) => {
          console.log(response);
        });
    },

    /* 
    Click nút Sửa trong table
    CreatedBy: NXCHIEN 10/05/2021 
    */
    btnEditClick(employeeClickId){
      this.dblClickTable(employeeClickId);
    },

    /* 
    Load lại dữ liệu khi click vào nút refresh
    CreatedBy: NXCHIEN 10/05/2021 
    */
    btnRefreshClick(){
      this.filterData();
      this.totalPages = 1;
      this.pageIndex = 1;
    },

    /* 
    Lọc data bằng các tham số truyền vào
    CreatedBy: NXCHIEN 10/05/2021 
    */
    filterData(){
      this.isBusy = true;
      axios
        .get(`https://localhost:44314/api/v1/Employees/Filter?pageSize=${this.pageSize}&pageIndex=${this.pageIndex}&filter=${this.filter}`)
        .then((response) => {
          console.log(response);
          this.employees = response.data.data;            
          this.totalRecord = response.data.totalRecord;
          this.totalPages = response.data.totalPages;
          console.log(this.totalRecord);
          // if(this.employees == undefined){
          //   this.totalPages = 1;
          //   this.pageIndex = 1;
          //   this.totalRecord = 0;
          // } 
        })
        .catch((response) => {
          console.log(response);
        })
        .then(() => {
          this.isBusy = false;
        });
    },

    /* 
    Kiểm tra giá trị input thay đổi thì lọc mảng nhân viên bằng cách gọi tới API
    CreatedBy: NXCHIEN 10/05/2021 
    */
    onChangeInputEmployeeFilter(e){
      let val = e.target.value;
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.filter = val;
        this.pageIndex = 1;
        console.log(this.filter)
        this.filterData();
      }, 1000);
    },

    /* 
    Kiểm tra click chọn giá trị select.
    - Lọc lại mảng nhân viên khi click.
    CreatedBy: NXCHIEN 10/05/2021 
    */
    // onSelectedValue(e){
    //   let val = e.target.value
    //   console.log(e.target.value);
    //   this.pageSize = val;
    //   console.log(this.filter);
    //   this.filterData();
      
    // },

    /* 
    Kiểm tra click thay đổi phân trang
    - Lọc lại mảng nhân viên khi click.
    CreatedBy: NXCHIEN 10/05/2021 
    */
    onClickPag(page) {
      this.pageIndex = page;
      this.filterData();
    },

    /* 
    Export data ra file excel
    - mở 1 cửa số mới call đến API
    CreatedBy: NXCHIEN 10/05/2021 
    */
    btnExportClick(){
      window.open(`https://localhost:44314/api/v1/Employees/ExportingExcel?pageSize=${this.pageSize}&pageIndex=${this.pageIndex}&filter=${this.filter}`,"_blank");
    },
   
    GetValueFromSelect(value){
      this.pageIndex = 1;
      this.msgSelected = null;
      this.msgSelected = value + this.msgSelect;
      this.pageSize = value;
      this.filterData();
      this.valueSelect = true;
    },

    showSelected(){
      this.valueSelect = !this.valueSelect;
    },
    /* 
    Format dữ liệu ngày tháng năm theo định dạng yyyy-mm-dd
    CreatedBy: NXCHIEN 10/05/2021 
    */
    dateFormatYYMMDD(date) {
      
      var newDate = new Date(date);
      var day = newDate.getDate();
      var month = newDate.getMonth() + 1;
      var year = newDate.getFullYear();
      day = day < 10 ? "0" + day : day;
      month = month < 10 ? "0" + month : month;
      return `${year}-${month}-${day}`;
    },
  },
  computed: {
    /* 
    Mảng chứa các phần tử ở giữa nút số 1 và trang cuối cùng trong phân trang
    CreatedBy: NXCHIEN 10/05/2021 
    */
    pageIndexs: function () {
      let ps = [];      // Khởi tạo mảng

      // Nếu trang hiện tại > 3 thì bắt đầu từ nút trang hiện tại trừ 1 còn nếu <=3 thì nút bắt đầu là 2
      let start = this.pageIndex > 3 ? this.pageIndex - 1 : 2;
      // Nút kết thúc < tổng số trang - 3 thì nút kết thúc là giá trị trang hiện tại + 1 còn nếu không thì tổng số trang - 1
      let end = this.pageIndex < this.totalPages - 3 ? this.pageIndex + 1 : this.totalPages - 1;
      
      // Đẩy vào mảng ps chứa các nút được phép hiển thị khi phân trang
      for (let i = start; i <= end; i++) ps.push(i);
      return ps;
    },
  },
  filters: {
    /* 
    Hiển thị giá trị Giới tính
    CreatedBy: NXCHIEN 10/05/2021 
    */
    showGender(value) {
      if (value == "1") {
        return "Nam";
      } else if (value == "0") {
        return "Nữ";
      } else if (value == "2") {
        return "Không xác định";
      }
    },
  },
};
</script>
<style scoped>
.content .box {
  padding: 22px 0px 16px 0px;
}
.box .content-item {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.content-item .content-item-text {
  font-size: 24px;
  color: black;
  background-size: contain;
  background-position: center;
  font-weight: bold;
}
.component-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn-utilities {
  display: flex;
  margin-right: 12px;
}
.btn-edit {
  position: relative;
  display: flex;
  align-items: center;
  /* z-index: 100; */
}
.btn-btn {
  padding: 0 16px;
  border-radius: 30px;
  color: #111;
  height: 36px;
  position: relative;
  border: 1px solid #8d9096;
  background-color: transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  box-sizing: border-box;
  background: 0 0;
  overflow: visible;
  outline: none;
}
.btn-btn-text {
  font-weight: 600;
  position: relative;
  color: inherit;
  display: inline-block;
  transition: all 0.25s ease;
  white-space: nowrap;
  font-size: 13px;
  line-height: 13px;
  justify-content: center;
  align-items: center;
}
.pr-4 {
  padding-right: 4px !important;
}

.flex {
  display: flex !important;
}
.header-icon {
  background: url("../../../assets/Sprites.5f05e81f.svg") no-repeat;
  cursor: pointer;
  min-width: 16px;
  min-height: 16px;
  height: 16px;
  width: 16px;
}
.arrow-up--black {
  background-position: -560px -359px;
}
.arrow-up--white {
  background-position: -848px -359px;
}
.line {
  left: -20px;
  height: 20px;
  top: 0;
  position: absolute;
  border: 1px solid transparent;
  border-left-color: #fff;
}
.color {
  color: #fff;
  background-color: #2ca01c;
  padding: 8px 14px 8px 20px;
  height: 36px;
  border-radius: 30px 0 0 30px;
  border: none;
}
.color:hover {
  background-color: #3ff128;
  color: #fff;
}
.border {
  border-radius: 0 30px 30px 0;
  border: none;
}
.back {
  cursor: pointer;
  width: max-content;
  justify-items: center;
  align-items: center;
  color: #0075c0;
}
.chevron-left--primary {
  background-position: -224px -360px;
}
.content-icon {
  background: url("../../../assets/Sprites.5f05e81f.svg") no-repeat;
  cursor: pointer;
  min-width: 24px;
  min-height: 24px;
  height: 24px;
  width: 24px;
}

.content .content-table {
  background-color: white !important;
  position: absolute;
  top: 95px;
  /* bottom: 0;  */
  right: 30px;
  left: 20px;
  overflow-y: auto;
  height: calc(100% - 162px);
}
.content-table .item {
  padding: 16px 16px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item .item-right {
  display: flex;
  align-items: center;
  width: 380px;
  justify-content: space-between;
}
.content-table .content-table-height {
  height: calc(100% - 128px);
  /* overflow-y: auto;   */
}
.refresh {
  background-position: -423px -201px;
}
.refresh:hover{
  background-position: -1097px -88px;
}
.excel__nav {
  background-position: -704px -200px;
}
.excel__nav:hover{
  background-position: -704px -256px;
}
.setting__list {
  background-position: -88px -200px;
}
.setting__list:hover{
  background-position: -88px -256px;
}
.check-box {
  height: 16px;
  width: 18px;
}
.content-navpage {
  position: absolute;
  height: 60px;
  bottom: 0;
  right: 0;
  left: 16px;
  border-top: 6px solid #a29d9d;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: white;
}

.content-navpage .content-navpage-text-left {
  margin-left: 10px;
}
.content-navpage .content-navpage-button {
  display: flex;
}
.content-navpage .content-navpage-text-right {
  margin-right: 10px;
}
.arrow-up--blue {
  background-position: -896px -359px;
}
.hover {
  border: none;
  padding: 6px 0px 6px 16px;
}
.padding {
  padding: 0 0 0 10px;
}
.hoverxx {
}
.hoverxx:hover {
  background-color: #eceaea;
}
.fa-3x {
  position: absolute;
  left: 45%;
  top: 43%;
  transform: translate(-50%, -50%);
  /* background-image: url('../../../assets/loading.svg'); */
}

.dropdown {
  position: relative;
}

.dropdown .dropdown-content {
  position: absolute;
  height: 93px;
  width: 123px;
  right: -25px;
  top: 30px;
  background: red;
  z-index: 1000;
}
.display{
  display: none;
}

.footer-complete{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 40px;
}
.autocomplete{
    display: flex;
    min-height: 32px;
    border: 1px solid #babec5;
    border-radius: 2px;
    background-color: #fff;
    height: 32px;
    width: 200px;
}
.selected-option{
  display: flex;
    flex-basis: 100%;
    flex-grow: 1;
    flex-wrap: wrap;
    width: calc(100% - 32px);
    align-items: center;
    padding: 6px 0 6px 12px;
    justify-content: space-around;
}
.style{
  border: none;
  background-color: white;
}
.margin{
  margin-left: 20px;
}
.disable{
  cursor: not-allowed;
}
.active{
  font-weight: 800;
  border: 1px solid #bbb;
}
.message{
  height: 191px;
  width: 100% !important;
  display: block;
}
.img-report{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.nodata-img {
    position: sticky;
    margin: 50px 50px 30px;
    width: 132px;
    height: 74px;
    left: 45%;
}
.input-select{
    background-color: transparent;
    display: flex;
    padding: 0;
    height: 19px;
    width: 154px;
    border: none;
}
.icon-selected{
  display: flex;
  align-items: center;
  justify-content: center; 
}
.icon-selected:hover{
  background-color: #bbb;
}
.arrow-dropdown {
    background-position: -560px -359px;
}
.tranform{
  transform: rotate(180deg);
  transition: transform .15s linear;
}
</style>