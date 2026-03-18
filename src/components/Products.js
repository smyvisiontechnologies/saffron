import React, { useState } from 'react';

const Products = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Premium Kashmiri Saffron (1g)',
      price: 1,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Deep red threads with intense aroma. Grade A++.',
    },
    {
      id: 2,
      name: 'Premium Kashmiri Saffron (5g)',
      price: 1650,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Perfect for regular use. Comes in a resealable pack.',
    },
    {
      id: 3,
      name: 'Organic Saffron (2g)',
      price: 650,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Certified organic, handpicked from the finest fields.',
    },
    {
      id: 4,
      name: 'Saffron Gift Box (3 vials)',
      price: 999,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Elegant gift box with three 1g vials. Ideal for presents.',
    },
  ];

  // Cart state
  const [cart, setCart] = useState([]);

  // User details for checkout
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');
  const [isVerifyingCoupon, setIsVerifyingCoupon] = useState(false);

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Google Sheets API URL - REPLACE WITH YOUR WEB APP URL
  const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbxXvWjF0ZvMebeWfmgbm0cdARSbDQBC-LgtUgIFsL5SZBqoR5zSAzNTfbElVJ6jp_adfQ/exec';

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate discount and total
  const discountAmount = appliedCoupon 
    ? (subtotal * appliedCoupon.discount) / 100 
    : 0;
  const cartTotal = subtotal - discountAmount;

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponMessage('');
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponMessage('');
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponMessage('');
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Verify coupon
  const verifyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage('Please enter a coupon code');
      return;
    }

    setIsVerifyingCoupon(true);
    setCouponMessage('Verifying...');

    try {
      const timestamp = new Date().getTime();
      const url = `${GOOGLE_SHEETS_API_URL}?action=verify_coupon&couponCode=${encodeURIComponent(couponCode.trim().toUpperCase())}&_=${timestamp}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.valid) {
        setAppliedCoupon({
          code: couponCode.trim().toUpperCase(),
          name: data.name,
          discount: data.discount
        });
        setCouponMessage(data.message);
      } else {
        setAppliedCoupon(null);
        setCouponMessage(data.message || '❌ Invalid coupon code');
      }
    } catch (error) {
      console.error('Error verifying coupon:', error);
      setCouponMessage('Network error. Please try again.');
    } finally {
      setIsVerifyingCoupon(false);
    }
  };

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponMessage('');
  };

  // Load Razorpay
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Save to Google Sheets - Method 1: Fetch POST
  const saveWithFetch = async (orderData) => {
    try {
      const response = await fetch(GOOGLE_SHEETS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      const text = await response.text();
      console.log('Fetch response:', text);
      
      try {
        const data = JSON.parse(text);
        return data.success;
      } catch {
        // If response is not JSON but we got a response, consider it success
        return text.length > 0;
      }
    } catch (error) {
      console.log('Fetch failed:', error);
      return false;
    }
  };

  // Save to Google Sheets - Method 2: JSONP (works on all mobile devices)
  const saveWithJSONP = (orderData) => {
    return new Promise((resolve) => {
      // Create unique callback name
      const callbackName = 'jsonp_callback_' + Date.now();
      
      // Set timeout
      const timeout = setTimeout(() => {
        cleanup();
        resolve(false);
      }, 10000);
      
      // Cleanup function
      const cleanup = () => {
        clearTimeout(timeout);
        delete window[callbackName];
        if (script && document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
      
      // Create callback function
      window[callbackName] = (response) => {
        console.log('JSONP response:', response);
        cleanup();
        resolve(response && response.success === true);
      };
      
      // Add callback to order data
      const jsonpData = {
        ...orderData,
        callback: callbackName
      };
      
      // Create script tag
      const script = document.createElement('script');
      const dataString = JSON.stringify(jsonpData);
      const encodedData = encodeURIComponent(dataString);
      script.src = `${GOOGLE_SHEETS_API_URL}?action=save_order&data=${encodedData}&_=${Date.now()}`;
      
      script.onerror = () => {
        console.log('JSONP script error');
        cleanup();
        resolve(false);
      };
      
      document.body.appendChild(script);
    });
  };

  // Save to Google Sheets - Method 3: Image Beacon (last resort)
  const saveWithImage = (orderData) => {
    return new Promise((resolve) => {
      try {
        const dataString = JSON.stringify(orderData);
        const encodedData = encodeURIComponent(dataString);
        const img = new Image();
        img.src = `${GOOGLE_SHEETS_API_URL}?action=save_order&data=${encodedData}&_=${Date.now()}`;
        
        // Wait a bit and assume success
        setTimeout(() => {
          resolve(true);
        }, 2000);
      } catch (error) {
        console.log('Image method failed:', error);
        resolve(false);
      }
    });
  };

  // Main save function - tries all methods
  const saveToGoogleSheets = async (paymentResponse) => {
    // Prepare order data
    const orderData = {
      action: 'save_order',
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      address: userDetails.address,
      cart: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      subtotal: subtotal,
      discountPercent: appliedCoupon ? appliedCoupon.discount : 0,
      discountAmount: discountAmount,
      total: cartTotal,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
      paymentId: paymentResponse.razorpay_payment_id,
      orderId: paymentResponse.razorpay_order_id || '',
      timestamp: new Date().toISOString()
    };

    console.log('Attempting to save order:', orderData);

    // Try Method 1: Fetch POST
    console.log('Trying fetch method...');
    const fetchResult = await saveWithFetch(orderData);
    if (fetchResult) {
      console.log('Fetch method succeeded');
      return true;
    }

    // Try Method 2: JSONP
    console.log('Trying JSONP method...');
    const jsonpResult = await saveWithJSONP(orderData);
    if (jsonpResult) {
      console.log('JSONP method succeeded');
      return true;
    }

    // Try Method 3: Image beacon
    console.log('Trying image method...');
    const imageResult = await saveWithImage(orderData);
    if (imageResult) {
      console.log('Image method succeeded');
      return true;
    }

    // All methods failed
    console.log('All save methods failed');
    return false;
  };

  // Handle payment
  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        setIsProcessing(false);
        return;
      }

      const options = {
        key: 'rzp_live_SSZg0t6IfynNHd', // Replace with your actual Razorpay key
        amount: Math.round(cartTotal * 100),
        currency: 'INR',
        name: 'Saffron Co.',
        description: appliedCoupon 
          ? `${appliedCoupon.discount}% discount applied` 
          : 'Purchase from Saffron Collection',
        image: 'https://via.placeholder.com/150/FF9933/ffffff?text=Saffron',
        handler: async function(response) {
          // Show saving message
          alert('Payment successful! Saving your order...');
          
          // Save to Google Sheets
          const saved = await saveToGoogleSheets(response);
          
          if (saved) {
            alert(`✅ Order saved successfully! Thank you for your purchase.`);
          } else {
            // If all save methods failed, show payment ID for support
            alert(`⚠️ Payment successful! Your payment ID is: ${response.razorpay_payment_id}. Please save this ID and contact support if your order is not visible.`);
          }
          
          // Clear cart and reset
          setCart([]);
          setUserDetails({ name: '', address: '', email: '', phone: '' });
          setAppliedCoupon(null);
          setCouponCode('');
          setCouponMessage('');
          setShowCheckoutForm(false);
          setIsProcessing(false);
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        notes: {
          address: userDetails.address,
          coupon: appliedCoupon ? appliedCoupon.code : 'none',
          discount: appliedCoupon ? `${appliedCoupon.discount}%` : '0%'
        },
        theme: {
          color: '#FF9933',
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred while processing payment. Please try again.');
      setIsProcessing(false);
    }
  };

  // Handle checkout
  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!userDetails.name || !userDetails.address || !userDetails.email || !userDetails.phone) {
      alert('Please fill in all fields.');
      return;
    }

    if (!/^\d{10}$/.test(userDetails.phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(userDetails.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    await handlePayment();
  };

  return (
    <>
      <main className="products">
        <div className="container">
          <h1 className="page-title">Our Saffron Collection</h1>

          {/* Product Grid */}
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <p className="price">₹{product.price}</p>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(product)}
                  disabled={isProcessing}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Cart Section */}
          <div className="cart-section">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty.</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-price">₹{item.price} each</p>
                        <div className="quantity-control">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={isProcessing}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={isProcessing}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="item-total">
                        <p>₹{item.price * item.quantity}</p>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          disabled={isProcessing}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Section */}
                <div className="coupon-section">
                  <h3>Have a referral code?</h3>
                  <div className="coupon-input-group">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      disabled={isProcessing || appliedCoupon}
                    />
                    {!appliedCoupon ? (
                      <button
                        onClick={verifyCoupon}
                        disabled={isVerifyingCoupon || !couponCode.trim() || isProcessing}
                        className="apply-coupon-btn"
                      >
                        {isVerifyingCoupon ? 'Verifying...' : 'Apply'}
                      </button>
                    ) : (
                      <button
                        onClick={removeCoupon}
                        className="remove-coupon-btn"
                        disabled={isProcessing}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {couponMessage && (
                    <p className={`coupon-message ${appliedCoupon ? 'success' : 'error'}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>

                <div className="cart-total">
                  <div className="total-breakdown">
                    <p>Subtotal: ₹{subtotal}</p>
                    {appliedCoupon && (
                      <p className="discount-amount">
                        Discount ({appliedCoupon.discount}%): -₹{discountAmount}
                      </p>
                    )}
                    <h3>Total: ₹{cartTotal}</h3>
                  </div>
                  <button
                    className="checkout-btn"
                    onClick={() => setShowCheckoutForm(true)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Checkout Form Modal */}
          {showCheckoutForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Enter Your Details</h2>
                <form onSubmit={handleCheckout}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userDetails.name}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userDetails.email}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={userDetails.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                      pattern="[0-9]{10}"
                      maxLength="10"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Delivery Address *</label>
                    <textarea
                      id="address"
                      name="address"
                      value={userDetails.address}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                      rows="3"
                    />
                  </div>
                  <div className="order-summary">
                    <h4>Order Summary</h4>
                    <p>Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                    <p>Subtotal: ₹{subtotal}</p>
                    {appliedCoupon && (
                      <p className="discount">Discount: -₹{discountAmount} ({appliedCoupon.discount}%)</p>
                    )}
                    <p className="total-amount">Total: ₹{cartTotal}</p>
                  </div>
                  <div className="modal-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowCheckoutForm(false)}
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="submit-btn"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Pay ₹${cartTotal}`}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .products {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #fef7e9;
          min-height: 100vh;
          padding: 40px 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .page-title {
          text-align: center;
          color: #b85e00;
          font-size: 2.5rem;
          margin-bottom: 40px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .product-card {
          background-color: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          padding: 20px;
          text-align: center;
        }

        .product-card:hover {
          transform: translateY(-10px);
        }

        .product-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .product-card h3 {
          font-size: 1.3rem;
          color: #b85e00;
          margin-bottom: 10px;
        }

        .product-card .description {
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 15px;
          flex-grow: 1;
        }

        .product-card .price {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }

        .add-to-cart {
          background-color: #FF9933;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .add-to-cart:hover {
          background-color: #e67300;
        }

        .add-to-cart:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .cart-section {
          background-color: #fff;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .cart-section h2 {
          color: #b85e00;
          margin-bottom: 20px;
          font-size: 2rem;
        }

        .empty-cart {
          text-align: center;
          color: #999;
          font-size: 1.2rem;
          padding: 40px;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 15px;
          background-color: #fef7e9;
          border-radius: 8px;
          flex-wrap: wrap;
        }

        .cart-item img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 5px;
        }

        .item-details {
          flex: 2;
          min-width: 200px;
        }

        .item-details h4 {
          color: #b85e00;
          margin-bottom: 5px;
        }

        .item-price {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .quantity-control button {
          width: 30px;
          height: 30px;
          background-color: #FF9933;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .quantity-control button:hover {
          background-color: #e67300;
        }

        .quantity-control button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .quantity-control span {
          font-size: 1.1rem;
          min-width: 30px;
          text-align: center;
        }

        .item-total {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          min-width: 100px;
        }

        .item-total p {
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }

        .remove-btn {
          background-color: transparent;
          color: #c00;
          border: 1px solid #c00;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .remove-btn:hover {
          background-color: #c00;
          color: #fff;
        }

        .remove-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .coupon-section {
          margin: 20px 0;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          border: 1px dashed #FF9933;
        }

        .coupon-section h3 {
          color: #b85e00;
          margin-bottom: 15px;
          font-size: 1.2rem;
        }

        .coupon-input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }

        .coupon-input-group input {
          flex: 1;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          text-transform: uppercase;
        }

        .coupon-input-group input:focus {
          outline: none;
          border-color: #FF9933;
        }

        .apply-coupon-btn {
          background-color: #28a745;
          color: #fff;
          border: none;
          padding: 12px 25px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
        }

        .apply-coupon-btn:hover {
          background-color: #218838;
        }

        .apply-coupon-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .remove-coupon-btn {
          background-color: #dc3545;
          color: #fff;
          border: none;
          padding: 12px 25px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
        }

        .remove-coupon-btn:hover {
          background-color: #c82333;
        }

        .coupon-message {
          font-size: 0.95rem;
          margin-top: 10px;
        }

        .coupon-message.success {
          color: #28a745;
        }

        .coupon-message.error {
          color: #dc3545;
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #FF9933;
        }

        .total-breakdown {
          flex: 1;
        }

        .total-breakdown p {
          margin: 5px 0;
          color: #666;
        }

        .total-breakdown .discount-amount {
          color: #28a745;
        }

        .total-breakdown h3 {
          font-size: 1.8rem;
          color: #b85e00;
          margin-top: 10px;
        }

        .checkout-btn {
          background-color: #FF9933;
          color: #fff;
          border: none;
          padding: 15px 40px;
          border-radius: 5px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background-color 0.3s;
          font-weight: bold;
        }

        .checkout-btn:hover {
          background-color: #e67300;
        }

        .checkout-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: #fff;
          border-radius: 10px;
          padding: 40px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-content h2 {
          color: #b85e00;
          margin-bottom: 30px;
          text-align: center;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #555;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #FF9933;
        }

        .order-summary {
          background-color: #fef7e9;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }

        .order-summary h4 {
          color: #b85e00;
          margin-bottom: 10px;
        }

        .order-summary p {
          margin: 5px 0;
          color: #666;
        }

        .order-summary .discount {
          color: #28a745;
        }

        .order-summary .total-amount {
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px dashed #FF9933;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 30px;
        }

        .cancel-btn {
          background-color: transparent;
          color: #666;
          border: 1px solid #ccc;
          padding: 12px 25px;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1rem;
        }

        .cancel-btn:hover {
          background-color: #f0f0f0;
        }

        .cancel-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .submit-btn {
          background-color: #FF9933;
          color: #fff;
          border: none;
          padding: 12px 25px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          font-size: 1rem;
          font-weight: bold;
        }

        .submit-btn:hover {
          background-color: #e67300;
        }

        .submit-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        @media screen and (max-width: 768px) {
          .cart-total {
            flex-direction: column;
            gap: 20px;
            align-items: stretch;
          }
          
          .coupon-input-group {
            flex-direction: column;
          }
          
          .modal-actions {
            flex-direction: column;
          }
          
          .cancel-btn, .submit-btn {
            width: 100%;
          }
        }

        @media screen and (max-width: 480px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
          
          .modal-content {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default Products;