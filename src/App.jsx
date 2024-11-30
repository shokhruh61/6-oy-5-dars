import React, { useState } from "react";
import calc from "./calc.svg";

function Calculate() {
  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState(0);
  const [rate, setRate] = useState(0);
  const [type, setType] = useState("repayment");
  const [monthRes1, setMonthRes1] = useState(0);
  const [total1, setTotal1] = useState(0);

  function curRes(value) {
    return new Intl.NumberFormat("en-GB").format(value);
  }

  function repayment() {
    const bor = amount;
    const mf = rate / 100 / 12;
    const n = term * 12;
    if (type == "repayment") {
      const mtnh = (bor * mf) / (1 - Math.pow(1 + mf, -n));
      setMonthRes1(mtnh.toFixed(2));
      setTotal1((mtnh * n).toFixed(2));
    } else {
      const mtnh = bor * mf;
      setMonthRes1(mtnh.toFixed(2));
      setTotal1((mtnh * n).toFixed(2));
    }
  }

  function clearAll() {
    setAmount(0);
    setTerm(0);
    setRate(0);
    setType("repayment");
    setMonthRes1(0);
    setTotal1(0);
  }

  return (
    <div className="">
      <div className="flex mx-auto container shadow-[0px_32px_64px_0px_#1330411A] bg-[#FFFFFF] rounded-lg items-center justify-center">
        {/* Asosiy yani calculator qismi */}
        <div className="w-1/2 p-10">
          <div className="flex justify-between mb-10">
            <h1 className="text-[#133041] font-jakarta font-bold text-[24px]">
              Mortgage Calculator
            </h1>
            <button
              onClick={clearAll}
              className="underline text-[16px] text-[#4E6E7E] font-jakarta"
            >
              Clear All
            </button>
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label
              htmlFor="mortgage"
              className="font-medium text-base text-[#4E6E7E] mb-3 cursor-pointer"
            >
              Mortgage Amount
            </label>
            <div className="flex  w-[424px] h-[48px] rounded border-2 border-[#6B94A8] bg-[#E4F4FD]">
              <button className="font-bold text-lg text-[#4E6E7E] px-4 py-3 bg-[#E4F4FD]">
                £
              </button>
              <input
                id="mortgage"
                type="number"
                className="p-2 w-full py-3 px-4"
                value={amount}
                placeholder="Enter amount in £"
                onChange={(e) => setAmount(Math.max(0, e.target.value))}
              />
            </div>
          </div>

          <div className="">
            <div className="flex mb-4 items-center justify-between">
              <div className="flex flex-col">
                <label
                  htmlFor="calc-year"
                  className="font-medium text-base text-[#4E6E7E] mb-3 cursor-pointer"
                >
                  Mortgage Term
                </label>
                <div className="flex border-2 border-[#6B94A8] rounded bg-[#E4F4FD]">
                  <input
                    id="calc-year"
                    type="number"
                    className="p-2"
                    value={term}
                    placeholder="Enter term in years"
                    onChange={(e) => setTerm(Math.max(0, e.target.value))}
                  />
                  <button className="font-bold text-lg bg-[#E4F4FD] py-3 px-4 text-[#4E6E7E]">
                    years
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="rate"
                  className="font-medium text-base text-[#4E6E7E] mb-3 cursor-pointer"
                >
                  Interest Rate
                </label>
                <div className="relative">
                  <div className="flex border-2 border-[#6B94A8] rounded bg-[#E4F4FD]">
                    <input
                      id="rate"
                      type="number"
                      className="w-full p-2"
                      value={rate}
                      placeholder="Enter interest rate"
                      onChange={(e) => setRate(Math.max(0, e.target.value))}
                    />
                    <button className="py-3 px-4 font-bold text-lg text-[#4E6E7E]">
                      %
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-medium text-base text-[#4E6E7E] mb-3 cursor-pointer">
              Mortgage Type
            </label>
            <div className="w-full bg-[#D8DB2F26] border border-[#D8DB2F] p-4 rounded cursor-pointer flex items-center gap-4">
              <input
                className="w-[19.5px] h-[19.5px] rounded-full border-2 border-[#D8DB2F] checked:bg-[#D8DB2F] cursor-pointer"
                id="repayment"
                type="radio"
                name="mortgageType"
                value="repayment"
                checked={type == "repayment"}
                onChange={() => setType("repayment")}
              />
              <label
                htmlFor="repayment"
                className="text-lg font-bold text-[#133041] cursor-pointer"
              >
                Repayment
              </label>
            </div>
            <div className="w-full border border-[#6B94A8] p-4 rounded cursor-pointer flex items-center gap-4">
              <input
                className="w-[19.5px] h-[19.5px] rounded-full border-2 border-[#D8DB2F] checked:bg-[#D8DB2F] cursor-pointer"
                id="only"
                type="radio"
                name="mortgageType"
                value="interestOnly"
                checked={type == "interestOnly"}
                onChange={() => setType("interestOnly")}
              />
              <label
                htmlFor="only"
                className="text-lg font-bold text-[#133041] cursor-pointer"
              >
                Interest only
              </label>
            </div>
          </div>
          <button
            onClick={repayment}
            className="flex w-[314px] h-[56px] bg-[#D8DB2F] rounded-full justify-center items-center mt-10 gap-3 text-[#133041] font-bold text-lg 
            hover:bg-[#C4C72A] active:bg-[#A8AB24] active:scale-95 transition"
          >
            <img src={calc} alt="" />
            Calculate Repayments
          </button>
        </div>
        {/* Result qismi korinadi bu yerda yani calculatordan chiqqan javoblar shetta korinadi */}
        <div className="w-[504px] bg-[#133041] h-[600px] pt-[40px] pr-[40px] pl-[40px] rounded-tl-[5px]  rounded-tr-[25px] rounded-br-[25px] rounded-bl-[80px]">
          <h2 className="text-[#FFFFFF] font-jakarta text-2xl mb-4 font-bold">
            Your results
          </h2>
          <p className="text-[#9ABED5] mb-10 text-lg font-medium w-[460px]">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click "calculate
            repayments" again.
          </p>
          <div className="bg-[rgba(0,0,0,0.25)] pt-8 pl-8 pb-8 border-t-4 border-solid border-limeCustom rounded-t-[8px]">
            <p className="text-[#9ABED5] text-base font-medium mb-2">
              Your mtnh repayments
            </p>
            <div className="w-[259px] h-[100px]">
              {/* Natijalar korinadigan joy */}
              <h3 className="text-[#D8DB2F] font-bold text-[56px] leading-[70px] w-[380px] mb-8 overflow-auto">
                £{curRes(monthRes1)}
              </h3>
            </div>
            <hr className="w-[360px] h-[1px] text-[#9ABED540] mb-8" />
            <p className="font-medium text-base text-[#9ABED5] mb-2">
              Total you'll repay over the term
            </p>
            {/* Natijalar korinadigan joy */}
            <h3 className="text-2xl text-[#FFFFFF] font-bol">
              £{curRes(total1)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculate;
