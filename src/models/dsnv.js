function DSNV(){
    this.arr = [];
    this.themNV = function(nv){
        this.arr.push(nv);
    };

    this.timViTri = function(taiKhoan){
       var index =-1;

        dsnv.arr.forEach(function(nv,i){
            if(nv.taiKhoan === taiKhoan){
                index = i;
            }
        });
        return index;
    }

    this.xoaNV = function(taiKhoan){
      var index = this.timViTri(taiKhoan);
        if(index !== -1){
            this.arr.splice(index,1);
        }
        renderTable(dsnv.arr);
        setLocalStorage();
    };

    this.layThongTinCTNV = function(taiKhoan){
        var index = this.timViTri(taiKhoan);
        if(index !== -1){
            return this.arr[index];
        }
        return null;
    };

    this.capNhatNV = function(nv){
        var index = this.timViTri(nv.taiKhoan);
        if(index !== -1){
            this.arr[index] = nv;
        }
    };

    this.timKiemNV = function(keyword){
        var mangTimKiem = [];
        this.arr.forEach(function(nv){
            var loaiNV = nv.loaiNV.toLowerCase();
            var textSearch = keyword.toLowerCase();
            if(loaiNV.indexOf(textSearch) !== -1){
                mangTimKiem.push(nv);
            }
        });
        return mangTimKiem;
    }
}