// const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/eur.json"

// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");


// for(let select of dropdowns) {
    
//     for (currCode in countryList) {
//         let newOption = document.createElement('option');
//         newOption.innerText = currCode;
//         newOption.value = currCode;

//         if (select.name === 'from' && currCode === 'USD') {
//             newOption.selected = 'selected';
            
//         } else if(select.name === 'to' && currCode === 'INR')  {
//             newOption.selected = 'selected';

    
//         }
//         select.append(newOption);

// }

//     select.addEventListener("change", (evt) => {
//         updateFlag(evt.target);
//     }); // target is basically for where the change is happened
// }


// const updateFlag = (element) => {
//   let currCode = element.value;
//   let countryCode = countryList[currCode];
//   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//   let img = element.parentElement.querySelector("img");
//   img.src = newSrc;
// };

// btn.addEventListener('click', async (evt) => {
//     evt.preventDefault(); // form prevent the form to get submit simply so it don`t Refresh
//     let amount = document.querySelector(".amount input");
//     let amountValue = amount.value;
//     console.log(amountValue);
//     if(amountValue === "" || amountValue < 1) {
//         amountValue = 1;
//         amount.value = "1";
//     }

//     //console.log(fromCurr.value, toCurr.value);

//    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//    let response = await fetch(URL);
//    console.log(response);

// });

// Update version of Code
const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// ADDED (message display element)
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

//  ADDED (initialize flags on load)
window.addEventListener("load", () => {
  updateFlag(fromCurr);
  updateFlag(toCurr);
});

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  //  UPDATED (better flag API)
  let newSrc = `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;

  //  FIXED (convert to number)
  amountValue = Number(amountValue);

  //  FIXED condition
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }

  //  REMOVED WRONG URL (your API doesn't support this)
  // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

  //  ADDED (correct API usage)
  let response = await fetch(BASE_URL);
  let data = await response.json();

  let from = fromCurr.value.toLowerCase();
  let to = toCurr.value.toLowerCase();

  let rates = data.eur;

  //  ADDED (conversion logic)
  let finalAmount;

  if (from === "eur") {
    finalAmount = amountValue * rates[to];
  } else {
    let inEUR = amountValue / rates[from];
    finalAmount = inEUR * rates[to];
  }

  //  ADDED (display result)
  msg.innerText = `${amountValue} ${from.toUpperCase()} = ${finalAmount.toFixed(2)} ${to.toUpperCase()}`;
});











