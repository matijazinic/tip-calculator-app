import { useState } from "react";

function App() {
  const [bill, setBill] = useState(0);
  const [people, setPeople] = useState(0);
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState(0);
  const [customTipAct, setCustomTipAct] = useState(false);
  const [tips, setTips] = useState([
    { value: 5, active: false },
    { value: 10, active: false },
    { value: 15, active: false },
    { value: 25, active: false },
    { value: 50, active: false },
  ]);

  const handleBill = (e) => {
    setBill(e.target.value);
  };

  const handlePeople = (e) => {
    setPeople(e.target.value);
  };

  const handleTip = (e) => {
    setCustomTip(0);
    setCustomTipAct(false);

    setTip(e.target.value);

    setTips((prev) =>
      prev.map((tip) => {
        if (e.target.value == tip.value) {
          return { ...tip, active: true };
        } else return { ...tip, active: false };
      })
    );
  };

  console.log(tips);

  const handleCustomTip = (e) => {
    setCustomTipAct(true);
    setCustomTip(e.target.value);
    setTips((prev) =>
      prev.map((tip) => {
        return { ...tip, active: false };
      })
    );
  };

  const handleReset = () => {
    setBill(0);
    setPeople(0);
    setTip(0);
    setCustomTip(0);
    setCustomTipAct(false);
    setTips((prev) =>
      prev.map((tip) => {
        return { ...tip, active: false };
      })
    );
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
                    onClick={handleTip}
                    className={tip.active && !customTipAct ? "active" : ""}
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
              <div className="people-upper">
                <label htmlFor="people">Number of People</label>
                {people && people <= 0 ? <p>Can't be zero!</p> : ""}
              </div>
              <input
                type="text"
                id="people"
                placeholder={people}
                value={people ? people : ""}
                onChange={handlePeople}
                pattern="[1-9]+"
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

            <button
              className="reset-button"
              onClick={handleReset}
              disabled={bill ? "" : "true"}
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
