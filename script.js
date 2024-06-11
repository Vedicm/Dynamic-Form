let fieldCount = 2;
let isTextFieldNext = true;

function addField() {
  fieldCount++;
  const form = document.getElementById("dynamicForm");
  const newFieldGroup = document.createElement("div");
  newFieldGroup.className = "form-group";
  newFieldGroup.id = `form-group-${fieldCount}`;

    newFieldGroup.innerHTML = `
                <label for="field-${fieldCount}" class="form-label">Text Input</label>
                <input type="text" class="form-control" id="field-${fieldCount}" name="field-${fieldCount}">

                <label class="mt-3 form-label">Radio Button Group</label>
                <div class="radio-group">
                    <label><input type="radio" name="field-${fieldCount}" value="Option 1"> Option 1</label>
                    <label><input type="radio" name="field-${fieldCount}" value="Option 2"> Option 2</label>
                    <label><input type="radio" name="field-${fieldCount}" value="Option 3"> Option 3</label>
                </div>
            `;
  form.insertBefore(newFieldGroup, form.children[form.children.length - 2]);
  isTextFieldNext = !isTextFieldNext;
}

async function saveData() {
  const form = document.getElementById("dynamicForm");
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    const response = await fetch("http://localhost:3000/save-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while saving the data.");
  }
}
