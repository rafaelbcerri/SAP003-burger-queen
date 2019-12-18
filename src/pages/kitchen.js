import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important'
import { store } from 'react-notifications-component';
import { db } from '../util/firebaseConfig';
import Navbar from '../components/navbar/navbar';
import OrderCard from '../components/orderCard/orderCard';

const Kitchen = () => {
    const [orders, setOrders] = useState([])

    const notification = (obj) => {
        store.addNotification({
            title: obj.title,
            message: obj.message,
            type: obj.type,
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "fadeInDown"],
            animationOut: ["animated", "fadeOutUp"],
            dismiss: {
              duration: 1500,
            }
          });
    }

     // const counter =  setInterval(() => {
        const newTime = orders.map(element => {
                const now = new Date().getTime()
                element.passed = Math.floor((now - element.time) / 60000)
                return element
            })
        // setOrders(newTime);
    // },60000)

    useEffect(() => {
        db.collection('new-order').orderBy("time", "desc")
        .onSnapshot((querySnapshot) => {
            const orders = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                data.id = doc.id
                orders.push(data)
            })
            setOrders(orders)
        })
    }, [])

    const handleClick = (e) => {
        const id = e.target.id;
        const index = e.target.parentElement.dataset.index;

        notification({
            title: "Aguarde",
            message: "Pedido sendo enviado.",
            type: "info",
        })
        
        db.collection('to-deliver').add(orders[index])
        .then(
            db.collection('new-order').doc(id)
            .delete().catch(error =>  {
                notification({
                    title: "Falha em remover da cozinha.",
                    message: error,
                    type: "danger",
                })
            })
        ).then(
            notification({
                title: "Pedido enviado com sucesso!",
                message: "Obrigada!",
                type: "success",
            })
        )
    };

    return (
        <>
            <Navbar />
            <div className={css(styles.container)}>
            <h1 className={css(styles.heading)}>Cozinha</h1>
                {orders.map(element => {
                    return <OrderCard 
                        key={element.id}
                        id={element.id}
                        client={element.client}
                        table={element.table}
                        order={element.order}
                        onClick={handleClick}
                        index={orders.indexOf(element)}
                        time={element.passed}
                    />
                })}
            </div>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: '80px',
    },
    container: {
        marginTop: '60px',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    heading: {
        height: 'max-content',
        width: '94%',
        padding: '0.5em',
        color: 'rgb(166, 47, 3)',
        borderBottom: '2px solid rgb(225, 116, 9)',
    }
})

export default Kitchen;