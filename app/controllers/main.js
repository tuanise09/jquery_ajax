$(document).ready(function () {
    var nguoiDungService = new NguoiDungService();

    layDanhSachNguoiDung();

    $("#btnThemNguoiDung").click(function () {
        $(".modal-title").html("Thêm người dùng");
        var footer = "<button id='btnThem' class='btn btn-success'>Thêm</button><button id='btnDong' class='btn btn-danger' data-dismiss='modal'>Đóng</button>";
        $(".modal-footer").html(footer);
    });

    $("body").delegate("#btnThem", "click", function(){
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, loaiNguoiDung);
        nguoiDungService.themNguoiDung(nguoiDung);
    })

    // Lấy ra tài khoản cần sửa
    $("body").delegate("#btnSua", "click", function(){
        // Bước 1: Lấy mảng danh sách người dùng về localstorage
        // SetLocalStore(nguoiDungService.layDanhSach());
        // var mangNguoiDung = GetLocalStore();
        // console.log(mangNguoiDung);
        
        //Bước 2: lấy thông tin tài khoản theo vị trí taiKhoan từ nút sửa
        
        // var nguoiDungTK;
        // var viTri;
        // for (let i = 0; i < mangNguoiDung.length; i++) {
        //     nguoiDungTK = mangNguoiDung[i];
        //     if (nguoiDungTK.TaiKhoan === taiKhoan) {
        //         viTri = i;
        //         return viTri;
        //     }
        // }
        // console.log(viTri);
        
        var taiKhoan = $(this).data('taikhoan');
        var thongTinNguoiDung = nguoiDungService.layThongTinNguoiDung(taiKhoan);
        console.log(thongTinNguoiDung);
        thongTinNguoiDung.map(function(item){
            $("#TaiKhoan").val(item.TaiKhoan);
            $("#HoTen").val(item.HoTen);
            $("#MatKhau").val(item.MatKhau);
            $("#Email").val(item.Email);
            $("#SoDienThoai").val(item.SoDT);
            $("#loaiNguoiDung").val(item.MaLoaiNguoiDung);
        })
        console.log(thongTinNguoiDung);
        
        // Thêm nút cập nhật
        var footer = "<button id='btnCapNhat' class='btn btn-success'>Cập Nhật</button><button id='btnDong' class='btn btn-danger' data-dismiss='modal'>Đóng</button>";
        $(".modal-footer").html(footer);

        // sự kiện nút cập nhật
        $("body").delegate("#btnCapNhat", "click", function(){
            var taiKhoan = $("#TaiKhoan").val();
            var hoTen = $("#HoTen").val();
            // var matKhau = $("#MatKhau").val();
            var matKhau = "123456";
            var email = $("#Email").val();
            var soDT = $("#SoDienThoai").val();
            var loaiNguoiDung = $("#loaiNguoiDung").val();
            var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, loaiNguoiDung);
            nguoiDungService.capNhatNguoiDung(nguoiDung);
        })
    })

    // Lấy ra tài khoản cần xóa
    $("body").delegate("#btnXoa", "click", function(){
        var taiKhoan = $(this).data('taikhoan');
        // console.log(taiKhoan);
        nguoiDungService.xoaNguoiDung(taiKhoan);
        // console.log('abc');
    })

    function layDanhSachNguoiDung(){
        nguoiDungService.layDanhSachNguoiDung();
    }
})

// Tạo local store
function SetLocalStore(mangNguoiDung) {
    localStorage.setItem("dsNguoiDung", JSON.stringify(mangNguoiDung));
}

function GetLocalStore() {
    // var mangNguoiDung = [];
    if (localStorage.getItem("dsNguoiDung") != null) {
        var mangNguoiDung = localStorage.getItem("dsNguoiDung");
        // mangNguoiDung = JSON.parse(chuoi);
    }
    // return mangNguoiDung;
    return mangNguoiDung;
}