import {useState,useEffect}from 'react';
import './App.css';

function App() {
  const [from , setFrom] =useState("USD");
  let data = `https://api.exchangerate-api.com/v4/latest/${from}`;
  const [amount,setAmount]=useState(0);
  const [rates, setRates]=useState({});
  const [to , setto] =useState("INR");
  const [keys, setKeys]=useState([]);
  const[result,setResult]=useState(5);

  const setprice = (event) => {

    const { name, value } = event.target;

    switch (name) {
      case "amount":
        setAmount(value); // Update state for 'amount'
        break;

      case "from":
        setFrom(value); // Update state for 'amount'
        break;
        
        case "To":
          setto(value); // Update state for 'amount'
        break;
        
      default:
        console.log("anable to acssasing the values ")
        break;
    }
  };
  
useEffect(()=>{
  const retrive =async()=>{
    return await fetch(data);    
  }

  retrive()
  
  .then((res)=>{  
     return res.json();
  })

  .then((result)=>{
    const rates = result.rates;
    const key = Object.keys(rates);
    setKeys(key);
    setRates(rates);
  });

},[from,to]);


const rate = async()=>{
    
    let rate =await rates[to];
    let amt =  rate * amount;

    await setResult(amt);
  }

  rate();
    
    return (
      <>

      <div className="div1">
        <div className="div2">
          <div className="maintop">

          <div className="title">
            <i class="fa-solid fa-globe"></i>
            <h1>Currency Converter</h1>
          </div>
          <div className="live">
            <h2>Live </h2>
            <p></p>
          </div>
          </div>
          <div className="allthree">

          <div className="one">
            <label htmlFor="amount">Amount</label>
            <input type="number" value={amount} onChange={setprice} name="amount" />
          </div>
          <div className="two">
            <label htmlFor="from">From</label>
            <select name="from" id="from" onChange={setprice}>
            {
              keys.map((key) => (
                <option key={key} value={key}>{key}</option>
              ))
            }

            </select>
          </div>
          <div className="three">
            <label htmlFor="To">To</label>
            <select name="To" id="To" onChange={setprice}>
            <option value={to}>{to}</option>
            {
              keys.map((key) => (
               <option key={key} value={key}>{key}</option>
             ))
            }

            </select>
          </div>
            </div>
          <div className="result">

          <h2>{amount} {from} = {result?result.toFixed(2):0} {to}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
