import { initSelect2 } from "../plugins/init_select2"

const displayUnit = (parent) => {
  const ingredients = (parent ? parent : document).querySelectorAll(".ingredient_input");
  ingredients.forEach((ingredient) => {
    if (ingredient) {
      ingredient.addEventListener("change", handleUnitForUdatedIngredient);
    }
  });
}

const handleUnitForUdatedIngredient = (event) => {
  const field = event.target;
  console.log(field)
  fetch("/api/ingredients")
    .then(response => response.json())
    .then((data) => {
      data.forEach((ingr) => {
        if(ingr["id"] === parseInt(field.value)) {
          field.parentNode.nextElementSibling.nextElementSibling.innerText = ingr["unit"]
          // field.parentNode.parentNode.querySelector(".display-unit").innerText = ingr["unit"]
        };
      });
    });
}

const nextIngredient = () => {
  const cross = document.querySelector(".next-element");
  if (cross) {
    cross.addEventListener("click", touchNextIngredient);
  }
}

let measureIndex = 1;

const touchNextIngredient = (event) => {
  measureIndex++;

  const action = document.getElementById('action').dataset.action;
  if (action === 'recipes_new') {
    const firstIngredient = document.querySelector("#base_ingredient");
    const newNode = firstIngredient.cloneNode(true);
    let content = newNode.innerHTML;
    // console.log(content.replace);
    content = content.replace(/\[0\]/g, `[${measureIndex}]`);
    content = content.replace(/_0_/g, `_${measureIndex}_`);
    // console.log(content);
    newNode.innerHTML = content;
    displayUnit(newNode); // add click event on ingredient input
    firstIngredient.parentNode.appendChild(newNode);
    newNode.querySelector(".display-unit").innerText = '';
    newNode.classList.remove('d-none');
    initSelect2(`#recipe_measures_attributes_${measureIndex}_ingredient_id`);
  } else {
    let newMeasure = document.querySelector('.new-measure-form').innerHTML;
    const measureForm = document.querySelector('.measure-form');
    measureForm.insertAdjacentHTML('beforeend', newMeasure);
    document.querySelector('#new_measure_id').name = `new_measure_id_${measureIndex}`;
    document.querySelector('#new_measure_id').id = `new_measure_id_${measureIndex}`;
    document.querySelector('#new_measure_quantity').name = `new_measure_quantity_${measureIndex}`;
    document.querySelector('#new_measure_quantity').id = `new_measure_quantity_${measureIndex}`;
    document.querySelector('#new_measure_required').name = `new_measure_required_${measureIndex}`;
    document.querySelector('#new_measure_required').id = `new_measure_required_${measureIndex}`;
    initSelect2(`#new_measure_id_${measureIndex}`);
  }
}
export {displayUnit, nextIngredient };
