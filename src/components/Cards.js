import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Cardsdata from './CardsData';
import "./style.css"
import { useDispatch } from 'react-redux';
import { ADD } from './redux/actions/action';

const Cards = () => {

    // Set Cart Data
    const [cartData] = useState(Cardsdata);

    // Set cart Item Count data
    const dispatch = useDispatch();
    const handleSend = (element) => {
        dispatch(ADD(element));
    }

    return (
        <div className='container mt-3'>
            <h1 className='text-center'>Add to Cart Projects</h1>
            <div className="row d-flex justify-content-center align-item-center ">
                {
                    cartData.length > 0 ?
                        cartData.map((element, id) => (
                            <Card className='mx-2 mt-4 card_style' style={{ width: '22rem', border: 'none' }} key={id} >
                                <Card.Img className='mt-3' alt={element.rname} variant="top" src={element.imgdata} style={{ height: "16rem" }} />

                                <Card.Body>
                                    <Card.Title>{element.rname}</Card.Title>
                                    <Card.Text>Price: ${element.price}</Card.Text>
                                    <div className="button_div d-flex justify-content-center">
                                        <Button className='col-lg-12' variant="primary" onClick={() => handleSend(element)} >Add to Cart</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                        : <h1 className='text-center'>Cart Data Not Found</h1>
                }
            </div>
        </div>
    );
}

export default Cards;