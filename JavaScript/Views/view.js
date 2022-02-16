const circle = `<div class="circle view-icon"></div>
`;
const note = `<img class="note view-icon" src="Icons/noteBlank.svg" alt="notes image" />
`;
const day = `
<div class="day">
  <span class="day-h1">17</span>
    <div class="divider-days-weeks"></div>
  <span class="day-h1 weekday">M</span>
</div>`;
const newHabitForm = document.querySelector(".add-goal-box");
const formBackgroungDiv = document.querySelector(".form-backgroung-div");

function init() {
  clearForm(newHabitForm);
  hideForm(newHabitForm);
}
init();

export function renderObjects(state, renderOnly = "") {
  if (renderOnly === "day") createObjects(day, `.days`, state);
  if (renderOnly === "circle") createObjects(circle, `.habit-progress`, state);
  if (renderOnly === "note") createObjects(note, `.notes`, state);

  if (renderOnly === "") {
    createObjects(day, `.days`, state);
    createObjects(circle, `.habit-progress`, state);
    createObjects(note, `.notes`, state);
  }
}

export function createObjects(object = "", targetElement, state) {
  const { amountOfDays, displayedDays } = state;
  // console.log(displayedDays[0].getDate());

  const habitProgress = document.querySelectorAll(targetElement);
  [...habitProgress].forEach((element, habitProgressIndex) => {
    let markup = "";

    if (object === day) {
      for (let i = 0; i < amountOfDays; i++) {
        object = `
      <div class="day" date="${displayedDays[i].toDateString()}">
        <h1 class="day-h1">${displayedDays[i].getDate()}</h1>
        <div class="divider-days-weeks"></div>
        <h1 class="day-h1 weekday">${displayedDays[i]
          .toLocaleTimeString("en-us", {
            weekday: "short",
          })
          .at(0)}</h1>
      </div>`;

        markup = markup + `${object}`;
      }
    }

    if (object === circle && state.habits[habitProgressIndex]) {
      markup = ``;
      // let filledDays = [];
      //generate markup with empty and filled days
      //change the object value to the current circle (filled or unfilled)

      const daysDiv = document.querySelectorAll(".day");

      for (let i = 0; i < amountOfDays; i++) {
        // let currDateIsFilled = false;
        const curDate = daysDiv[i].getAttribute("date");

        // console.log(
        //   habitProgressIndex,
        //   state.habits[habitProgressIndex].data,
        //   curDate,
        //   state.habits
        // );

        if (state.habits[habitProgressIndex].data.length) {
          // test if the curDate is on the state.habits[habitProgressIndex].data

          const x = state.habits[habitProgressIndex].data.findIndex((habit) => {
            if (habit[1]) return habit[0] === curDate; //if habit is set to true
          });
          // console.log(x);

          markup +=
            x !== -1
              ? `<div class="circle view-icon"><img src="Icons/goal-complete.svg" alt="goal complete"></div>`
              : `<div class="circle view-icon"></div>`;
        } else {
          markup += `<div class="circle view-icon"></div>`;
        }
      }
    }

    if (object === note) {
      for (let i = 0; i < amountOfDays; i++) {
        markup = markup + `${object}`;
      }
    }
    element.innerHTML = "";

    // if (object === circle) {
    //   console.log("habitProgressIndex: ", habitProgressIndex);
    //   console.log(element);
    //   console.log("innerHTML: ", element.innerHTML);
    //   console.log("Markup: ", markup);
    // }

    element.innerHTML = `${markup}`;
    // if (object === circle) console.log("innerHTML after: ", element.innerHTML);
  });
  document.querySelector(".habit-progress:last-child").innerHTML = "";
  // console.log(document.querySelector(".habit-progress:last-child"));
}

export function renderHabits(state) {
  hideForm(newHabitForm);
  const element = document.querySelector(".habits-div");

  let markup = ``;

  state.habits.forEach((e) => {
    markup += `
    <div class="habit-name">
      <h2 class="habit-h2">${e.title}</h2>
      <i class="fas fa-pen icon icon-h2"></i>
    </div>
    <div class="habit-progress">Habit Progress</div>`;
  });

  element.innerHTML = `
    <div class="habit-name" style="border-bottom: none">
      <i class="fas fa-plus icon add-habit-icon"></i>
    </div>
    <div class="habit-progress" style="border-bottom: none"></div>
  `;
  element.insertAdjacentHTML("afterbegin", markup);
  renderObjects(state);
}

export function showForm(form) {
  form.style.display = "flex";
  formBackgroungDiv.style.visibility = "visible";
  formBackgroungDiv.style.opacity = "30%";
}

export function hideForm(form) {
  form = idForm(form);
  form.style.display = "none";
  formBackgroungDiv.style.visibility = "hidden";
  formBackgroungDiv.style.opacity = "0%";

  clearForm(form);
}

export function clearForm(form) {
  //removes the required warnings
  form
    .querySelectorAll(".form-required")
    .forEach((e) => e.classList.remove("form-required"));

  //removes the previus input values
  form.querySelectorAll("input").forEach((e) => {
    if (e.getAttribute("type") === "submit") return;
    if (e.getAttribute("type") === "checkbox") return (e.checked = false);

    return (e.value = "");
  });
  form.querySelectorAll("textarea").forEach((e) => {
    return (e.value = "");
  });
}

export function idForm(e) {
  if (e.target) {
    return e.target.closest("form");
  }
  return e.closest("form");
}

export function checkNewHabitFormInput() {
  const title = document.querySelector(".add-goal-title");

  if (title.value) {
    // Correct
    return true;
  } else {
    // Incorrect
    if (!title.value) title.classList.add("form-required");
    return false;
  }
}

export function fillCircle(e) {
  e.innerHTML = `<img src="Icons/goal-complete.svg" alt="goal complete">`;
}

export function clearCircle(e) {
  e.innerHTML = "";
}
