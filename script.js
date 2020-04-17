const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let countItem = 0, countChecked=0,countUnChecked=0;
  

function newTodo() {
  // alert('New TODO button clicked!')
  const li = document.createElement("li");
  const check_box = document.createElement("input");
  const lable = document.createElement("lable");
  const button = document.createElement("button");

  countItem++;
  const ID = 'chk_'+countItem;
  li.className = classNames.TODO_ITEM;
  check_box.className = classNames.TODO_CHECKBOX;
  check_box.type = 'checkbox';
  check_box.id = ID;
  check_box.setAttribute('onClick', 'handleCheckbox('+ID+')');
  lable.className = classNames.TODO_TEXT;
  lable.innerHTML = "Todo item " + countItem;
  button.className = classNames.TODO_DELETE;
  button.innerHTML = 'Delete';
  button.id = 'btn_'+countItem;
  button.setAttribute('onclick','deleteItem(event)');

  li.appendChild(check_box);
  li.appendChild(lable);
  li.appendChild(button);
  list.appendChild(li);

  countUnChecked++;
  uncheckedCountSpan.innerHTML= countUnChecked;
}

function handleCheckbox(id){
  // alert('checkbox click');
  let chk_bx = id.checked;
  if(true === chk_bx){
    countChecked++;
    countUnChecked--;
  }else{
    countChecked--;
    countUnChecked++;
  }
    
  itemCountSpan.innerHTML= countChecked ;
  uncheckedCountSpan.innerHTML= countUnChecked;
}

function deleteItem(e){
  // alert(e.target.id);
  const parent = e.target.parentNode;
  const ck_bx = parent.childNodes[0].checked;
  
  parent.remove();
  
  if(ck_bx){
    countChecked--;
  }
  else{
    countUnChecked--;
  }
  
  itemCountSpan.innerHTML= countChecked ;
  uncheckedCountSpan.innerHTML= countUnChecked;
}