import React, { useEffect, useState } from "react";
import currency from "../../mock/currency";
import { useDispatch, useSelector } from "react-redux";
import {
  countsLoad,
  loadCountsData,
  selectCounts,
  selectCountsData,
  selectCountsDataStatus,
  selectCountsStatus,
} from "../../store/countsSlice";
import { selectUser, updateUser } from "../../store/usersSlice";
import LoadingSpinners from "./LoadingSpinners";
import Badge from "./Badge";
import localStorageService from "../../services/localStorage.service";

const MasterCount = () => {
  const dispatch = useDispatch();
  const [masterCount, setMasterCount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectUser());
  const countsDataLoaded = useSelector(selectCountsDataStatus());
  const countsData = useSelector(selectCountsData());
  const countsLoaded = useSelector(selectCountsStatus());
  const counts = useSelector(selectCounts());

  useEffect(() => {
    if (!countsDataLoaded) dispatch(loadCountsData());
    if (!countsLoaded) dispatch(countsLoad());
  }, []);

  useEffect(() => {
    if (user.masterCount && counts && !masterCount) {
      setMasterCount(counts[user.masterCount]);
    }
  }, [counts]);

  const handleClick = (e) => {
    const { target } = e;
    console.log("target:", target);
    if ((target.dataset.bsToggle = "dropdown")) setIsOpen((state) => !state);
    const countId = target.closest("button").dataset.item;
    if (countId) {
      console.log("countId:", countId);
      dispatch(updateUser({ ...user, masterCount: countId }));
      setMasterCount(counts[countId]);
      localStorageService.setMasterCount(countId);
    }
  };

  return (
    <div className="text-center">
      {masterCount && countsData && (
        <Badge
          classes="mb-1 w-content"
          text={masterCount.name}
          {...countsData[masterCount.type]}
        />
      )}

      <div className="dropdown w-content info br-5 text-center mx-auto shadow-custom mb-5">
        <div className="d-flex">
          <img
            className="w-content mx-auto"
            src="https://img.icons8.com/arcade/64/money-bag.png"
            alt="money-bag"
          />
          <button
            className="btn btn-outline-secondary dropdown-toggle "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={handleClick}
          ></button>
        </div>
        {masterCount ? (
          <Badge
            balance={masterCount.balance}
            imgSrc={currency[masterCount.currency].icon}
            iconSize={"32px"}
            color={"success"}
            classes={"fw-bold ls-1 fs-4 align-items-center d-flex p-1 m-2"}
          />
        ) : (
          <p className="balance ff-roboto fw-bold h4 mt-2">-</p>
        )}

        {countsDataLoaded && countsLoaded ? (
          <ul className={"p-0 w-500px dropdown-menu" + (isOpen ? " show" : "")}>
            <li className="text-center w-100 bg-secondary fw-bold">
              <span className="dropdown-item-text">Выберите главный счёт</span>
            </li>
            <hr className="m-0" />
            <div className="d-flex align-content-start justify-content-center flex-wrap">
              {Object.values(counts).map((count) => (
                <li key={count._id}>
                  <button
                    className={"p-1 m-0 dropdown-item"}
                    type="button"
                    onClick={handleClick}
                    data-item={count._id}
                  >
                    <Badge
                      text={count.name}
                      {...countsData[count.type]}
                      imgSrc={count.icon}
                      iconSize={"32px"}
                    />
                  </button>
                </li>
              ))}
            </div>
          </ul>
        ) : (
          <LoadingSpinners number={3} classesSpinner="spinner-grow-sm" />
        )}
      </div>
    </div>
  );
};

export default MasterCount;
