import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import PropTypes from 'prop-types';

const OrderItem = (props) => {
  return (
    <div className={css(styles.item)}>
      <p>
        <span className={css(styles.quantity)}>{props.quantity}</span>
        <span className={css(styles.white, styles.title)}>{props.title}</span>
      </p>
      {props.done || !props.kitchen ? (
        <span className={css(styles.white, styles.price)}>
          R$ {props.price * props.quantity}
        </span>
      ) : null}
    </div>
  );
};

OrderItem.propTypes = {
  quantity: PropTypes.number,
  kitchen: PropTypes.bool,
  done: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const styles = StyleSheet.create({
  quantity: {
    background: '#f7f5f5',
    padding: '1px 4px',
    borderRadius: '3px',
    fontWeight: 'bold',
    marginRight: '5px'
  },
  white: {
    color: 'white'
  },
  item: {
    // marginBottom: '0.5em',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5em',
    borderBottom: '1px solid #ffffff26'
  },
  title: {
    lineHeight: '1.5em'
  },
  price: {
    width: '75px',
    textAlign: 'end'
  }
});

export default OrderItem;
