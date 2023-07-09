import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const ManageProductComp = (args) => {
  const [productDetails, setProductDetails] = useState([]);
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);
  const [addFilter, setAddFilter] = useState("");
  const [addName, setAddName] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [addDesc, setAddDesc] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [deleteProductSelect, setDeleteProductSelect] = useState();

  let data = JSON.parse(localStorage.getItem("data"));
  let userToken = data.token;

  const fetchCategoryDetails = async () => {
    const apiUrl = "http://localhost:8081/category/get";

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.get(apiUrl, config);
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addProductModalToggle = () => {
    fetchCategoryDetails();
    setModal(!modal);
  };

  const deleteProductModalToggle = (productId) => {
    setDeleteProductSelect(productId);
    setModal2(!modal2);
  };

  const resetForm = () => {
    setAddName("");
    setAddPrice("");
    setAddCategory("");
    setAddDesc("");
  };

  const handleFilter = (e) => {
    setAddFilter(e.target.value);
    const filteredUsers = productDetails.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUserDetails(filteredUsers);
  };

  const handleToggle = (userId, userStatus) => {
    console.log("1", userId, userStatus, typeof userStatus);
    updateUserStatus(userId, userStatus === "false");
  };

  const handleNameChange = (e) => {
    setAddName(e.target.value);
  };
  const handlePriceChange = (e) => {
    setAddPrice(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setAddCategory(e.target.value);
  };
  const handleDescChange = (e) => {
    setAddDesc(e.target.value);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    console.log(addName, addPrice, addCategory, addDesc);

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/product/add",
        {
          name: addName,
          categoryId: addCategory,
          price: addPrice,
          description: addDesc,
        },
        config
      );

      addProductModalToggle();
      await fetchProductDetails();
      resetForm();

      console.log("API DATA", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserStatus = async (userId, status) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/product/updateProductStatus",
        {
          id: userId,
          status: status,
        },
        config
      );
      await fetchProductDetails();
      console.log("API DATA", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = (deleteId) => {
    deleteProduct(deleteId);
  };

  const deleteProduct = async (deleteID) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:8081/product/delete/${deleteID}`,
        {},
        config
      );

      deleteProductModalToggle();
      await fetchProductDetails();

      console.log("API DATA", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductDetails = async () => {
    const apiUrl = "http://localhost:8081/product/get";

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.get(apiUrl, config);
      setProductDetails(response.data);
      console.log("Products Detail", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);
  return (
    <div>
      <Card
        style={{
          width: "95%",
          marginTop: "10px",
        }}
      >
        <CardBody
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CardTitle tag="h5">Manage Products</CardTitle>
          <Button
            onClick={addProductModalToggle}
            style={{ background: "#6d7fcc" }}
          >
            Add Product <BsPlusCircle />
          </Button>
        </CardBody>
      </Card>

      <Card
        style={{
          width: "95%",
          marginTop: "10px",
        }}
      >
        <input
          style={{
            border: "none",
            padding: "5px",
          }}
          type="text"
          placeholder="Filter"
          onChange={handleFilter}
        />
      </Card>

      <Card
        style={{
          width: "95%",
          marginTop: "10px",
        }}
      >
        <ListGroup flush>
          <ListGroupItem
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <div style={{ flex: "1" }}>
              <strong>Name</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Category</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Description</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Price</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Action</strong>
            </div>
          </ListGroupItem>
          {/* <ListGroupItem>{JSON.stringify(productDetails)}</ListGroupItem> */}
          <ListGroup flush>
            {addFilter
              ? filteredUserDetails.map((product) => (
                  <ListGroupItem
                    style={{ display: "flex", justifyContent: "space-between" }}
                    key={product.id}
                  >
                    <div style={{ flex: "1" }}>{product.name}</div>
                    <div style={{ flex: "1" }}>{product.categoryName}</div>
                    <div style={{ flex: "1" }}>{product.description}</div>
                    <div style={{ flex: "1" }}>{product.price}</div>
                    <div style={{ flex: "1" }}>
                      <Form></Form>
                      <Form>
                        <FormGroup switch disabled>
                          <Input
                            type="switch"
                            checked={product.status === "true"}
                            onChange={() => {
                              console.log(product.id, "-", product.status);
                              handleToggle(product.id, product.status);
                            }}
                          />
                        </FormGroup>
                      </Form>
                    </div>
                  </ListGroupItem>
                ))
              : productDetails.map((product) => (
                  <ListGroupItem
                    style={{ display: "flex", justifyContent: "space-between" }}
                    key={product.id}
                  >
                    <div style={{ flex: "1" }}>{product.name}</div>
                    <div style={{ flex: "1" }}>{product.categoryName}</div>
                    <div style={{ flex: "1" }}>{product.description}</div>
                    <div style={{ flex: "1" }}>{product.price}</div>
                    <div
                      style={{
                        flex: "1",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Form>
                          <FormGroup switch disabled>
                            <Input
                              type="switch"
                              checked={product.status === "true"}
                              onChange={() => {
                                handleToggle(product.id, product.status);
                              }}
                            />
                          </FormGroup>
                        </Form>
                      </div>
                      <div
                        style={{ marginBottom: "8px" }}
                        onClick={() => deleteProductModalToggle(product.id)}
                      >
                        <AiFillDelete />
                      </div>
                    </div>
                  </ListGroupItem>
                ))}
          </ListGroup>
        </ListGroup>
      </Card>

      <Modal isOpen={modal} {...args}>
        <ModalHeader onClick={addProductModalToggle}>Add Product</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                name="product"
                value={addName}
                placeholder="Name"
                type="input"
                onChange={handleNameChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="price"
                value={addPrice}
                placeholder="Price"
                type="number"
                onChange={handlePriceChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="category"
                value={addCategory}
                placeholder="Category"
                type="select"
                onChange={handleCategoryChange}
                required
              >
                <option checked>Category</option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    label={category.name}
                    value={category.id}
                  />
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                name="description"
                value={addDesc}
                placeholder="Description"
                type="text"
                onChange={handleDescChange}
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!addName}
            color="primary"
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
          <Button color="secondary" onClick={addProductModalToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal2} {...args}>
        <ModalHeader onClick={deleteProductModalToggle}>
          Confirmation
        </ModalHeader>
        <ModalBody>Are you sure to delete the product?</ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => handleDeleteProduct(deleteProductSelect)}
          >
            Yes
          </Button>
          <Button color="danger" onClick={deleteProductModalToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ManageProductComp;
