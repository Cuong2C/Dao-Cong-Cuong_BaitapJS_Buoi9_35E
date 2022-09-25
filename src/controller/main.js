function getEle(id) {
    return document.getElementById(id);
}
// tạo đối tượng dsnv
var dsnv = new DSNV();

// đối tượng validation
var validation = new Validation();

// lấy dữ liệu trong localStorage
getLocalStorage();

// Lấy thông tin nv
function layThongTinNV(isAdd) {
    var taiKhoan = getEle("tknv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCB = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value;

    //bien flag
    var isValid = true;
    // check validation

    if(isAdd){
        isValid &= validation.kiemTraRong(taiKhoan,"error","(*)Vui lòng nhập tài khoản")&&
    validation.kiemTraKyTu(
        taiKhoan,
        "error",
        "(*)Vui lòng nhập 4-6 ký số",
        4,
        6
    )&& validation.kiemTraDinhDang( 
        taiKhoan,
        "error",
        "(*)Vui lòng nhập 4-6 ký số",
        validation.dangso)&& validation.kiemTraTaiKhoan(
            taiKhoan,
            "error",
            "(*)Tài khoản đã tồn tại",
            dsnv.arr
            );

    }


    isValid &= validation.kiemTraRong(hoTen,"error1","(*)Vui lòng nhập họ tên")&&
    validation.kiemTraDinhDang( 
        hoTen,
        "error1",
        "(*)Vui lòng nhập tên hợp lệ",
        validation.dangChuViet);
    isValid &= validation.kiemTraRong(email,"error2","(*)Vui lòng nhập email")&&
    validation.kiemTraDinhDang( 
        email,
        "error2",
        "(*)Vui lòng nhập tên hợp lệ",
        validation.email);
    isValid &= validation.kiemTraRong(matKhau,"error3","(*)Vui lòng nhập password")&&
    validation.kiemTraKyTu(
        matKhau,
        "error3",
        "(*)Vui lòng nhập password 6-10 ký tự chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt",
        6,
        10
    )&& validation.kiemTraDinhDang( 
        matKhau,
        "error3",
        "(*)Vui lòng nhập password 6-10 ký tự chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt",
        validation.matKhau);
    isValid &= validation.kiemTraRong(ngayLam,"error4","(*)Vui lòng nhập ngày làm");
    isValid &= validation.kiemTraRong(luongCB,"error5","(*)Vui lòng nhập lương cơ bản")&&
    validation.kiemTraMucLuong(luongCB,"error5","(*)Vui lòng nhập lương CB hợp lệ trong khoản 1 000 000 -20 000 000", 1000000, 20000000);
    isValid &= validation.kiemTraRong(chucVu,"error6","(*)Vui lòng chọn chức vụ");
    isValid &= validation.kiemTraRong(gioLam,"error7","(*)Vui lòng nhập giờ làm")&&
    validation.kiemTraMucLuong(gioLam,"error7","(*)Vui lòng nhập giờ làm hợp lệ trong khoản 80-200", 80, 200);



    if (isValid) {
        // tạo đối tượng NV
        var nv = new NhanVien(
            taiKhoan,
            hoTen,
            email,
            matKhau,
            ngayLam,
            luongCB,
            chucVu,
            gioLam
        );

        // tinh tong luong
        nv.tinhTongLuong();
        //Xếp loại
        nv.xepLoai();

        return nv;
    }

    return null;
};



// Thêm nv
getEle("btnThemNV").addEventListener("click", function () {
    var nv = layThongTinNV(true);
    //   console.log(nv);

    if(nv){
        dsnv.themNV(nv);
        // console.log(dsnv.arr);
    
        // tạo bảng danh sách
        renderTable(dsnv.arr);
    
        // Lưu xuống
        setLocalStorage();
    }
  

});

function renderTable(data) {
    var content = "";
    data.forEach(function (nv) {
        content += `
            <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loaiNV}</td>  
            <td><button class="btn btn-info" onclick="editNV('${nv.taiKhoan}')">Edit</button>
            <button class="btn btn-danger" onclick="deleteNV('${nv.taiKhoan}')">Delete</button></td>  
            </tr>
        `;
    });
    getEle("tableDanhSach").innerHTML = content;
};


// Hàm sửa NV
function editNV(taiKhoan) {
    var nv = dsnv.layThongTinCTNV(taiKhoan);
    if (nv) {
        getEle("btnThem").click()
        getEle("tknv").value = nv.taiKhoan;
        // disable tai khoản
        getEle("tknv").disabled = true;
        getEle("name").value = nv.hoTen;
        getEle("email").value = nv.email;
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCB;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;
        getEle("btnThemNV").style.display = "none" ;

        //  getEle("myModal").style.display = "block";
    }
};


// Cập nhật NV
getEle("btnCapNhat").addEventListener("click", function () {
    var nv = layThongTinNV(false);
    dsnv.capNhatNV(nv);
    renderTable(dsnv.arr);
});



// hàm Tìm kiêm
getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNV(keyword);
    renderTable(mangTimKiem);
    console.log(mangTimKiem);
});



// hàm xóa nv
function deleteNV(taiKhoan) {
    dsnv.xoaNV(taiKhoan);
}

function setLocalStorage() {
    // chuyển mảng sang kiều string
    var dataString = JSON.stringify(dsnv.arr);
    // Lưu xuống 
    localStorage.setItem("dsnv", dataString);
};

function getLocalStorage() {
    var dataString = localStorage.getItem("dsnv");
    // chuyển từ string sang JSON
    dsnv.arr = JSON.parse(dataString);
    renderTable(dsnv.arr);
    setLocalStorage();
}