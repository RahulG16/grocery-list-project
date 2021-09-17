const addLists = document.querySelector(".add-list");
const itemsList = document.querySelector(".plates");
const clearItems = document.querySelector(".delete-btn");

let items = JSON.parse(localStorage.getItem("items")) || [];
function addItems(e) {
  e.preventDefault();
  const item = document.querySelector("[type=text]").value;
  let itemInfo = {
    done: false,
    text: item,
  };
  items.push(itemInfo);
  localStorage.setItem("items", JSON.stringify(items));
  displayItems(items, itemsList);
  addLists.reset();
}

function displayItems(dishs = [], dishItems) {
  dishItems.innerHTML = dishs
    .map((dish, i) => {
      return `
        <li data-value=${i}>
        <label for=item${i}>${dish.text}</label>
        <input type="checkbox" data-index=${i} name="checkbox" id=item${i} ${
        dish.done ? "checked" : ""
      }/>
        <img src="./dustBin.png" alt="dustbin" data-text='${dish.text}' />
        </li>
        `;
    })
    .join("");
}

function toggleItem(e) {
  if (!e.target.matches("input")) return;
  let index = e.target.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  displayItems(items, itemsList);
}

function deleteItem(e) {
  if (!e.target.matches("img")) return;
  let name = e.target.dataset.text;
  console.log(name);
  items = items.filter((item) => {
    return item.text != name;
  });
  console.log(items);
  localStorage.setItem("items", JSON.stringify(items));
  displayItems(items, itemsList);
}

function clearAllItems() {
  localStorage.clear();
  location.reload();
}

addLists.addEventListener("submit", addItems);
itemsList.addEventListener("click", toggleItem);
itemsList.addEventListener("click", deleteItem);
clearItems.addEventListener("click", clearAllItems);
displayItems(items, itemsList);
