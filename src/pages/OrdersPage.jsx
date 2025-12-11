import './OrdersPage.css';

export default function OrdersPage({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <div style={{textAlign: 'center', padding: '100px', color: '#666', fontSize: '20px'}}>
          No orders yet. <a href="/">Start shopping!</a>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="page-title">Your Orders</div>
      <div className="orders-grid">
        {orders.map(order => (
          <div key={order.id} className="order-container">
            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-date">
                  <div className="order-header-label">Order Placed:</div>
                  <div>{new Date(order.orderTime).toLocaleDateString()}</div>
                </div>
                <div className="order-total">
                  <div className="order-header-label">Total:</div>
                  <div>{order.totalPrice} tk</div>
                </div>
              </div>
              <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div>{order.id}</div>
              </div>
            </div>

            <div className="order-details-grid">
              {order.items.map((item, index) => (
                <div key={index} style={{display: 'contents'}}>
                  <div className="product-image-container">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="product-details">
                    <div className="product-name">{item.name}</div>
                    <div className="product-delivery-date">Arriving soon</div>
                    <div className="product-quantity">Quantity: {item.quantity}</div>
                  </div>
                  <div className="product-actions">
                    <button className="track-package-button button-secondary">
                      Track package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}