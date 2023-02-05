import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "@mui/material";
import { height } from "@mui/system";

// function createData(id, urlNhanVaHDSD, soDangKy, tenThuoc, hoatChatChinh, hamLuong, soQuyetDinh, ngayCapSoDangKy, dotCap, dangBaoChe,dongGoi,tieuChuan,tuoiTho,tenCongTyDangKy,nuocDangKy,
//   diaChiDangKy, tenCongTySanXuat, nuocSanXuat, diaChiSanXuat, loaiThuoc, maHoSo, ngayNop) {
//   return {
//     id, urlNhanVaHDSD, soDangKy, tenThuoc, hoatChatChinh, hamLuong, soQuyetDinh, ngayCapSoDangKy, dotCap, dangBaoChe,dongGoi,tieuChuan,tuoiTho,tenCongTyDangKy,nuocDangKy,
//   diaChiDangKy, tenCongTySanXuat, nuocSanXuat, diaChiSanXuat, loaiThuoc, maHoSo, ngayNop
//   };
// }
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
}));
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "id",
  },
  {
    id: "urlNhanVaHDSD",
    numeric: false,
    disablePadding: false,
    label: "Nhãn và HDSD",
  },
  {
    id: "soDangKy",
    numeric: false,
    disablePadding: false,
    label: "Số đăng ký",
  },
  {
    id: "tenThuoc",
    numeric: false,
    disablePadding: false,
    label: "Tên thuốc",
  },
  {
    id: "hoatChatChinh",
    numeric: true,
    disablePadding: false,
    label: "Hoạt chất chính",
  },
  {
    id: "hamLuong",
    numeric: false,
    disablePadding: false,
    label: "Hàm lượng",
  },
  {
    id: "soQuyetDinh",
    numeric: false,
    disablePadding: false,
    label: "Số quyết định",
  },
  {
    id: "ngayCapSoDangKy",
    numeric: false,
    disablePadding: false,
    label: "Ngày cấp",
  },
  {
    id: "dotCap",
    numeric: false,
    disablePadding: false,
    label: "Đợt cấp",
  },
  {
    id: "dangBaoChe",
    numeric: false,
    disablePadding: false,
    label: "Dạng bào chế",
  },
  {
    id: "dongGoi",
    numeric: false,
    disablePadding: false,
    label: "Đóng gói",
  },
  {
    id: "tieuChuan",
    numeric: false,
    disablePadding: false,
    label: "Tiêu chuẩn",
  },
  {
    id: "tuoiTho",
    numeric: false,
    disablePadding: false,
    label: "Tuổi thọ",
  },
  {
    id: "tenCongTyDangKy",
    numeric: false,
    disablePadding: false,
    label: "Công ty đăng ký",
  },
  {
    id: "nuocDangKy",
    numeric: false,
    disablePadding: false,
    label: "Nước đăng ký",
  },

  {
    id: "diaChiDangKy",
    numeric: false,
    disablePadding: false,
    label: "Địa chỉ đăng ký",
  },
  {
    id: "tenCongTySanXuat",
    numeric: false,
    disablePadding: false,
    label: "Công ty sản xuất",
  },
  {
    id: "nuocSanXuat",
    numeric: false,
    disablePadding: false,
    label: "Nước sản xuất",
  },
  {
    id: "diaChiSanXuat",
    numeric: false,
    disablePadding: false,
    label: "Địa chỉ sản xuất",
  },
  {
    id: "loaiThuoc",
    numeric: false,
    disablePadding: false,
    label: "Loại thuốc",
  },
  {
    id: "maHoSo",
    numeric: false,
    disablePadding: false,
    label: "Mã hồ sơ",
  },
  {
    id: "ngayNop",
    numeric: false,
    disablePadding: false,
    label: "Ngày nộp",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const VxspTable = () => {
  // const addRecord = () => {
  //   axios
  //     .post("http://localhost:5000/create", {})
  //     .then(() => console.log("success"));
  // };

  const [data, setData] = useState([]);
  const [vxspList, setVxspList] = useState([]);
  const [previous, setPrevious] = useState({});
  const classes = useStyles();

  const getVxsp = async () => {
    const response = await axios.get(`http://localhost:5000`);
    setData(response.data);
  };

  useEffect(() => {
    getVxsp();
  });
  const rows = data;

  const onChange = (e, row) => {
    console.log(e.target.value);
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newVxspList = vxspList.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setVxspList(newVxspList);
  };

  const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    return (
      <TableCell align="left" className={classes.tableCell}>
        {row.isEditMode ? (
          <Input
            key={`input-field${row[name] + row.id}`}
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
            className={classes.input}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };

  const onToggleDone = (id) => {
    setVxspList(() => {
      return vxspList.map((row) => {
        if (row.id === id) {
          //updateVxsp(row);
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };
  const onToggleEditMode = (id) => {
    const newVxspList = vxspList.map((row) => {
      if (row.id === id) {
        return { ...row, isEditMode: !row.isEditMode };
      }
      return row;
    });
    setVxspList(newVxspList);
  };
  const onRevert = (id) => {
    const newVxspList = vxspList.map((row) => {
      if (row.id === id) {
        return previous[id]
          ? { ...previous[id], isEditMode: !row.isEditMode }
          : { row, isEditMode: !row.isEditMode };
      }
      return row;
    });
    setVxspList(newVxspList);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
  };

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                   rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.urlNhanVaHDSD}</TableCell>
                      <TableCell align="right">{row.soDangKy}</TableCell>
                      <TableCell align="right">{row.tenThuoc}</TableCell>
                      <TableCell align="right">{row.hoatChatChinh}</TableCell>
                      <TableCell align="right">{row.hamLuong}</TableCell>
                      <TableCell align="right">{row.soQuyetDinh}</TableCell>
                      <TableCell align="right">{row.ngayCapSoDangKy}</TableCell>
                      <TableCell align="right">{row.dotCap}</TableCell>

                      <TableCell align="right">{row.dangBaoChe}</TableCell>
                      <TableCell align="right">{row.dongGoi}</TableCell>
                      <TableCell align="right">{row.tieuChuan}</TableCell>
                      <TableCell align="right">{row.tuoiTho}</TableCell>

                      <TableCell align="right">{row.tenCongTyDangKy}</TableCell>
                      <TableCell align="right">{row.nuocDangKy}</TableCell>
                      <TableCell align="right">{row.diaChiDangKy}</TableCell>
                      <TableCell align="right">
                        {row.tenCongTySanXuat}
                      </TableCell>
                      <TableCell align="right">{row.nuocSanXuat}</TableCell>
                      <TableCell align="right">{row.diaChiSanXuat}</TableCell>
                      <TableCell align="right">{row.loaiThuoc}</TableCell>
                      <TableCell align="right">{row.maHoSo}</TableCell>
                      <TableCell align="right">{row.ngayNop}</TableCell>

                      <TableCell className={classes.selectTableCell}>
                        {row.isEditMode ? (
                          <>
                            <IconButton
                              aria-label="revert"
                              onClick={() => onRevert(row.id)}
                            >
                              <SaveIcon />
                            </IconButton>
                            <IconButton
                              aria-label="done"
                              onClick={() => onToggleDone(row.id)}
                            >
                              <DoneIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton
                              aria-label="edit"
                              onClick={() => onToggleEditMode(row.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => delete row.id}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                      <CustomTableCell
                        {...{ row, name: "soDangKy", onChange }}
                      />
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default VxspTable;
