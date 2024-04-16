export const getStatusColor = (status) => {
  status = status?.toLowerCase();
  switch (status) {
    case "delivered":
      return "bg-green";
    case "shipped":
      return "bg-yellow";
    case "processing":
      return "bg-skyblue";
    case "cancelled":
      return "bg-lightred";
    default:
      return "bg-black";
  }
};
