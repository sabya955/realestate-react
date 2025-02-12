import React, { useEffect, useState } from "react";
import "./index.css";
import { apis } from "../../comonapi";
import Card from "../card";
import NavBar from "../header";
import { useSelector, useDispatch } from "react-redux";
import {
  setProperties,
  setSelectProduct,
  clearSelectProduct,
} from "./propertiesAction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const Properties = () => {
  const dispatch = useDispatch();
  const { properties = [], selectProduct } = useSelector(
    (state) => state.properties
  );
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";
  const isPropertiesPage = window.location.pathname === "/properties";
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    details: "",
    availability: "",
  });
  useEffect(() => {
    apis
      .get("api/products")
      .then((response) => {
        console.log("Fetched products successfully", response);

        dispatch(setProperties(response.products || []));
      })
      .catch((error) => console.log("Fetch products failed", error));
  }, [dispatch]);
  const handleOpenModel = (product) => {
    dispatch(setSelectProduct(product));
  };
  const handleCloseModel = () => {
    dispatch(clearSelectProduct());
  };
  const handleOpenDialog = () => {
    setOpenAddDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenAddDialog(false);
  };
  const handleChange = (e) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };
  const hanndleAddProperty = () => {
    if (
      !newProperty.name ||
      !newProperty.details ||
      !newProperty.availability ||
      !newProperty.image ||
      !newProperty.price ||
      !newProperty.type
    ) {
      alert("all fields are required");
      return;
    }
    apis
      .post("api/products", newProperty)
      .then((response) => {
        dispatch({ type: "ADD_PROPERTY", payload: response.properties });
        setOpenAddDialog(false);
        window.location.reload()

        setNewProperty({
          name: "",
          price: "",
          type: "",
          image: "",
          details: "",
          availability: "",
        });
      })
      .catch((error) => console.log("failed to add prpoerty", error));
  };
  const handleOpenDeleteDialog = (id) => {
    setPropertyToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);

    setPropertyToDelete(null);
  };
  const handleDeleteProperty = () => {
    if (!propertyToDelete) return;
    apis
      .delete(`api/products/${propertyToDelete}`)
      .then(() => {
        dispatch({ type: "DELETE_PROPERTY", payload: propertyToDelete });
        setOpenDeleteDialog(false);
        handleCloseModel(false)
        window.location.reload()
      })
      .catch((error) => console.log(error));
  };

  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname === "/home" ||
    window.location.pathname === "/landingPage";

  return (
    <>
      <NavBar />
      <div className="main">
        <div className="head">
          <p>Featured Listings</p>
          <h1>Find Your Perfect Home</h1>
        </div>
        <div className="properties">
          {properties
            .slice(0, isHomePage ? 4 : properties.length)
            .map((product) => (
              <div key={product.id} onClick={() => handleOpenModel(product)}>
                <Card {...product} />
              </div>
            ))}
        </div>
        {isAdmin && isPropertiesPage && (
          <IconButton
            onClick={handleOpenDialog}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "#007bff",
              color: "#fff",
            }}
          >
            <AddCircleIcon style={{ fontSize: 50 }} />
          </IconButton>
        )}

        {isHomePage && properties.length > 4 && (
          <a href="/properties" className="view-all-btn">
            View All Properties
          </a>
        )}
        <Dialog open={!!selectProduct} onClose={handleCloseModel}>
          <DialogTitle>{selectProduct?.name}</DialogTitle>
          <DialogContent>
            <img
              src={selectProduct?.image}
              alt={selectProduct?.name}
              style={{
                width: "90%",
                border: "2px solid #ccc",
                borderRadius: "10px",
              }}
            />
            <h4>{selectProduct?.availability}</h4>
            <h3>{selectProduct?.type}</h3>
            <p>
              <strong>Price:</strong> ${selectProduct?.price}
            </p>
            <p>
              <strong>Details:</strong> {selectProduct?.details}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModel} color="secondary">
              Close
            </Button>
            <Button variant="contained" color="primary">
              Book Appointment
            </Button>
            {isAdmin && (
              <Button
                onClick={() => handleOpenDeleteDialog(selectProduct.id)}
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
      <Dialog open={openAddDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Properties</DialogTitle>
        <DialogContent>
          <TextField
            label="name"
            name="name"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={newProperty.name}
          />
          <TextField
            label="price"
            name="price"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={newProperty.price}
          />
          <TextField
            label="Type"
            name="type"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={newProperty.type}
          />
          <TextField
            label="Image URL"
            name="image"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={newProperty.image}
          />
          <TextField
            label="Availability"
            name="availability"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={newProperty.availability}
          />
          <TextField
            label="Details"
            name="details"
            fullWidth
            margin="dense"
            onChange={handleChange}
            value={newProperty.details}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            cancel
          </Button>
          <Button
            onClick={hanndleAddProperty}
            variant="contained"
            color="primery"
          >
            Add Properties
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Property</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this property?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteProperty}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Properties;
