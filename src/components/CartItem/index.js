import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import './index.css'

const CartItem = props => {
  const {details, removeItem, onDecrement, onIncrement} = props
  const {imageUrl, title, price, quantity, id} = details
  const onRemoveItem = () => {
    removeItem(id)
  }
  const onDecr = () => {
    onDecrement(id)
  }
  const onIncr = () => {
    onIncrement(id)
  }

  return (
    <li className="item-details">
      <img src={imageUrl} alt="" className="product-img" />
      <p>{title}</p>
      <p>{price}</p>
      <p>Quantity {quantity}</p>
      <div className="quantity-container">
        <button
          type="button"
          className="quantity-controller-button"
          onClick={onDecr}
          testid="minus"
        >
          <BsDashSquare className="quantity-controller-icon" />
        </button>
        <button
          type="button"
          className="quantity-controller-button"
          onClick={onIncr}
          testid="plus"
        >
          <BsPlusSquare className="quantity-controller-icon" />
        </button>
      </div>
      <button
        type="button"
        className="button add-to-cart-btn"
        onClick={onRemoveItem}
      >
        Remove
      </button>
    </li>
  )
}

export default CartItem
