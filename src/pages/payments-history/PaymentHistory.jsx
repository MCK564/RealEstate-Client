import {
    Box,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import Header from "../../components/Header";
  import { useEffect, useState } from "react";
  import { getPaymentHistorybyUserId } from "../../utils/ApiFunction";
  
  export const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [totalPaid, setTotalPaid] = useState(0);
  
    useEffect(() => {
      getPaymentHistorybyUserId().then((response) => {
        console.log(response);
        setPayments(response.payment_responses);
        setTotalPaid(response.total_paid);
      });
    }, []);
    

    return (
      <Container sx={{ mt: "5rem" }}>
        <Box
          component={"form"}
          border={0.5}
          p="20px"
          borderRadius="15px"
          boxShadow="0px 5px 10px rgba(0,0,0,0.4)"
        >
          <Header title="Lịch sử giao dịch" subtitle={`Tổng chi: ${totalPaid} VND`}/>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ padding: "10px" }}>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    ID
                  </TableCell>
                  <TableCell>Số tiền</TableCell>
                  <TableCell>Số lượt</TableCell>
                  <TableCell>Email xác nhận</TableCell>
                  <TableCell>Ngày giao dịch</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.length > 0 &&
                  payments.map((p, index) => {
                    // Create a Date object from p.created_at
                    const createdAt = new Date(
                      p.created_at[0],    // Year
                      p.created_at[1] - 1,  // Month (0-based in JS)
                      p.created_at[2],    // Day
                      p.created_at[3],    // Hour
                      p.created_at[4],    // Minute
                      p.created_at[5]     // Second
                    );
                    return (
                      <TableRow key={index}>
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{p.money} (VND)</TableCell>
                        <TableCell>{p.posts}</TableCell>
                        <TableCell>{p.identified_email}</TableCell>
                        <TableCell>{createdAt.toLocaleString()}</TableCell> {/* Format the date */}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    );
  };
  