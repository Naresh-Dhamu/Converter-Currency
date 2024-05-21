import { useState, useEffect } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyinfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  useEffect(() => {
    setConvertedAmount(amount * (currencyInfo[to] || 0));
  }, [amount, from, to, currencyInfo]);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    setConvertedAmount(amount * (currencyInfo[to] || 0));
  };

  return (
    <div className="relative w-full h-screen flex flex-wrap justify-center items-center px-2">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/169677/pexels-photo-169677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      <div className="relative w-full z-10">
        <div className="mb-5">
          <img
            className="w-20 h-20 sm:w-40 sm:h-40 rounded-full mx-auto"
            src="https://avatars.githubusercontent.com/u/89912059?v=4"
            alt="Naresh Dhamu"
          />
          <div className="text-center">
            <div className="font-semibold text-xl sm:text-2xl my-2">Naresh Dhamu</div>
            <div className="font-semibold text-xl sm:text-2xl">By created!</div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto border border-gray-50 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-5">Currency Converter</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(Number(amount))}
                selectedCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5 mb-4">
              <button
                onClick={swap}
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                disabled
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
