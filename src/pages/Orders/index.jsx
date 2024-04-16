import filterIcon from "../../assets/icons/filter.svg";
import downCaret from "../../assets/icons/downCaret.svg";
import downloadIcon from "../../assets/icons/download.svg";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../api/order";
import OrderModal from "./OrderModal";
import { ORDER_STATUS } from "../../assets/data/orderStatus";
import AppLoading from "../../components/loaders/AppLoading";
import SomeErrorOccurred from "../Error/SomeErrorOccurred";
import { getStatusColor } from "../../utils/getStatusColor";
import { searchObjects } from "../../utils/search";
import TableEntriesPrevNextButtons from "../../components/TableEntriesPrevNextButtons";
import { MAX_ROWS_PER_PAGE } from "../../assets/data/constants";
import NoDataFound from "../../components/NoDataFound";
import { getOrderStatusLength } from "../../utils/getOrderStatusLength";
import jsonToXlsx from "../../utils/jsonAsXlsx";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startingIndex, setStartingIndex] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [filterByStatus, setFilterByStatus] = useState(ORDER_STATUS[0]);
  const [filteredData, setFilteredData] = useState([]);
  const { data, isError, isLoading } = useQuery({
    queryFn: () => getAllOrders(),
    queryKey: ["orders"],
  });

  useEffect(() => {
    if (data) {
      const filteredData = searchObjects(data, searchQuery, [
        "_id",
        "itemsPrice",
      ]);
      if (filterByStatus.toLowerCase() !== "all") {
        const filterByStatusData = searchObjects(filteredData, filterByStatus, [
          "orderStatus",
        ]);
        setFilteredData(filterByStatusData);
      } else {
        setFilteredData(filteredData);
      }
    }
  }, [data, searchQuery, filterByStatus]);

  return (
    <div className="bg-lightgray h-full w-full p-6 pb-11">
      <h1 className="font-lato text-[32px] font-bold   text-black leading-[38.4px] ">
        Total Orders
      </h1>
      <div className="bg-white overflow-x-auto mt-3 rounded-[16px] p-4 pb-12 px-5">
        <div className=" justify-between flex items-center ">
          {/* SearchBar */}
          <SearchBar
            placeholder={"Search by order id or Total  price"}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setStartingIndex(0);
            }}
          />

          <div className="flex items-center gap-3">
            <div className="w-[199px]  rounded-[10px]">
              <div className=" bg-darksmoke flex items-center gap-2 rounded-[10px] border-[0.6px] border-borderColor">
                <div className="h-full px-3 py-[10px]   border-r border-r-borderColor">
                  <img className=" " src={filterIcon} alt="" />
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  className="flex dropdown dropdown-bottom justify-between pr-3 w-full items-center"
                >
                  <div className="font-bold text-[14px] w-full font-lato text-black">
                    <div className="flex items-center w-full ">
                      <div className=" m-1 capitalize">
                        {filterByStatus}{" "}
                        {!isLoading && !isError && data ? (
                          <>({getOrderStatusLength(data, filterByStatus)})</>
                        ) : (
                          ""
                        )}
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content  z-[1] menu p-2 shadow bg-base-100 rounded-md w-full"
                      >
                        {ORDER_STATUS.map((item, i) => (
                          <li
                            key={i}
                            onClick={() => setFilterByStatus(item)}
                            className={`p-2 rounded-md capitalize hover:text-white hover:bg-red ${
                              item === filterByStatus &&
                              "bg-red text-white my-1"
                            }`}
                          >
                            {item}{" "}
                            {!isLoading && !isError && data ? (
                              <>({getOrderStatusLength(data, item)})</>
                            ) : (
                              ""
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <img src={downCaret} alt="" />
                </div>
              </div>
            </div>

            {/* downloadIcon */}
            <button
              disabled={isLoading || isError}
              onClick={() => jsonToXlsx(data, "orders")}
              className=" bg-lightgray rounded-[6px] disabled:opacity-50"
            >
              <img src={downloadIcon} alt="" />
            </button>
          </div>
        </div>

        {/* order table */}

        <div className="mt-4">
          <div className="overflow-x-auto">
            {isLoading ? (
              <AppLoading />
            ) : !isError && filteredData ? (
              <table className="table rounded-2xl table-lg">
                {/* head */}
                <thead className=" rounded-[12px] bg-gray1">
                  <tr className="">
                    <th className="font-bold font-lato text-black text-[14px]">
                      ID
                    </th>
                    <th className="font-bold font-lato text-black text-[14px]">
                      Total Price
                    </th>
                    <th className="font-bold text-center font-lato text-black text-[14px]">
                      Order Status
                    </th>
                    <th className=" font-bold text-center font-lato text-black text-[14px]">
                      Action
                    </th>
                  </tr>
                </thead>

                {filteredData.length > 0 ? (
                  <tbody>
                    {filteredData
                      ?.slice(startingIndex, startingIndex + MAX_ROWS_PER_PAGE)
                      ?.map((item) => (
                        <tr key={item._id} className="">
                          <td className="font-lato font-semibold text-[14px] text-black">
                            {item._id}
                          </td>
                          <td className="font-lato font-semibold text-[14px] text-black">
                            ₹{item.itemsPrice}
                          </td>
                          <td className="flex justify-center items-center font-lato font-semibold text-[14px]">
                            <div
                              className={` w-[93px] text-center py-1 rounded-md capitalize ${getStatusColor(
                                item.orderStatus
                              )} text-white`}
                            >
                              {item.orderStatus}
                            </div>
                          </td>

                          <td className=" text-center font-lato font-semibold text-[14px]">
                            <button
                              onClick={() => {
                                setSelectedOrderId(item._id);
                                window.orderDetailModal.showModal();
                                const dd = document.getElementById("orderInfo");
                                dd.scrollTop = 0;
                              }}
                              className="btn text-nowrap btn-sm btn-outline btn-primary rounded-md text-white"
                            >
                              View Orders
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                ) : (
                  <NoDataFound />
                )}
              </table>
            ) : (
              <SomeErrorOccurred />
            )}
          </div>
          <hr />
          {filteredData.length > 0 && (
            <TableEntriesPrevNextButtons
              filteredDataLength={filteredData.length}
              setStartingIndex={setStartingIndex}
              startingIndex={startingIndex}
            />
          )}
        </div>
      </div>
      <OrderModal selectedOrderId={selectedOrderId} />
    </div>
  );
};

export default Orders;
