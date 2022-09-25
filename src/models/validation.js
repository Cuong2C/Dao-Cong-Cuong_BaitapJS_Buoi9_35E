function Validation(){
    this.dangso = /^[0-9]+$/;
    this.dangChuViet = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    this.dangEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.dangMatKhau = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    this.dangNgay = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

    this.kiemTraRong = function(value, error, mess){
        if(value.trim() === "" || value ==="Chọn chức vụ"){
            getEle(error).innerHTML = mess;
            getEle(error).style.display = "block";
            return false;
        }
        getEle(error).innerHTML = "";
        getEle(error).style.display = "none";
        return true;
    };
    this.kiemTraKyTu = function(value, error, mess, min, max){
        if(value.length >= min && value.length <= max){
            getEle(error).innerHTML = "";
            getEle(error).style.display = "none";
            return true;
        }
        getEle(error).innerHTML = mess;
        getEle(error).style.display = "block";
        return false;
    };

    this.kiemTraMucLuong = function(value, error, mess, min, max){
        if(value >= min && value <= max){
            getEle(error).innerHTML = "";
            getEle(error).style.display = "none";
            return true;
        }
        getEle(error).innerHTML = mess;
        getEle(error).style.display = "block";
        return false;
    };

    this.kiemTraDinhDang = function(value, error, mess, letter){
        if(value.match(letter)){
            getEle(error).innerHTML = "";
            getEle(error).style.display = "none";
            return true;
        }
        getEle(error).innerHTML = mess;
        getEle(error).style.display = "block";
        return false;
    };

    this.kiemTraTaiKhoan = function(value, error, mess, arr){
        var isExist = false;
        for(var i = 0; i < arr.length; i++){
            var nv = arr[i];
            if(nv.taiKhoan === value){
                isExist = true;
                break;
            }
        };
        if(isExist){
            getEle(error).innerHTML = mess;
            getEle(error).style.display = "block";
            return false;
        }
        getEle(error).innerHTML = "";
        getEle(error).style.display = "none";
        return true;
    };

}