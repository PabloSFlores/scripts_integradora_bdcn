import React, { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AxiosClient from "../../shared/plugins/axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {Row,Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import ToastNotification from './../../shared/components/ToastNotification';

const ProdcutScreen = () => {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState(null)
  const [text, settext] = useState(null)
  const getProductos = async () => {
    try {
      AxiosClient({ url: "/product" })
        .then((response) => setProductos(response))
        .catch((error) => console.log(error));
    } catch (error) {}
  };
  useEffect(() => {
    getProductos();
  }, []);

  function handleSubmit () {
    setShow(true);
    setTitle('Gracias Por su Compra!')
    settext('Gracias por comprar espero el producto sea de su agrado!! Vuelva pronto :)')
  }

  return (
    <div>
      <Row xs={2} md={4} className="g-4">
        <ToastNotification show={show} onClose={()=> setShow(false) } title={title} text={text} time={5000} />
        {productos.map((product) => (
          <Col>
            <Card>
              <Card.Img variant="top" src={product.product.image}  width={20} />
              <Card.Body>
                <Card.Title>{product.product.name}</Card.Title>
                <Card.Text>
                  <b>Detalles: </b>
                  {product.product.details} <br />
                  <b>Edad mínima:</b> {product.product.min_age} <br />
                  <b>Edad maxíma:</b> {product.product.max_age}
                  <br />
                  <b>Piezas:</b> {product.product.pieces}
                  <br />
                  <b>VIP Putnos:</b> {product.product.vip_points}.
                </Card.Text>
               <Button variant="warning" onClick={handleSubmit}  >
                  <FeatherIcon
                    icon="shopping-cart"
                    color="black"
                    size={16}
                    style={{ strokeWidth: 2.5 }}
                  />
                 {' '} Comprar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProdcutScreen;
