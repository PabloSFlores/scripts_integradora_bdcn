import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PublicNavbar from './PublicNavbar';
import ProdcutScreen from '../../modules/products/ProdcutScreen';
import PostScreen from './../../modules/publicaciones/PostScreen';
import UserScreen from '../../modules/user/UserScreen';
import Welcome from '../../modules/Welcome';

const AppRouter = () => {
  return (
    <Router>
        <Routes>
           
            <Route path="/*" element={
                <>
                <PublicNavbar />
                <Container style={{ marginTop: '20px' }}>
                    <Routes>
                    <Route  path="welcome" element={<Welcome />}  />
                        <Route path="users" element={<UserScreen/>} />
                        <Route path="post" element={<PostScreen/>} />
                        <Route path="product" element={ <ProdcutScreen/>} />
                    </Routes>
                </Container>
                </>
            }  />
        </Routes>
    </Router>
  )
}

export default AppRouter