import { useState } from "react";
import useRate from "../hooks/useRate";
import { Link } from "react-router-dom";

function USDToOrther() {
  const [inputAmount, setInputAmount] = useState(0);
  const { rate } = useRate();
  const [outputAmount, setOutputAmount] = useState(0);
  const [error, setError] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState<{
    currency: string;
    date: string;
    price: number;
  } | null>(null);

  const handleInputAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 0) {
      setError("Amount must be greater than 0");
    } else {
      setInputAmount(Number(e.target.value));
      setError("");
    }
    return true;
  };
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    const selectedRate = rate.find(
      (rate) => rate.currency === selectedCurrency
    );
    if (selectedRate) {
      setSelectedCurrency(selectedRate);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputAmount <= 0) {
      setError("Amount must be greater than 0");
      return false;
    }
    if (rate === null) {
      setError("Rate not found");
      return false;
    }
    if (selectedCurrency === null) {
      setError("Currency not found");
      return false;
    }
    setOutputAmount((inputAmount * 1) / selectedCurrency.price);
    setError("");
    return true;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="swap-form">
        <h1>Swap</h1>
        <label htmlFor="input-amount">Amount to send (USD)</label>
        <div className="input-amount-container">
          <input
            id="input-amount"
            type="number"
            placeholder="0.00"
            min="0.0000001"
            step="any"
            required
            value={inputAmount}
            onInvalid={handleInputAmountChange}
            onInput={handleInputAmountChange}
          />
          <p style={{ color: "red", fontSize: "0.8rem" }}>{error}</p>
          <div
            className="error"
            aria-live="polite"
            style={{ color: "red", fontSize: "0.8rem" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="currency"
              style={{
                marginRight: "8px",
              }}
            >
              Currency
            </label>
            <select
              name="currency"
              id="currency"
              onChange={handleCurrencyChange}
            >
              {rate?.map((rateItem) => (
                <option key={rateItem.currency} value={rateItem.currency}>
                  {rateItem.currency}
                </option>
              ))}
              <option value={""} disabled selected>
                null
              </option>
            </select>
            {selectedCurrency && (
              <img
                alt=""
                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${selectedCurrency?.currency.toUpperCase()}.svg`}
              />
            )}
          </div>
          <div>
            <label
              htmlFor="output-amount"
              style={{
                marginRight: "8px",
              }}
            >
              Amount to receive ({selectedCurrency?.currency})
            </label>
            <input id="output-amount" value={outputAmount} disabled />
            <div
              className="error"
              aria-live="polite"
              style={{ color: "red", fontSize: "0.8rem" }}
            />
          </div>
        </div>

        <button disabled={!(!!inputAmount && !!selectedCurrency)}>
          CONFIRM SWAP
        </button>
      </form>
      <Link
        to={"/"}
        style={{
          marginTop: "16px",
          display: "block",
        }}
      >
        Other currency to USD
      </Link>
    </>
  );
}

export default USDToOrther;
