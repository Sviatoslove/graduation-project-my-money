import axios from "axios";

export default async function getExchangeRates(
  fromCount,
  toCount,
  balance,
  date,
) {
  if (toCount && balance) {
    const currencyServie = axios.create({
      baseURL: `https://api.apilayer.com/currency_data/convert?from=${fromCount.name}&to=${toCount.name}&amount=${balance}&date=${date}`,
      headers: "apikey:ipQHqpY79eTEzjFmtHTx6hQbrQkDFO8H",
    });
    try {
      const { data } = await currencyServie.get();
      return data;
    } catch (error) {
      console.error("Ошибка! " + error);
    }
  }
}
