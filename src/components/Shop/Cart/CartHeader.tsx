const CartHeader = () => {
  return (
    <div className="grid sm:grid-cols-5 grid-cols-4 shadow-md py-5 my-10 text-center">
      <p>Product</p>
      <p>Price</p>
      <p className="sm:flex justify-center hidden">Quantity</p>
      <p>Subtotal</p>
      <p>actions</p>
    </div>
  );
};

export default CartHeader;
