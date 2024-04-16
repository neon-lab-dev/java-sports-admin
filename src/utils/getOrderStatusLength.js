export const getOrderStatusLength = (orders, status) => {
  if (!status || orders.length === 0) return 0;
  if (status?.toLowerCase() === "all") return orders.length;
  return orders.filter(
    (order) => order?.orderStatus?.toLowerCase() === status?.toLowerCase()
  ).length;
};
