interface OrderItemProps {
  order: any;
}

const OrderItem = (props: OrderItemProps) => {
  const { order } = props;
  return (
    <div key={order.id} className="bg-gray p-6 my-5 rounded-md">
      <div className="border-b border-borderColor pb-5 flex justify-between md:text-base text-sm">
        <p>#{order.code}</p>
        <p>{order.createdAt.slice(0, 10)}</p>
        <p>${order.price}</p>
        <p>
          {order.status === 1 ? (
            <button className="bg-lime-400 text-lime-900 px-3 py-1 text-sm rounded-md">
              Received
            </button>
          ) : (
            <button>Cancel</button>
          )}
        </p>
      </div>
      <div className="flex pt-5">
        {order.fileUrls?.map((url: any) => (
          <div key={url}>
            <img src={url} className="w-12 h-12 mx-2 object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItem;
