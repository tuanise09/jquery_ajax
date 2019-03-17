function NguoiDungService() {
    this.layDanhSachNguoiDung = function () {
        $.ajax({
          url:
            "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
          type: "GET"
        })
        .done(function(danhSachNguoiDung) {
        taoBang(danhSachNguoiDung);
        })
        .fail(function(err) {
        console.log(err);
        });
    }

    this.layDanhSach = function () {
        $.ajax({
            url:
              "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET"
          })
          .done(function(result) {
            danhSachNguoiDung = result;
            console.log(danhSachNguoiDung);
            alert('lấy ds thành công')
          })
          .fail(function(err) {
          console.log(err);
          });
        return danhSachNguoiDung;
    }

    this.themNguoiDung = function(nguoiDung){
        $.ajax({
            url:  "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDung
        })
        .done(function(result){
            console.log(result);
            if(result ==='tai khoan da ton tai !'){
                alert("Tài Khoản đã tồn tại");
            } else {
                location.href = "";
            }
        })
        .fail(function(err){
            console.log(err);
        })
    }

    this.xoaNguoiDung = function(taiKhoan){
        $.ajax({
            url:  `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
            type: "DELETE",
            // data: nguoiDung
        })
        .done(function(result){
            console.log(result);
            alert('Tài Khoản Đã Được Xóa !');
            location.href = ""; //refresh trang lại
        })
        .fail(function(err){
            console.log(err);
        })
    }

    this.capNhatNguoiDung = function(nguoiDung){
        var nguoiDungSua = JSON.stringify(nguoiDung)
        $.ajax({
            url:  `http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
            type: "PUT",
            contentType: 'application/json',
            dataType: "json",
            data: nguoiDungSua
        })
        .done(function(result){
            console.log(result);
            alert('Tài Khoản Đã Được Cập Nhật !');
            location.href = ""; //refresh trang lại
        })
        .fail(function(err){
            console.log(err);
        })
    }

    this.layThongTinNguoiDung = function(taiKhoan){
        $.ajax({
            url:  `http://svcy.myclass.vn/api/QuanLyTrungTam/ThongTinNguoiDung?taikhoan=${taiKhoan}`,
            type: "GET",
            async:false
        })
        .done(function(result){
            console.log(result);
            thongtinnguoidung = result;
            console.log('lấy dc thong tin');
        })
        .fail(function(err){
            console.log(err);
        })     
        return thongtinnguoidung;
    }
}
function taoBang(danhSachNguoiDung) {
    var tblBody = "";
    danhSachNguoiDung.map(function (item, index) {
        tblBody += `<tr>
        <td>${index + 1}</td>
        <td>${item.TaiKhoan}</td>
        <td>${item.MatKhau}</td>
        <td>${item.HoTen}</td>
        <td>${item.Email}</td>
        <td>${item.SoDT}</td>
        <td>${item.TenLoaiNguoiDung}</td>
        <td>
        <button id='btnSua' class='btn btn-primary' data-toggle="modal" data-taikhoan="${item.TaiKhoan}" data-target="#myModal">Sửa</button>
        <button id='btnXoa' class='btn btn-danger' data-taikhoan="${item.TaiKhoan}">Xóa</button></td>
    </tr>`
    })
    $("#tblDanhSachNguoiDung").html(tblBody);
}

