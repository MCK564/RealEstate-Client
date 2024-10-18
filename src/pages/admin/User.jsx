import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { searchUsers,findBuildingsByOwnerId } from "../../utils/ApiFunction";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";

export const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [buildings, setBuildings] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    console.log(id);
    findBuildingsByOwnerId(id).then((response)=>{
      if(response){
        setBuildings(response);
      }
    })
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false)
    setBuildings([]);
  };
  const handleKeyWordchange = (e)=>{
    setKeyword(e.target.value);
  }

  useEffect(() => {
    const data = {
      keyword: "",
    };
    search(data);
  }, []);

  const {
    register,
    handleSubmit,
  } = useForm();

  const search = async (data) => {
    data = { ...data, limit: 3 };
    data = { ...data, page: currentPage == 0 ? 0 : currentPage -1 };
    data = {...data, keyword: keyword};
    setLoading(true);
    try {
      const response = await searchUsers(data);
      if (response) {
        setUsers(response.userResponses);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.error("Error occurred while searching users", error);
    }
    setLoading(false);
  };

  useEffect(()=>{
    search()
  },[currentPage]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <Box marginLeft="65px">
        <Box p="15px">
          <Header
            title="Quản lý người dùng"
            subtitle="Xem danh sách người dùng"
          />
        </Box>
        <Box border="1px solid lightGray" p="15px" borderRadius="5px">
          <Stack spacing={2}>
            <Box
              component="form"
              onSubmit={handleSubmit(search)}
              display="flex"
              gap={1}
              justifyContent="space-between"
              alignItems="stretch"
            >
              <TextField
                {...register("keyword")}
                variant="outlined"
                label="Từ khóa"
                sx={{ flex: "1" }}
                value={keyword}
                onChange={handleKeyWordchange}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ height: "100%" }}
                disabled={loading}
              >
                {loading ? "Đang tìm kiếm..." : "Tìm kiếm"}
              </Button>
            </Box>

            <Divider />
            <Table>
              <TableHead>
                <TableRow sx={{ padding: "10px", bgcolor: "pink" }}>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    ID
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Ảnh đại diện
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Họ tên
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Số điện thoại
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Email
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Số bài đăng
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Thao tác
                  </TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.length > 0 &&
                  users.map((user, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>
                          <Avatar src={user.avatar} alt={user.name} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" textAlign="left">
                            {user.fullname}
                          </Typography>
                        </TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Typography onClick={()=>handleOpen(user.id)} sx={{
                            "&:hover":{
                              color:'pink',
                              textDecoration:"underlined",
                              cursor:"pointer"
                            }
                          }}>
                            {user.number_of_post}
                          </Typography>
                        </TableCell>
                        <TableCell>
                            <Stack direction="row" spacing={2}>
                                <IconButton color="error" >
                                X
                                </IconButton>
                            </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          shape="rounded"
          variant="outlined"
          sx={{padding:"10px", bgcolor:"pink"}}
        />
          </Stack>
        </Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          bgcolor:"#fff",
          border:"1px solid #00994c",
          borderRadius:"10px",
          p:"10px",
          mx:"auto",
          mt:"20px",
           top: '5%',
          left: '5%',
                  }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Danh sách bài đăng
          </Typography>
          <TableContainer sx={{maxHeight:500}}>
          <Table stickyHeader>
            <TableHead>
                <TableRow sx={{padding:"10px",bgcolor:"yellow"}}>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>ID</TableCell>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>Ảnh đại diện</TableCell>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>Bất động sản</TableCell>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>Giá thuê</TableCell>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>Địa chỉ</TableCell>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>Số người thích</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {buildings.map(building => (
                    <TableRow key={building.id}>
                        <TableCell>
                            {building.id}
                        </TableCell>
                        <TableCell>
                            <img src={building.avatarUrl} style={{borderRadius:"10px",boxShadow:"0px 5px 5px rgba(0,0,0,0.3)"}}/>
                        </TableCell>
                        <TableCell>
                         <Link to={"/realEstate/"+building.id} >
                         {building.name}
                            </Link>  
                        </TableCell>
                        <TableCell>
                            {building.rentPrice}
                        </TableCell>
                        <TableCell>
                            {building.address}
                        </TableCell>
                        <TableCell>
                          <Typography  color="royalblue" fontWeight="600">
                          {building.liker_ids.length}
                          </Typography>
                        </TableCell>
                       

                    </TableRow>
                ))}
            </TableBody>
           </Table>
          </TableContainer>
          
        </Box>
      </Modal>
      </Box>
    </>
  );
};
