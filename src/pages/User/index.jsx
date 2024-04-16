import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import downloadIcon from "../../assets/icons/download.svg";
import AppLoading from "../../components/loaders/AppLoading.jsx";
import SomeErrorOccurred from "../Error/SomeErrorOccurred.jsx";
import jsonToXlsx from "../../utils/jsonAsXlsx.js";
import TableEntriesPrevNextButtons from "../../components/TableEntriesPrevNextButtons.jsx";
import { searchObjects } from "../../utils/search.js";
import { MAX_ROWS_PER_PAGE } from "../../assets/data/constants.js";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../api/user.js";
import NoDataFound from "../../components/NoDataFound.jsx";

const User = () => {
  const [startingIndex, setStartingIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBirthdayTodayActive, setIsBirthdayTodayActive] = useState(false);

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserDetails(),
  });

  useEffect(() => {
    if (userData) {
      const filteredData = searchObjects(userData, searchQuery, [
        "_id",
        "full_name",
        "phoneNo",
        "email",
      ]);
      if (isBirthdayTodayActive) {
        const today = new Date();
        const filteredDataByBirthday = filteredData.filter((user) => {
          const dob = new Date(user.dob);
          return (
            dob.getDate() === today.getDate() &&
            dob.getMonth() === today.getMonth()
          );
        });
        setFilteredData(filteredDataByBirthday);
      } else {
        setFilteredData(filteredData);
      }
    }
  }, [userData, searchQuery, isBirthdayTodayActive]);
  return (
    <div className="bg-[#F5F6FA] min-h-full w-full p-6 pb-11">
      <h1 className="font-lato text-[32px] font-bold text-black leading-[38.4px] ">
        All Users
      </h1>

      <div className="bg-white overflow-x-auto mt-3 rounded-[16px] p-4 px-5">
        <div className=" justify-between flex items-center ">
          {/* SearchBar */}
          <SearchBar
            placeholder="Search by ID, Name, Email, Mobile No"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setStartingIndex(0);
            }}
          />
          <div className="flex items-center justify-between gap-6">
            {/* downloadIcon */}
            <button
              onClick={() => setIsBirthdayTodayActive((prev) => !prev)}
              className="btn btn-outline btn-secondary btn-sm"
            >
              {isBirthdayTodayActive ? "Show All Users" : "Birthday Today"}
            </button>
            <button
              disabled={isLoading || isError}
              onClick={() => jsonToXlsx(userData, "users")}
              className=" bg-lightgray rounded-[6px] mr-5 disabled:opacity-50"
            >
              <img className="min-w-8 min-h-8" src={downloadIcon} alt="" />
            </button>
          </div>
        </div>
        {/* User table */}
        <div className="mt-4">
          <div className="overflow-x-auto">
            {isLoading ? (
              <AppLoading />
            ) : !isError && userData ? (
              <table className="table rounded-2xl w-full">
                {/* head */}

                <thead className="grid-col-5 ">
                  <tr className="h-[48px] bg-slate-100 w-full items-center">
                    <th className="font-bold font-lato text-black text-[14px] text-start px-3 ">
                      ID
                    </th>
                    <th className="font-bold font-lato text-black text-[14px] text-center px-3 ">
                      Name
                    </th>
                    <th className="font-bold font-lato text-black text-[14px]  text-center px-3">
                      Email
                    </th>
                    <th className="font-bold font-lato text-black text-[14px]  text-center px-3">
                      Mobile No
                    </th>
                    <th className="font-bold font-lato text-black text-[14px]  text-center px-3">
                      DOB
                    </th>
                  </tr>
                </thead>

                {filteredData.length > 0 ? (
                  <tbody className="grid-col-5">
                    {filteredData
                      ?.slice(startingIndex, startingIndex + MAX_ROWS_PER_PAGE)
                      .map((user) => {
                        return (
                          <tr
                            className="  h-[48px]  w-full items-center"
                            key={user._id}
                          >
                            <td className="opacity-80 font-lato font-semibold text-[14px] w-1/5 min-w-[150px] text-black  text-start px-3">
                              #{user._id}
                            </td>
                            <td className="opacity-80 font-lato font-semibold text-[14px] text-center w-1/5 min-w-[150px] text-black     px-3">
                              {user.full_name}
                            </td>
                            <td className="opacity-80  font-lato font-semibold w-1/5 min-w-[150px] text-satrt text-[14px] px-3">
                              {user.email}
                            </td>
                            <td className="opacity-80 font-lato font-semibold w-1/5 min-w-[100px] text-center text-[14px] px-3">
                              {user.phoneNo}
                            </td>
                            <td className="opacity-80 font-lato font-semibold w-1/5 min-w-[100px] text-center text-[14px] px-3">
                              {user.dob}
                            </td>
                          </tr>
                        );
                      })}
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
          {filteredData?.length > 0 && (
            <TableEntriesPrevNextButtons
              filteredDataLength={filteredData?.length}
              displayDataLength={
                filteredData?.slice(
                  startingIndex,
                  startingIndex + MAX_ROWS_PER_PAGE
                ).length
              }
              setStartingIndex={setStartingIndex}
              startingIndex={startingIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
