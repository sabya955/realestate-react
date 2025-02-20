import React, { useEffect, useState } from "react";
import "./index.css";
import { apis } from "../../comonapi";
import Card from "../card";
import NavBar from "../header";
import { useSelector, useDispatch } from "react-redux";
import {
  setProperties,
  updatePropertyState,
  addProperty,
} from "./propertiesAction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Properties = () => {
  const dispatch = useDispatch();
  const { properties = [] } = useSelector(
    (state) => state.properties
  );

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";
  const isPropertiesPage = window.location.pathname === "/properties";
  const [selectProduct,setSelectedProduct] = useState(null)
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [newProperty, setNewProperty] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    details: "",
    availability: "",
    state: "",
  });

  useEffect(() => {
    apis
      .get("api/products")
      .then((response) => {
        dispatch(setProperties(response.products || []));
      })
      .catch((error) => console.log("Fetch products failed", error));
  }, [dispatch]);



  const handleOpenModel = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModel = () => {
  setSelectedProduct(null)
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

  const handleAddProperty = () => {
    if (
      !newProperty.name ||
      !newProperty.details ||
      !newProperty.availability ||
      !newProperty.image ||
      !newProperty.price ||
      !newProperty.type
    ) {
      alert("All fields are required");
      return;
    }
    apis
      .post("api/products", newProperty)
      .then((response) => {
        dispatch(addProperty(response.data));
        setOpenAddDialog(false);

        setNewProperty({
          name: "",
          price: "",
          type: "",
          image: "",
          details: "",
          availability: "",
          state: "",
        });
      })
      .catch((error) => console.log("Failed to add property", error));
  };

  const handleUpdateState = () => {
    if (!selectProduct) return;
    apis
      .update("api/products/updatestate", {
        id: selectProduct.id,
        state: selectProduct.state,
      })
      .then((response) => {
        console.log("what is getting",response)
        dispatch(updatePropertyState(response.product));
        handleCloseModel();
      })
      .catch((error) => console.log("Failed to update state", error));
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
            .filter((product) => product.state !== "deprecated" || isAdmin)
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
          <DialogTitle>
            {selectProduct?.name}
            {isAdmin && (
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <FormControl size="small">
                  <InputLabel>State</InputLabel>
                  <Select
                    value={selectProduct?.state || ""}
                    onChange={(e) => setSelectedProduct({...selectProduct,state:e.target.value})}
                    style={{ minWidth: "150px" }}
                  >
                    <MenuItem value="default">Default</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                    <MenuItem value="deprecated">Deprecated</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateState}
                >
                  Change State
                </Button>
              </div>
            )}
          </DialogTitle>
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
          </DialogActions>
        </Dialog>

        <Dialog open={openAddDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="dense"
              onChange={handleChange}
              value={newProperty.name}
            />
            <TextField
              label="Price"
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
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                name="state"
                value={newProperty.state}
                onChange={handleChange}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="deprecated">Deprecated</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleAddProperty}
              variant="contained"
              color="primary"
            >
              Add Property
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Properties;
