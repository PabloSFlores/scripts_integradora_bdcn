import React from 'react'
import Toast from "react-bootstrap/Toast"
import ToastContainer from 'react-bootstrap/ToastContainer'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'

const ToastNotification = ({text,title,show,time,onClose}) => {
  return (
    <ToastContainer className="p-3" position="top-end">
    <Toast
      onClose={onClose}
      show={show}
      delay={time}
      autohide
      bg='Light'
    >
      <Toast.Header style={{ color: "black" }}>
      <FeatherIcon
                icon='shopping-bag'
                size={20}
                style={{ strokeWidth: 2.5 }}
              />
        <strong className="me-auto" >{title}</strong>
        <small>LEGO</small>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  </ToastContainer>
  )
}

export default ToastNotification