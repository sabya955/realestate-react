import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setUsers, updateUserRole } from "./userAction";
import { apis } from "../../comonapi";
import "./index.css";

const CheckUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users || []);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apis.get("api/seller/users");
        console.log(response);
        dispatch(setUsers(response.users));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  const handleRoleChange = async () => {
    if (selectedUser) {
      try {
        const response = await apis.post("api/seller/updaterole", {
          userId: selectedUser.id,
          isSeller: selectedUser.role !== "seller",
        });

        alert(response.message);
        dispatch(
          updateUserRole(
            selectedUser.id,
            selectedUser.role !== "seller" ? "seller" : "user"
          )
        );
      } catch (error) {
        console.error("Error updating role:", error);
      }
    }
    handleCloseDialog();
  };

  return (
    <div className="check_main">
      <h2>Manage Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="table_head">
            <TableRow className="tableRow">
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.role !== "admin" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenDialog(user)}
                      >
                        {user.role === "seller"
                          ? "Remove Seller"
                          : "Make Seller"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Users Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        disableEnforceFocus
        disableAutoFocus
      >
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            {selectedUser?.role === "seller" ? "remove" : "make"} this user a
            seller?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRoleChange} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckUsers;
