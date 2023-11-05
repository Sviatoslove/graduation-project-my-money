import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../components/common/form/TextField";
import SelectedField from "../../components/common/form/SelectedField";
import {
  countCreate,
  countUpdate,
  loadCountsData,
  selectCountsData,
  selectCountsDataStatus,
} from "../../store/countsSlice";
import AvatarsField from "../../components/common/form/AvatarsField";
import currency from "../../mock/currency";
import countsIconsMock from "../../mock/countsIcons";
import Button from "../../components/common/buttons/Button";
import { useForms } from "../../hooks/useForm";
import { formatDataCountsIcons } from "../../utils/formatData";

const CountsForm = () => {
  const dispatch = useDispatch();
  const {show, currentEssence, disAppearanceForm} = useForms()
  const countsDataLoaded = useSelector(selectCountsDataStatus());
  const countsData = useSelector(selectCountsData());
  const initialState = currentEssence
    ? currentEssence
    : {
        name: "",
        content: "",
        type: "652e4f70498ed451c3f23b9b",
        currency: "67rdca3eeb7f6fgeed471198",
        icon: "",
      };

  const [data, setData] = useState(initialState);
  const [errors] = useState({});

  useEffect(() => {
    if (!countsDataLoaded) dispatch(loadCountsData());
  }, []);

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }));
    // setErrors(null)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEssence) {
      dispatch(countUpdate(data));
    } else {
      dispatch(countCreate(data));
    }
    disAppearanceForm();
  };
  
  const countsIcons = formatDataCountsIcons(countsIconsMock)

  return (
    <>
      {countsDataLoaded ? (
        <div
          className={
            "rounded-3 w-700px shadow-lg p-5 wrapper-form " + show
          }
        >
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">
              {currentEssence !== "" ? "Редактирование счёта" : "Создание счёта"}
            </h3>
            <TextField
              label="Название счёта"
              value={data.name}
              name="name"
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Комментарий"
              value={data.content}
              name="content"
              onChange={handleChange}
              error={errors.content}
            />
            <SelectedField
              label="Выбери тип счёта"
              options={countsData}
              name="type"
              onChange={handleChange}
              value={data.type}
              error={errors.count}
            />
            <SelectedField
              label="Выбери валюту счёта"
              options={currency}
              name="currency"
              onChange={handleChange}
              value={data.currency}
              error={errors.currency}
            />
            <AvatarsField
              label="Выбери аватарку"
              name="icon"
              value={data.icon}
              onChange={handleChange}
              options={countsIcons}
              count={16}
            />
            {/* {enterError && <p className="text-danger">{enterError}</p>} */}
            <Button
              type="submit"
              classes="w-100 mx-auto"
              // disabled={isValid || enterError}
            >
              {!currentEssence ? "Создать" : "Обновить"}
            </Button>
            <Button
              classes="w-100 mx-auto mt-2"
              bgColor="warning"
              onClick={disAppearanceForm}
            >
              Назад
            </Button>
          </form>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default CountsForm;
