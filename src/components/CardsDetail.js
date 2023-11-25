import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ADD, DLT, REMOVE } from './redux/actions/action';

const CardsDetail = () => {

    // Redirect to home page
    const history = useNavigate();

    // Dispatch
    const dispatch = useDispatch();
    const dlt = (id) => {
        dispatch(DLT(id));
        history("/");
    }

    const [data, setData] = useState([]);

    // Get Cart Id from URL
    const { id } = useParams();

    // GEt cart data from redux store
    const getdata = useSelector((state) => state.cartreducer.carts);

    // Cart Item count INC
    const send = (element) => {
        dispatch(ADD(element));
    }

    // Cart Item count DEC
    const remove = (item) => {
        dispatch(REMOVE(item));
    }

    // Component mount and upate and Compare Url id === cart id
    useEffect(() => {
        let comparedata = getdata.filter((element) => {
            return element.id.toString() === id;
        });
        setData(comparedata);
        return () => {
        }
    }, [id, getdata]);

    return (
        <Container className='mt-2'>
            <div className="text-center">Items Details Page</div>
            <section className='container mt-3'>
                <div>
                    {
                        data.map((element) => (
                            <div className="iteamsdetails" key={element.id}>
                                <div className="items_img">
                                    <img src={element.imgdata} alt="Iteam Cart Images" />
                                </div>
                                <div className="details">
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p><strong>Restaurent</strong> : {element.rname}</p>
                                                    <p><strong>Price</strong> : ${element.price}</p>
                                                    <p><strong>Dishes</strong> : {element.address}</p>
                                                    <p><strong>Total</strong> : ${element.price * element.qnty}</p>
                                                    <div className="mt-5 d-flex justify-content-between align-item-center" style={{ display: 100, cursor: "pointer", background: "#ddd", color: '#111' }}>
                                                        <span style={{ fontSize: 24 }} onClick={element.qnty <= 1 ? () => dlt(element.id) : () => remove(element)}>-</span>
                                                        <span style={{ fontSize: 20 }}>{element.qnty}</span>
                                                        <span style={{ fontSize: 24 }} onClick={() => send(element)}>+</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p><strong>Rating</strong> : <span style={{ background: "green", color: "#ffffff", borderRadius: "5px", padding: "1px 10px" }}> {element.rating} ✯</span></p>
                                                    <p><strong>Order Review</strong> :<span> {element.somedata}</span></p>
                                                    <p><strong>Remove</strong> :<span> <i className='fas fa-trash' style={{ color: "red", fontSize: 18, cursor: "pointer" }} onClick={() => dlt(element.id)} ></i></span></p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </section>
        </Container>
    );
}

export default CardsDetail;
