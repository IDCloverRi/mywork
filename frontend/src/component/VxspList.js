import React, { useEffect, useState } from "react";
import axios from "axios";
import "./vxsplist.css";

import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const VxspList = () => {
  const [data, setData] = useState([]);

  const getVxsp = async () => {
    const response = await axios.get(`http://localhost:5000`);
    setData(response.data);
  };

  useEffect(() => {
    getVxsp();
  });

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "urlNhanVaHDSD",
      headerName: "Nhãn và HDSD",
      width: 50,
    },
    {
      field: "soDangKy",
      headerName: "Số đăng ký",
      width: 150,
    },
    {
      field: "tenThuoc",
      headerName: "Tên thuốc",

      width: 110,
    },
    {
      field: "hamLuong",
      headerName: "Hàm lượng",
      width: 110,
    },
    {
      field: "hoatChatChinh",
      headerName: "Hoạt chất",
      width: 160,
    },

    {
      field: "soQuyetDinh",
      headerName: "Số quyết định",
      width: 110,
    },
    {
      field: "ngayCapSoDangKy",
      headerName: "Ngày cấp",
      width: 90,
    },
    {
      field: "dotCap",
      headerName: "Đợt cấp",
      width: 160,
    },
    {
      field: "dangBaoChe",
      headerName: "Dạng bào chế",
      width: 160,
    },
    {
      field: "dongGoi",
      headerName: "Quy cách đóng gói",
      width: 160,
    },
    {
      field: "tieuChuan",
      headerName: "Tiêu chuẩn",
      width: 90,
    },
    {
      field: "tuoiTho",
      headerName: "Tuổi thọ",
      width: 100,
    },
    {
      field: "tenCongTyDangKy",
      headerName: "Công ty đăng ký",
      width: 160,
    },
    {
      field: "nuocDangKy",
      headerName: "Nước đăng ký",
      width: 100,
    },
    {
      field: "diaChiDangKy",
      headerName: "Địa chỉ đăng ký",
      width: 160,
    },
    {
      field: "tenCongTySanXuat",
      headerName: "Công ty sản xuất",
      width: 160,
    },
    {
      field: "nuocSanXuat",
      headerName: "Nước sản xuất",
      width: 100,
    },
    {
      field: "diaChiSanXuat",
      headerName: "Địa chỉ sản xuất",
      width: 160,
    },

    {
      field: "loaiThuoc",
      headerName: "Loại thuốc",
      width: 100,
    },
    {
      field: "maHoSo",
      headerName: "Mã hồ sơ",
      width: 70,
    },

    {
      field: "ngayNop",
      headerName: "Ngày nộp",
      width: 120,
    },
  ];
  const rows = data;
  return (
    <Box sx={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        getRowHeight={() => "auto"}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default VxspList;
