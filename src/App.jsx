import { useState } from "react";

function App() {
  const [bill, setBill] = useState(0);
  const [people, setPeople] = useState(0);
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState(0);
  const [active, setActive] = useState(false);

  const handleBill = (e) => {
    setBill(e.target.value);
  };

  const handlePeople = (e) => {
    setPeople(e.target.value);
  };

  const tips = [
    { value: 5, active: false },
    { value: 10, active: false },
    { value: 15, active: false },
    { value: 25, active: false },
    { value: 50, active: false },
  ];

  const handleTip = (e) => {
    setCustomTip(0);
    setTip(e.target.value);

    tips.map((tip) => {
      if (e.target.value == tip.value) {
        return { ...tip, active: true };
      } else return tip;
    });
  };

  console.log(tips);

  const handleCustomTip = (e) => {
    setCustomTip(e.target.value);
  };

  const handleReset = () => {
    setBill(0);
    setPeople(0);
    setTip(0);
  };

  const finalTip = customTip ? customTip : tip;

  const tipAmount = (bill * (finalTip / 100)).toFixed(2);
  const tipAmountPerPerson = ((bill * (finalTip / 100)) / people).toFixed(2);
  const totalBill = (+bill + +tipAmount).toFixed(2);
  const totalPerPerson = ((+bill + +tipAmount) / people).toFixed(2);

  return (
    <div className="App">
      <div className="container">
        <div className="content">
          <div className="information">
            <div className="bill-wrapper">
              <label htmlFor="bill">Bill</label>
              <input
                type="text"
                id="bill"
                value={bill ? bill : ""}
                placeholder={bill}
                onChange={handleBill}
              />
              <span className="icon-bill"></span>
            </div>

            <div className="tips-wrapper">
              <p className="tips-title">Select Tip %</p>
              <div className="tips">
                {tips.map((tip) => (
                  <button
                    value={tip.value}
                    key={tip.value}
                    onClick={(e) => handleTip(e)}
                    className={tip.active ? "active" : ""}
                  >
                    {tip.value}%
                  </button>
                  /* <div className="button">
                    <input type="radio" name="tip" id="tip" value={tip} />
                    <label htmlFor="tip" className="">
                      {"$" + tip}
                    </label>
                  </div> */
                ))}

                <input
                  type="text"
                  id="tip"
                  value={customTip ? customTip : ""}
                  placeholder="Custom"
                  onChange={handleCustomTip}
                />
              </div>
            </div>

            <div className="people-wrapper">
              <label htmlFor="people">Number of People</label>
              <input
                type="text"
                id="people"
                placeholder={people}
                value={people ? people : ""}
                onChange={handlePeople}
              />
              <span className="icon-people"></span>
            </div>
          </div>

          <div className="calculation">
            <div className="amount-wrapper">
              <div>
                <p>Tip Amount</p>
              </div>
              <p className="amount">{tipAmount ? "$" + tipAmount : "$0.00"}</p>
            </div>
            <div className="amount-wrapper">
              <div>
                <p>Tip Amount</p>
                <p className="subtle">/ person</p>
              </div>
              <p className="amount">
                {tipAmountPerPerson && people > 0
                  ? "$" + tipAmountPerPerson
                  : "$0.00"}
              </p>
            </div>
            <div className="amount-wrapper">
              <div>
                <p>Total</p>
                <p className="subtle">with tip</p>
              </div>
              <p className="amount">{totalBill ? "$" + totalBill : "$0.00"}</p>
            </div>
            <div className="amount-wrapper">
              <div>
                <p>Total</p>
                <p className="subtle">/ person</p>
              </div>
              <p className="amount">
                {totalPerPerson && people > 0 ? "$" + totalPerPerson : "$0.00"}
              </p>
            </div>

            <button className="reset-button" onClick={handleReset}>
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
