import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardLink,
  CardText,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const ManageCatComp = (args) => {
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [filteredCategoryDetails, setFilteredCategoryDetails] = useState([]);
  const [modal, setModal] = useState(false);
  const [addCat, setAddCat] = useState("");
  const [addFilter, setAddFilter] = useState("");

  const toggle = () => setModal(!modal);

  let data = JSON.parse(localStorage.getItem("data"));
  let userToken = data.token;

  const handleFilter = (e) => {
    setAddFilter(e.target.value);
    // Filter categoryDetails based on input value
    const filteredCategories = categoryDetails.filter((category) =>
      category.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCategoryDetails(filteredCategories);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/category/add",
        {
          name: addCat,
        },
        config
      );

      toggle();

      console.log("API DATA", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setAddCat(e.target.value);
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    let userToken = data.token;

    const apiUrl = "http://localhost:8081/category/get";

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    axios
      .get(apiUrl, config)
      .then((response) => {
        setCategoryDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
          <CardTitle tag="h5">Manage Category</CardTitle>
          <Button onClick={toggle} style={{ background: "#6d7fcc" }}>
            Add Category
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
          {addFilter
            ? filteredCategoryDetails.map((category) => (
                <ListGroupItem key={category.id}>{category.name}</ListGroupItem>
              ))
            : categoryDetails.map((category) => (
                <ListGroupItem key={category.id}>{category.name}</ListGroupItem>
              ))}
        </ListGroup>
      </Card>

      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Add Category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                name="category"
                value={addCat}
                placeholder="Category Name"
                type="input"
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!addCat}
            color="primary"
            onClick={handleAddCategory}
          >
            Add Category
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ManageCatComp;
