import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Cart extends Component {
  state = {
    cartList: [],
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getCartItems()
  }

  getCartItems = () => {
    const cartListItems = localStorage.getItem('cart_list')
    if (cartListItems === null) {
      this.setState({cartList: [], apiStatus: apiStatusConstants.success})
    } else {
      this.setState({
        cartList: JSON.parse(cartListItems),
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  removeItem = uniqueId => {
    console.log(uniqueId)

    const {cartList} = this.state

    if (cartList.length !== 0) {
      const updatedData = cartList.filter(item => item.id !== uniqueId)
      localStorage.setItem('cart_list', JSON.stringify(updatedData))
      this.setState({
        cartList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onDecrement = uniqueId => {
    const {cartList} = this.state

    const filterData = cartList.filter(item => parseInt(item.quantity) > 1)

    const updatedList = filterData.map(item => {
      if (item.id === uniqueId) {
        return {...item, quantity: parseInt(item.quantity) - 1}
      }
      return item
    })
    localStorage.setItem('cart_list', JSON.stringify(updatedList))
    this.setState({cartList: updatedList})
  }

  onIncrement = uniqueId => {
    const {cartList} = this.state
    const updatedList = cartList.map(item => {
      if (item.id === uniqueId) {
        return {...item, quantity: parseInt(item.quantity) + 1}
      }
      return item
    })
    localStorage.setItem('cart_list', JSON.stringify(updatedList))
    this.setState({cartList: updatedList})
  }

  renderSuccessView = () => {
    const {cartList} = this.state
    return (
      <div>
        {cartList.length === 0 ? (
          <div className="cart-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
              alt="cart"
              className="cart-img"
            />
          </div>
        ) : (
          <ul>
            {cartList.map(item => (
              <CartItem
                key={item.id}
                details={item}
                removeItem={this.removeItem}
                onDecrement={this.onDecrement}
                onIncrement={this.onIncrement}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    let renderComponent

    switch (apiStatus) {
      case apiStatusConstants.success:
        renderComponent = this.renderSuccessView()
        break

      case apiStatusConstants.inProgress:
        renderComponent = this.renderLoadingView()
        break
      default:
        renderComponent = null
    }
    return (
      <>
        <Header />

        {renderComponent}
      </>
    )
  }
}

export default Cart
