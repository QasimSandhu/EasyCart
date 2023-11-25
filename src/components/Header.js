import { Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Table } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import cartImage from './cart.gif';
import { useDispatch, useSelector } from 'react-redux';
import { DLT } from './redux/actions/action';


const Header = () => {

    // Get data from store
    const getdata = useSelector((state) => state.cartreducer.carts);

    // Set total item price in item card
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let totalPrice = 0;
        getdata.forEach((element) => {
            totalPrice = element.price * element.qnty + totalPrice;
        });
        setTotalPrice(totalPrice);
    }, [getdata]);

    // Dispatch
    const dispatch = useDispatch();
    const dlt = (id) => {
        dispatch(DLT(id));
    }

    // Open menu card Item
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Easy Cart</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                </Nav>
                <Badge badgeContent={getdata.length} color="primary" id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                    <i style={{ fontSize: '22px', cursor: "pointer" }} className="fa-solid fa-cart-shopping text-light"></i>
                </Badge>
            </Container>
            {/* Card Item menu */}
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}
            >
                {
                    getdata.length > 0 ? <div className="card_details" style={{ width: '24rem', padding: 10 }} >
                        <Table>
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Easy Cart</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getdata.map((element) => {
                                        return (
                                            <tr key={element.id}>
                                                <td><NavLink to={`/card-detail/${element.id}`}><img src={element.imgdata} alt={element.rname} style={{ width: "5rem", height: "5rem" }} onClick={handleClose} /></NavLink></td>
                                                <td>
                                                    <p>{element.rname}</p>
                                                    <p>Price : ${element.price}</p>
                                                    <p>Quantity : {element.qnty} </p>
                                                    <p style={{ color: "red", fontSize: 19, cursor: "pointer" }}>
                                                        <i className="fas fa-trash smalltrash" onClick={() => dlt(element.id)}></i>
                                                    </p>
                                                </td>
                                                <td className='mt-5' style={{ color: "red", fontSize: 19, cursor: "pointer" }}>
                                                    <p><i className="fas fa-trash largetrash" onClick={() => dlt(element.id)}></i></p>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                <p className='text-center'>Total : ${totalPrice}</p>
                            </tbody>
                        </Table>

                    </div> : <div className="class_details d-flex justify-content-center align-items-center" style={{ width: "25rem", padding: 10, position: 'relative' }} >
                        <i className="fas fa-close smallclose" onClick={handleClose} style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: 'pointer' }} ></i>
                        <p style={{ fontSize: 22 }} >Your Cart is empty</p>
                        <img src={cartImage} alt='Item Cart' className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                    </div>
                }
            </Menu>
        </Navbar>
    );
}

export default Header;
