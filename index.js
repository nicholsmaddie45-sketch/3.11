let bank = [];
let odds = [];
let evens = [];

function addNumber(n) {
  bank.push(n);
  render();
}

function sortOne() {
  if (bank.length === 0) return;
  const n = bank.shift();
  if (n % 2 === 0) {
    evens.push(n);
  } else {
    odds.push(n);
  }
  render();
}

function sortAll() {
  while (bank.length > 0) {
    const n = bank.shift();
    if (n % 2 === 0) {
      evens.push(n);
    } else {
      odds.push(n);
    }
  }
  render();
}

function NumberForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Enter a number
      <input name="number" type="number" />
    </label>
    <button>Add number</button>
  `;
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const n = Number(new FormData($form).get("number"));
    if (!Number.isInteger(n)) {
      alert("Please enter a valid integer.");
      return;
    }
    addNumber(n);
    $form.reset();
  });
  return $form;
}

function NumberBank() {
  const $section = document.createElement("section");
  $section.innerHTML = `
    <h2>Number Bank</h2>
    <button id="sort-one">Sort 1</button>
    <button id="sort-all">Sort All</button>
    <ul></ul>
  `;
  $section.querySelector("#sort-one").addEventListener("click", sortOne);
  $section.querySelector("#sort-all").addEventListener("click", sortAll);

  const $ul = $section.querySelector("ul");
  const $items = bank.map((n) => {
    const $li = document.createElement("li");
    $li.textContent = n;
    return $li;
  });
  $ul.replaceChildren(...$items);

  return $section;
}

function NumberCategory(label, numbers) {
  const $section = document.createElement("section");
  $section.innerHTML = `<h2>${label}</h2><ul></ul>`;

  const $ul = $section.querySelector("ul");
  const $items = numbers.map((n) => {
    const $li = document.createElement("li");
    $li.textContent = n;
    return $li;
  });
  $ul.replaceChildren(...$items);

  return $section;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Evens</h1>
    <NumberForm></NumberForm>
    <NumberBank></NumberBank>
    <div id="categories"></div>
  `;
  $app.querySelector("NumberForm").replaceWith(NumberForm());
  $app.querySelector("NumberBank").replaceWith(NumberBank());

  const $categories = $app.querySelector("#categories");
  $categories.appendChild(NumberCategory("Odd", odds));
  $categories.appendChild(NumberCategory("Even", evens));
}

render();
