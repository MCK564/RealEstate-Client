import { Container, IconButton, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { findBuildingsByUserId,deleteById } from "../../utils/ApiFunction";
import Header from "../../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import appEnqueueSnackbar from "../../utils/AppSnackbar";
export const OwnerPostPage = () =>{
    const [buildings, setBuildings] = useState([]);
    
    const navigate = useNavigate();
    useEffect(()=>{
        findBuildingsByUserId().then((response)=>{
            if(response){
                setBuildings(response);
            }
        })
    },[]);

   
    const handleDelete = (id)=>{
      deleteById(id).then((response)=>{
        if(response){
            setBuildings(buildings => buildings.filter(building => building.id !== id));
            appEnqueueSnackbar("Xóa thành công", { variant: "success" });
        }
      })
    }
    return (
        <Container sx={{ mt: "5rem" }}>
           <Paper   sx={{
            padding:"10px"
           }}>
           <Header title="Danh sách các bất động sản đã đăng"/>
           <Table>
            <TableHead>
                <TableRow sx={{padding:"10px",bgcolor:"gold"}}>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>ID</TableCell>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>Ảnh đại diện</TableCell>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>Bất động sản</TableCell>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>Giá thuê</TableCell>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>Địa chỉ</TableCell>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>Số người thích</TableCell>
                <TableCell style={{ position: "sticky", top: 0, zIndex: 1, }}>Thao tác</TableCell>
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
                        <TableCell>
                           <Stack direction="row" spacing={1}>
                            <IconButton onClick={()=>handleDelete(building.id)} color="error">
                                    <DeleteIcon/>
                            </IconButton>
                            <IconButton onClick={()=>navigate(`/new-post?id=${building.id}`)} color="warning">
                                    <EditIcon/>
                            </IconButton>
                           </Stack>
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
           </Table>
           </Paper>
        </Container>
    )
}