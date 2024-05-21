import { useId, useState } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) {
  const amountInputId = useId();
  const [error, setError] = useState("");
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Check if the input value is numeric
    if (/^\d*\.?\d*$/.test(value)) {
      onAmountChange && onAmountChange(value);
      setError(""); // Clear error message if input is valid
    } else {
      setError("Please enter a valid number");
    }
  };
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex  ${className}`}>
      <div className="w-1/2">
        <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5 text-black"
          type="text"
          placeholder="Amount"
          disabled={amountDisabled}
          value={amount}
          onChange={handleAmountChange}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>} {/* Display error message */}
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisabled}
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none text-black"
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
