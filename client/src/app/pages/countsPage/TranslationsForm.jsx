import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  CurrencyField,
  SelectedField,
  TextField,
} from "../../components/common/form";
import Button from "../../components/common/Button";
import {
  countsUpdateAfterTranslation,
  selectCounts,
} from "../../store/countsSlice";
import getDate from "../../utils/getDate";
import currency from "../../mock/currency";
import getExchangeRates from "../../utils/getExchangeRates";
import { translationCreate } from "../../store/translationsSlice";
import LoadingBtn from "../../components/common/LoadingBtn";

const TranslationsForm = ({ closeForm }) => {
  const dispatch = useDispatch();
  const inputBalanceTo = useRef();
  const [convertCurrency, setConvertCurrency] = useState();
  const [pending, setPending] = useState(false);
  const [valueConverted, setValueConverted] = useState();
  const [data, setData] = useState({
    fromCount: "0",
    toCount: "",
    content: "",
    date: getDate(),
    balanceFrom: 0,
    balanceTo: 0,
  });

  const counts = {
    0: {
      name: "Пополнение счёта",
      _id: "0",
    },
    ...useSelector(selectCounts()),
  };

  const currencyIdFrom = counts[data.fromCount].currency;
  const fromCurrency = currency[currencyIdFrom];
  const currencyIdTo = counts[data?.toCount]?.currency;
  const toCurrency = currency[currencyIdTo];

  useEffect(() => {
    if (data.fromCount === "0") setConvertCurrency(false);
    if (data.toCount) {
      const countFrom = counts[data.fromCount];
      const countTo = counts[data.toCount];
      if (countFrom.currency !== countTo.currency) setConvertCurrency(true);
      else setConvertCurrency(false);
    }
    if (data.fromCount === "0") setConvertCurrency(false);
    data.balanceFrom = 0;
    setValueConverted("");
  }, [data.fromCount, data.toCount]);

  useEffect(() => {
    if (valueConverted > 0) setValueConverted("");
  }, [data.balanceFrom]);

  const handleChange = ({ target }) => {
    setData((state) => ({
      ...state,
      [target.name]: target.value,
    }));
    // setErrors(null)
  };

  const handleConverter = async () => {
    setPending(true);
    const { result } = await getExchangeRates(
      fromCurrency,
      toCurrency,
      data.balanceFrom,
      data.date,
    );
    setValueConverted(Math.floor(result));
    setPending(false);
    // handleChange({target:{name: 'balanceTo', value: inputBalanceTo.current.value}})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let balanceTo = `${valueConverted}`;
    if (data.fromCount === "0" || fromCurrency === toCurrency)
      balanceTo = data.balanceFrom;
    const newData = { ...data, balanceTo: balanceTo };
    dispatch(translationCreate(newData));
    dispatch(countsUpdateAfterTranslation(newData));
    closeForm();
  };

  return (
    <div className="container rounded-3 shadow-lg p-5 counts-add-page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">Создайте перевод</h3>
        <SelectedField
          name="fromCount"
          type="translations"
          label="Название счёта с которого хотите перевести"
          value={data.fromCount}
          valueTwo={data.toCount}
          options={Object.values(counts)}
          onChange={handleChange}
          // error={errors.fromCount}
        />
        <SelectedField
          name="toCount"
          type="translations"
          label="Название счёта на который хотите перевести"
          value={data.toCount}
          valueTwo={data.fromCount}
          options={Object.values(counts).slice(1)}
          onChange={handleChange}
          // error={errors.toCount}
        />
        <TextField
          name="content"
          label="Комментарий"
          value={data.content}
          onChange={handleChange}
          // error={errors.content}
        />
        <div className="d-flex">
          <CurrencyField
            name="balanceFrom"
            type="number"
            label="Сумма для перевода"
            value={
              data.fromCount !== "0" &&
              counts[data.fromCount].balance < data.balanceFrom
                ? counts[data.fromCount].balance
                : data.balanceFrom
            }
            icon={
              data.fromCount === "0" ? toCurrency?.icon : fromCurrency?.icon
            }
            onChange={handleChange}
            // error={errors.date}
          />
          {convertCurrency && (
            <CurrencyField
              name="balanceTo"
              type="text"
              label="Значение по курсу"
              value={!valueConverted ? "0" : valueConverted}
              icon={toCurrency?.icon}
              convert={convertCurrency}
              onChange={handleChange}
              handleClick={handleConverter}
              inputBalanceTo={inputBalanceTo}
              // error={errors.date}
            />
          )}
        </div>
        {convertCurrency && (
          <Button
            outline={true}
            color="success"
            classes={"mb-3 br-5 w-100"}
            disabled={!data.balanceFrom > 0}
            onClick={handleConverter}
          >
            {pending ? (
              <LoadingBtn label="Секундочку, уже скоро пересчитаю..." />
            ) : (
              "Конвертировать"
            )}
          </Button>
        )}
        <TextField
          name="date"
          type="date"
          label="Дата"
          value={data.date}
          onChange={handleChange}
          // error={errors.date}
        />

        {/* {enterError && <p className="text-danger">{enterError}</p>} */}
        <Button
          type="submit"
          dataType="create"
          classes="w-100 mx-auto"
          // disabled={isValid || enterError}
        >
          Создать
        </Button>
        <Button
          classes="w-100 mx-auto mt-2"
          color="warning"
          onClick={closeForm}
        >
          Назад
        </Button>
      </form>
    </div>
  );
};

TranslationsForm.propTypes = {
  closeForm: PropTypes.func,
};

export default TranslationsForm;
