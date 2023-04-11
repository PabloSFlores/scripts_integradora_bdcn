import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Col, Row, Form, Modal, FormControl } from "react-bootstrap";
import * as yup from "yup";
import AxiosClient from "../../../shared/plugins/axios";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Alert, {
  confirmMsj,
  confirmTitle,
  errorMsj,
  errorTitle,
  successMsj,
  successTitle,
} from "../../../shared/plugins/alerts";


const UserForm = ({isOpen, setUsuarios, onclose }) => {
    const form = useFormik({
        initialValues: {
          name: "",
          status: true,
          category: "",
        },
        validationSchema: yup.object().shape({
          name: yup
            .string()
            .required("Campo obligatorio")
            .min(4, "Minimo 4 caracteres"),
        }),
        onSubmit: async (values) => {
          Alert.fire({
            title: confirmTitle,
            text: confirmMsj,
            icon: "warning",
            confirmButtonColor: "#009574",
            confirmButtonText: "Aceptar",
            cancelButtonColor: "#DD6B55",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            backdrop: true,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Alert.isLoading,
            preConfirm: async () => {
              try {
                const response = await AxiosClient({
                  method: "POST",
                  url: "/user/",
                  data: JSON.stringify(values),
                });
                if (!response.error) {
                    setUsuarios((usuarios) => [response.data, ...usuarios]);
                  Alert.fire({
                    title: successTitle,
                    text: successMsj,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Aceptar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleClose();
                    }
                  });
                }
                return response;
              } catch (error) {
                Alert.fire({
                  title: errorTitle,
                  text: errorMsj,
                  icon: "error",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Error",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleClose();
                  }
                });
              }
            },
          });
        },
      });
    
      const handleClose = () => {
        form.resetForm();
        onclose();
      };
 
    return (
        <Modal
        backdrop="static"
        keyboard={false}
        show={isOpen}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrar SUB Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={form.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <FormControl
                name="name"
                placeholder="Anna"
                value={form.values.name}
                onChange={form.handleChange}
              />
              {form.errors.name && (
                <span className="error-text"> {form.errors.name} </span>
              )}
            <Form.Label>Apellido Paterno</Form.Label>
              <FormControl
                name="surname"
                placeholder="Bustos"
                value={form.values.surname}
                onChange={form.handleChange}
              />
              {form.errors.surname && (
                <span className="error-text"> {form.errors.surname} </span>
              )}
              <Form.Label>Apellido Materno</Form.Label>
              <FormControl
                name="lastname"
                placeholder="Bustos"
                value={form.values.lastname}
                onChange={form.handleChange}
              />
              {form.errors.lastname && (
                <span className="error-text"> {form.errors.lastname} </span>
              )}
            <Form.Label>Edad</Form.Label>
              <FormControl
                name="age"
                placeholder="27"
                value={form.values.age}
                onChange={form.handleChange}
              />
              {form.errors.age && (
                <span className="error-text"> {form.errors.age} </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col className="text-end">
                  <Button
                    className="me-2"
                    variant="outline-danger"
                    onClick={handleClose}
                  >
                    <FeatherIcon icon="x" />
                    &nbsp;Cerrar
                  </Button>
                  <Button
                    type="submit"
                    className="me-2"
                    variant="outline-success"
                  >
                    <FeatherIcon icon="check" />
                    &nbsp;Guardar
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
  )
}

export default UserForm