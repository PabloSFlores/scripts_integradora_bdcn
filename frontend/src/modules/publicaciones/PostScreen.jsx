import React, { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AxiosClient from "../../shared/plugins/axios";
import lego from "../../assets/lego.jpeg";
import { Card, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import ProdcutScreen from "../products/ProdcutScreen";

const PostScreen = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const getPublicaciones = async () => {
    try {
      AxiosClient({ url: "/post" })
        .then((response) => setPublicaciones(response))
        .catch((error) => console.log(error));
    } catch (error) {}
  };

  useEffect(() => {
    getPublicaciones();
  }, []);

  function handleSubmit () {
    <ProdcutScreen/>
  }

  return (
    <div>
      <Row xs={2} md={4} className="g-4">
        {publicaciones.map((post) => (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  <Row>
                    <Col>
                      {post.description} <br />
                      <b>Nombre :</b> {post.product.name}
                      <br />
                      <b>Piezas: </b> {post.product.pieces}
                      <br />
                      <div className="d-grid gap-2">
                      <a href="/product" >
                      <Button variant="primary" >
                        Detalles {" "}
                        <FeatherIcon
                          icon="arrow-right-circle"
                          size={16}
                          style={{ strokeWidth: 2.5 }}
                        />
                      </Button>
                      </a>
                      </div>
                    </Col>
                    <Col>
                      <img src={post.product.image} width={200} />
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PostScreen;
