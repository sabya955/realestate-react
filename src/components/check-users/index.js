import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from "@mui/material";
import { apis } from "../../comonapi";
import './index.css'

const CheckUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apis.get("api/seller/users");
      console.log(response);
      
      setUsers(response.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
const handelOpenDialog = (user)=>{
  setSelectedUser(user)
  setOpen(true)
}
const handelCloseDialog = ()=>{
  setSelectedUser(null)
  setOpen(false)
}

  const handleRoleChange = async (userId, isSeller) => {
    try {
      const response = await apis.post("api/seller/updaterole", { userId:selectedUser.id, isSeller:selectedUser.role !=="seller" });
      alert(response.message);
      fetchUsers();
      handelCloseDialog()
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };


  return (
    <div className="check_main">
      <h2>Manage Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="table_head">
            <TableRow className="tableRow">
              <TableCell >Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.role !== "admin" && (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handelOpenDialog(user)}
                        // onClick={() => handleRoleChange(user.id, user.role !== "seller")}
                      >
                        {user.role === "seller" ? "Remove Seller" : "Make Seller"}
                      </Button>
                    </>
                  )}
                   
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handelCloseDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {selectedUser?.role === "seller"? "remove":"make" } this user as a seller?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleRoleChange} color="primery" onClose={handelCloseDialog}>Confirm</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
};

export default CheckUsers;
