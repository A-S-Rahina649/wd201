const todoList = () => {
  let all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter((item) => item.dueDate < today);
  };

  const dueToday = () => {
    return all.filter((item) => item.dueDate === today);
  };

  const dueLater = () => {
    return all.filter((item) => item.dueDate > today);
  };

  const toDisplayableList = (list) => {
    return list
      .map((item) => {
        const status = item.completed ? "[x]" : "[ ]";
        const dateDisplay = item.dueDate === today ? "" : ` ${item.dueDate}`;
        return `${status} ${item.title}${dateDisplay}`;
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};



const todos = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
const overdues = todos.overdue();
console.log(todos.toDisplayableList(overdues));
console.log("\n");

console.log("Due Today");
const itemsDueToday = todos.dueToday();
console.log(todos.toDisplayableList(itemsDueToday));
console.log("\n");

console.log("Due Later");
const itemsDueLater = todos.dueLater();
console.log(todos.toDisplayableList(itemsDueLater));
console.log("\n");
