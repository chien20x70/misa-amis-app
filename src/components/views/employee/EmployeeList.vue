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
          />
          <div class="content-icon refresh"></div>
          <div class="content-icon excel__nav"></div>
          <div class="content-icon setting__list"></div>
        </div>
      </div>
      <div class="content-table-height">
        <table class="tblListEmployee" border="0" width="96%">
          <thead>
            <tr>
              <th style="width: 34px;">
                <input type="checkbox" class="check-box" />
              </th>
              <th>MÃ NHÂN VIÊN</th>
              <th>TÊN NHÂN VIÊN</th>
              <th>CHỨC DANH</th>
              <th>SỐ TÀI KHOẢN</th>
              <th>TÊN NGÂN HÀNG</th>
              <th>TRẠNG THÁI</th>
              <th>GIỚI TÍNH</th>
              <th>NGÀY SINH</th>
              <th>SỐ CMND</th>
              <th>CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(employee, index) in employees"
              :key="index"
              @dblclick="dblClickTable(employee.employeeId)"
            >
              <td style="width: 34px;">
                <input type="checkbox" class="check-box" />
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
              <td>
                <div class="btn-edit">
                  <button class="btn-btn hover" @click="btnEditClick(employee.employeeId)">
                      <div class="flex btn-btn-text">
                          <span class="pr-4" style="color: #0075c0; font-weight: 600">Sửa</span>
                      </div>
                  </button>                  
                  <Dropdown/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="content-navpage">
        <div class="content-navpage-text-left">Tổng số: 13 bản ghi</div>
        <div class="content-navpage-text-right right">10 Khách hàng/trang</div>
      </div>
    </div>
    <EmployeeDialog
      :state="show"
      @hideDialog="hideDialog"
      @hideDialogNotLoad="hideDialogNotLoad"
      :employee="selectedEmployee"
      :flag="status"
    />
    <div class="fa-3x" v-if="isBusy">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
  </div>
</template>
<script>
import EmployeeDialog from "./EmployeeDialog.vue";
import Dropdown from "./Dropdown.vue"
import axios from "axios";
export default {
  components: {
    EmployeeDialog,
    Dropdown
  },
  data() {
    return {
      employees: [],
      show: false,
      selectedEmployee: {},
      recordId: null,
      status: null,
      isBusy: false,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.isBusy = true;
      axios
        .get("https://localhost:44314/api/v1/Employees")
        .then((response) => {
          console.log(response);
          this.employees = response.data;
        })
        .catch((response) => {
          console.log(response);
        })
        .then(() => {
          this.isBusy = false;
        });
    },
    btnAddClick() {
      this.show = true;
      this.status = "add";
      axios
        .get("https://localhost:44314/api/v1/Employees/employeeCode")
        .then((response) => {
          console.log(response.data);
          var increCode = response.data;
          increCode = increCode.substring(4);
          this.selectedEmployee = {};
          this.selectedEmployee.employeeCode = "NV00" + (Number(increCode) + 1);
        })
        .catch((response) => {
          console.log(response);
        });
    },

    hideDialogNotLoad() {
      this.show = false;
    },

    hideDialog() {
      this.show = false;
      this.loadData();
    },

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
          this.selectedEmployee.dateOfBirth = this.dateFormatYYMMDD(
            this.selectedEmployee.dateOfBirth
          );
          this.selectedEmployee.dateOfIN = this.dateFormatYYMMDD(
            this.selectedEmployee.dateOfIN
          );
        })
        .catch((response) => {
          console.log(response);
        });
    },

    btnEditClick(employeeClickId){
      this.dblClickTable(employeeClickId);

    },

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
  filters: {
    dateFormatDDMMYY(date) {
      var newDate = new Date(date);
      var day = newDate.getDate();
      var month = newDate.getMonth() + 1;
      var year = newDate.getFullYear();
      day = day < 10 ? "0" + day : day;
      month = month < 10 ? "0" + month : month;
      return `${day}/${month}/${year}`;
    },

    showDepartment(value) {
      if (value == "f79d916a-ae77-11eb-8a1f-00163e047e89") {
        return "Phòng nhân sự";
      } else if (value == "f79d9419-ae77-11eb-8a1f-00163e047e89") {
        return "Phòng đào tạo";
      } else if (value == "f79d915a-ae77-11eb-8a1f-00163e047e89") {
        return "Phòng quản lý";
      }
    },

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
  left: -16px;
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
  bottom: 0;
  right: 30px;
  left: 20px;
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
  width: 23%;
  justify-content: space-between;
}
.content-table .content-table-height {
  height: calc(100% - 125px);
  overflow-y: auto;
}
.refresh {
  background-position: -423px -201px;
}
.excel__nav {
  background-position: -704px -200px;
}
.setting__list {
  background-position: -88px -200px;
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
</style>