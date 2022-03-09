const button = document.getElementById('add-btn');
const sum = document.getElementById('sum');
const container = document.getElementById('container');
const line = document.getElementById('line');
const select = document.getElementById('select');
let balance = document.getElementById('balance');
let consumption = document.getElementById('consumption');

const warning = document.createElement('div');
line.before(warning);
balance.innerHTML = `<p>Доступно средств: 0</p>`;
consumption.innerHTML = `<p>Израсходовано: 0</p>`;

const countSum  = () => {
  let arrayCountSum = JSON.parse(localStorage.getItem('addSum'));
  let countSum = 0;
  let countConsumption = 0;
  arrayCountSum.forEach(elem => {
  const elemValue = +elem.value;
  if (elem.select === 'income') {
    countSum = countSum + elemValue;
  } else if (elem.select === 'outgo') {
    countConsumption = countConsumption + elemValue;
  }
});
let countBalance = countSum - countConsumption;
localStorage.setItem('balance', JSON.stringify(countBalance));
localStorage.setItem('consumption', JSON.stringify(countConsumption));
balance.innerHTML = `<p>Доступно средств: ${countBalance}</p>`;
consumption.innerHTML = `<p>Израсходовано: ${countConsumption}</p>`;
}

button.onclick = () => {
  const sumValue = +sum.value;
  const selectValue = select.value;
  if (!isNaN(sumValue) && sumValue > 0) {
    warning.innerHTML = '';
    const sumDiv = document.createElement('div');
    container.prepend(sumDiv);
      if (selectValue === 'income') {
        let addSum = {
          select: selectValue,
          value: sumValue.toFixed(2)
        }
        let array = JSON.parse(localStorage.getItem('addSum')||'[]');
        array.push(addSum);
        localStorage.setItem('addSum', JSON.stringify(array));
        sumDiv.innerHTML = `<label class = "custom-checkbox"> <input type="checkbox" class = "visually-hidden" id = "check"> <span class="checker"></span> <span class="sumvalue"> + ${sumValue.toFixed(2)} </span></label>`;
      }
      else if (selectValue === 'outgo') {
        let addSum = {
          select: selectValue,
          value: sumValue.toFixed(2)
        }
        let array = JSON.parse(localStorage.getItem('addSum')||'[]');
        array.push(addSum);
        localStorage.setItem('addSum', JSON.stringify(array));
        sumDiv.innerHTML = `<label class = "custom-checkbox"> <input type="checkbox" class = "visually-hidden" id = "check"> <span class="checker"> </span> <span class="sumvalue"> − ${sumValue.toFixed(2)}</span></label>`;
      }
  } else {
    warning.innerHTML = `<p id = "warning"> Введите сумму! </p>`; 
  }
  sum.value = '';
  countSum();
}

const reloaded  = () => {
    let arraySumAll = JSON.parse(localStorage.getItem('addSum'));
    arraySumAll.forEach(elem => {
    if (elem.select === 'income') {
      const sumDiv = document.createElement('div');
      container.prepend(sumDiv);
      sumDiv.innerHTML = `<label class = "custom-checkbox"> <input type="checkbox" class = "visually-hidden" id = "check"> <span class="checker"></span>  <span class="sumvalue"> + ${elem.value} </span></label>`;
    } else if (elem.select === 'outgo') {
      const sumDiv = document.createElement('div');
      container.prepend(sumDiv);
      sumDiv.innerHTML = `<label class = "custom-checkbox"> <input type="checkbox" class = "visually-hidden" id = "check"> <span class="checker"></span>  <span class="sumvalue"> − ${elem.value} </span></label>`;
    }
  });
  let countBalance = JSON.parse(localStorage.getItem('balance'));
  let countConsumption = JSON.parse(localStorage.getItem('consumption'));
  balance.innerHTML = `<p>Доступно средств: ${countBalance}</p>`;
  consumption.innerHTML = `<p>Израсходовано: ${countConsumption}</p>`;
}

window.onload = () => {
  let loaded = sessionStorage.getItem('loaded');
  if (loaded) {
    reloaded();
  } else {
    sessionStorage.setItem('loaded', true);
  }
}