import { React, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';

// Declaracion HOOKS de Estados
const MiApi = () => {
  const [infoDisney, setInfoDisney] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [orden, setOrden] = useState(0);

 
  useEffect(() => {
    consultarInfo();
  });

  
  const consultarInfo = async () => {
    const url = `https://api.disneyapi.dev/characters`;
    const response = await fetch(url);
    const data = await response.json();
    setInfoDisney(data.data);
  };

  
  const onChangeSearch = (e) => setBuscador(e.target.value);
  const onChangeSelect = (e) => setOrden(e.target.value);

  return (
 <div>
  <Navbar bg="dark" variant="dark">
     <Container>
        <div className="align-center">
            <Navbar.Brand className="align-content-left">
                <h1>Disney</h1>
            </Navbar.Brand>
            </div>
            
            <div className="pb-3">
      <InputGroup onChange={onChangeSearch} className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Buscar Personaje
        </InputGroup.Text>
        <Form.Control
          aria-label="Personaje Disney"
          aria-describedby="inputGroup-sizing-default"
        />
        </InputGroup>
     
        <Form.Select onChange={onChangeSelect} size="sm">
          <InputGroup.Text id="inputGroup-sizing-default">
          Buscar Personaje
        </InputGroup.Text>
          <p>Ordenar</p>
         <option value="0">0 - Z</option>
         <option value="1">Z - 0</option>
        </Form.Select>
     </div>
          
        </Container>
</Navbar>

     <Container className ="d-flex justify-content-center h-100 pb-5">
     <Row>
        <Col>
            {infoDisney.filter((element) => {
                return element.name
                  .toLowerCase()
                  .includes(buscador.toLowerCase());
                  
              }).sort((a, b) => (orden == 0) ? (a.name > b.name) ? 1 : (b.name > a.name) ? -1
                    : 0 : (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0
              ).map((element) => (
                
            <div className="py-3">
            <Card  className="pb-2" bg="dark" border="success" text="warning" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={element.imageUrl} />
            <Card.Body className="text-light">
                  <h5><strong>Nombre</strong></h5>
              <Card.Title>{element.name}</Card.Title>
              <Card.Text>
                  <h5><strong>Peliculas</strong></h5>
                {element.films}
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
              ))}

            </Col>  
           </Row>  
      </Container>
</div>
  );
};
export default MiApi;