function NhanVien(
    _taiKhoan,
    _hoTen,
    _email,
    _matKhau,
    _ngayLam,
    _luongCB,
    _chucVu,
    _gioLam
    ){
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.loaiNV = "";

        this.tinhTongLuong = function(){
            if(this.chucVu == "Sếp"){
                this.tongLuong = this.luongCB*3;
            }else if(this.chucVu == "Trưởng phòng"){
                this.tongLuong = this.luongCB*2;
            }else if(this.chucVu == "Nhân viên"){
                this.tongLuong = this.luongCB;
            }
        };

        this.xepLoai = function(){
            if(this.gioLam >= 192){
                this.loaiNV = "Xuất sắc";
            }else if(this.gioLam >=176){
                this.loaiNV = "Giỏi";
            }else if(this.gioLam >= 160){
                this.loaiNV = "Khá";
            }else if(this.gioLam<160){
                this.loaiNV = "Trung bình";
            }
        };
}