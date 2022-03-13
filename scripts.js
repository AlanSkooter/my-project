const button = document.getElementById('add-btn');
const buttonDelete = document.getElementById('del-btn');
const sum = document.getElementById('sum');
const container = document.getElementById('container');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const select = document.getElementById('select');
let balance = document.getElementById('balance');
let consumption = document.getElementById('consumption');

const warning = document.createElement('div');
line1.before(warning);
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

sum.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    button.click();
  }
});

button.onclick = () => {
  const sumValue = +sum.value;
  const selectValue = select.value;
  if (!isNaN(sumValue) && sumValue > 0) {
    warning.innerHTML = '';
    const sumDiv = document.createElement('div');
    container.prepend(sumDiv);
      let addSum = {
        select: selectValue,
        value: sumValue.toFixed(2)
      }
      let array = JSON.parse(localStorage.getItem('addSum')||'[]');
      array.push(addSum);
      localStorage.setItem('addSum', JSON.stringify(array));
      location.reload();

  } else {
    warning.innerHTML = `<p id = "warning"> Введите сумму! </p>`; 
  }
  sum.value = '';
  countSum();
}

const reloaded  = () => {
    let arraySumAll = JSON.parse(localStorage.getItem('addSum'));
    if (arraySumAll.length > 0) {
      line2.style.display = "block";
    } else {
      line2.style.display = "none";
    }
    arraySumAll.forEach((elem, index) => {
      let checkSelect;
    if (elem.select === 'income') {
      checkSelect = '+';
    } else if (elem.select === 'outgo') {
      checkSelect = '-';
    }
    const sumDiv = document.createElement('div');
    container.prepend(sumDiv);
    sumDiv.innerHTML = `<label class = "custom-checkbox"> <input type = "checkbox" class = "visually-hidden" id = "${index}" onchange = "delBtn();" > <span class="checker"></span>  <span class="sumvalue"> ${checkSelect} ${elem.value} </span></label>`;
  });
  let countBalance = JSON.parse(localStorage.getItem('balance'));
  let countConsumption = JSON.parse(localStorage.getItem('consumption'));
  balance.innerHTML = `<p>Доступно средств: ${countBalance}</p>`;
  consumption.innerHTML = `<p>Израсходовано: ${countConsumption}</p>`;
}

window.onload = () => {
    reloaded();
}

const remove = () => {
  let checkboxes = document.querySelectorAll('.visually-hidden');
  let array = JSON.parse(localStorage.getItem('addSum')||'[]');
  checkboxes.forEach(elem => {
    if (elem.checked) {
      let index = elem.id;
      array.splice(index, 1);
    }
  });
  localStorage.setItem('addSum', JSON.stringify(array));
  location.reload();
  countSum();
}

buttonDelete.onclick = () => {
  remove();
}

const delBtn = () => {
  let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
    if (checkboxes.length > 0) {
      buttonDelete.style.display = "block";
    } else {
      buttonDelete.style.display = "none";
    }
}