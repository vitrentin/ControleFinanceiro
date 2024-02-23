"use strict";
toastr.options.progressBar = true;
toastr.options.closeDuration = 300;
toastr.options.closeButton = true;

var category;
var elements = []
var categories = []
var filteredCategories = [];

const storagedUser = localStorage.getItem('@ControleFinanceiro:user');
const storagedToken = localStorage.getItem('@ControleFinanceiro:token');
const userId = JSON.parse(storagedUser).id;


const openModal = () =>
  document.getElementById("modal").classList.add("active");

const openModalUpdate = (row) => {
  category = row

  document.getElementById("modalUpdate").classList.add("active");
}


const closeModal = () =>
  document.getElementById("modal").classList.remove("active");

const closeUpdateModal = () =>
  document.getElementById("modalUpdate").classList.remove("active");

document
  .getElementById("cadastrarCategoria")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalCloseUpdate").addEventListener("click", closeUpdateModal);


fetch(`http://localhost:3000/categories`, {
  method: "GET",
  headers: {
    userId:userId
  },

})
  .then((response) => response.json())
  .then((allCategories) => {
    const table = document.getElementById("record")
    allCategories.map((category) => {
      const newTr = document.createElement("tr");
      const newCategoryTd = document.createElement("td");
      const newActionTd = document.createElement("td");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button")
      editButton.onclick = () => {
       openModalUpdate(formattedCategory)
      }
      deleteButton.onclick = () => {
        deleteCategory(category.id)
      }
      
      const formattedCategory = {
        id: category.id,
        name: category.name,
      };
      const ElementsRow = {
        id: category.id,
        newActionTd,
        newCategoryTd,
        newTr,
      };
      categories.push(formattedCategory);

      elements.push(ElementsRow);
      newCategoryTd.style.textAlign = "center"
      editButton.innerHTML = "Editar"
      deleteButton.innerHTML = "Excluir"
      editButton.classList.add("button", "green")
      deleteButton.classList.add("button","red")
      newActionTd.classList.add("tdTransactionTable")
      newCategoryTd.classList.add("FirstTdTransactionTable");
      newCategoryTd.innerHTML = formattedCategory.name;
      table.appendChild(newTr)
      newTr.appendChild(newCategoryTd)
      newTr.appendChild(newActionTd)
      newActionTd.appendChild(editButton)
      newActionTd.appendChild(deleteButton)
    });
  });
const deleteCategory  = (value) => {
  fetch(`http://localhost:3000/categories/${value}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((category) => {
      const elementsRow = elements
        .map((row) => {
          if (row.id === value) {
            return row;
          }
        })
        .filter((element) => element !== undefined);

      const { newTr } = elementsRow[0];
      newTr.remove();

      const newElementsRow = elements.filter(
        (element) => element.id !== value
      );

      elements = newElementsRow;

      const newCategoriesList = categories.filter(
        (el) => el.id !== category.id
      );
      categories = newCategoriesList;

      toastr.success("Categoria deletada com sucesso!");
    });
}
const updateCategory = () =>{
  let categoryName = document.getElementById("newCategoryName")
  if (categoryName.value === "") {
    const p = document.getElementById("new_value_error");
    p.style.display = "block";
    p.innerText = "Digite o nome de uma categoria";
  }else {
    fetch(`http://localhost:3000/categories/${category.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: categoryName.value
      }),
    })
      .then((response) => response.json())
      .then((category) => {  
        const elementsRow = elements
          .map((row) => {
            if (row.id === category.id) {
              return row;
            }
          })
          .filter((element) => element !== undefined);
        
         const formattedCategory = {
            id: category.id,
            name: category.name,
          };

        const newFilteredCategoriesList = filteredCategories.map(
          (category) => {
            if (category.id === formattedCategory.id) {
              return formattedCategory;
            }
            return category;
          }
        );
        
        const newCategoriesList = categories.map((category) => {
    
          if (category.id === formattedCategory.id) {
            return formattedCategory;
          }
          return category;
        });
  
        categories = newCategoriesList;
        filteredCategories = newCategoriesList;
        const {newCategoryTd, newActionTd } =
          elementsRow[0];
        newActionTd.classList.add("tdTransactionTable")
        newCategoryTd.classList.add("FirstTdTransactionTable");
        newCategoryTd.innerHTML = categoryName.value
  
        toastr.success("Categoria atualizada com sucesso!");
        closeUpdateModal();
      });

  }

}
function registerCategory(){
  let categoryName = document.getElementById("categoryName")
  let element;
  if (categoryName.value === "") {
    const p = document.getElementById("value_error");
    p.style.display = "block";
    p.innerText = "Digite o nome de uma categoria";
  }else{
    fetch("http://localhost:3000/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: categoryName.value,
      userId: userId
    }),
  })
    .then((response) => response.json())
    .then((category) => {
      element = category;
    })
    .then(() => {
      const table = document.getElementById("record")
      const newTr = document.createElement("tr");
      const newCategoryTd = document.createElement("td");
      const newActionTd = document.createElement("td");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button")

     
      const formattedCategory = {
        id: element.id,
        category: element.name,
        
      };

      editButton.onclick = () => {
        openModalUpdate(formattedCategory)
      }
      deleteButton.onclick = () => {
        deleteCategory(formattedCategory.id)
      }

      const ElementsRow = {
        id: element.id,
        newActionTd,
        newCategoryTd,
        newTr,
      };

      categories.push(formattedCategory);
      elements.push(ElementsRow);

      
      newCategoryTd.style.textAlign = "center"
      editButton.innerHTML = "Editar"
      deleteButton.innerHTML = "Excluir"
      editButton.classList.add("button", "green")
      deleteButton.classList.add("button","red")
      newCategoryTd.classList.add("FirstTdTransactionTable");
      newActionTd.classList.add("tdTransactionTable")
      newCategoryTd.innerHTML = element.name;
      table.appendChild(newTr)
      newTr.appendChild(newCategoryTd)
      newTr.appendChild(newActionTd)
      newActionTd.appendChild(editButton)
      newActionTd.appendChild(deleteButton)
      toastr.success("Categoria cadastrada com sucesso!");
      closeModal()
    });
    
  }
}

