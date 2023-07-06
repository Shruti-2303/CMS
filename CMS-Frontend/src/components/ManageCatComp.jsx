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
} from "reactstrap";

const ManageCatComp = () => {
  const [categoryDetails, setCategoryDetails] = useState();

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
          <Button style={{ background: "#6d7fcc" }}>Add Category</Button>
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
        />
      </Card>
      <Card
        style={{
          width: "95%",
          marginTop: "10px",
        }}
      >
        <ListGroup flush>
          {categoryDetails &&
            categoryDetails.map((category) => (
              <ListGroupItem key={category.id}>{category.name}</ListGroupItem>
            ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default ManageCatComp;
