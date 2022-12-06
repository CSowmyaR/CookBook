
/* using Jquery */

$(document).ready(()=>{
    $("#search-btn").on("click",(e)=> {
        let searchText = $('#searchInput').val();
        getMeals(searchText);
        e.preventDefault();
      });
})

function getMeals(searchText){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
    .then(response => response.json())
    .then(data => {
        let output = "";
        if(data.meals){
            data.meals.forEach(meal => {
                output += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a onclick="mealSelected('${meal.idMeal}')" href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
        }
        else{
            output = "Sorry, we didn't find any meal!";
        }
        $('#meal').html(output);
    })
}

function mealSelected(id){
    sessionStorage.setItem('mealId', id);
    window.location = 'recipe.html';
    return false;
}

function getRecipe(){

    let mealId = sessionStorage.getItem('mealId');
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => recipeDetails(data.meals));
    // .then((data) =>{
    //           let output =`
    //           <div class = "container">
    //          <div>
    //           <img src="${data.meals.strMealThumb}" class="thumbnail">
    //          </div>
    //          <div>2</div>
    //           </div>
    //           `
         
    //          $('#recipe').html(output);
    // })
}

function recipeDetails(meal){
    console.log(meal);
    meal = meal[0];
    let output = `
        <div class = "grid-container>
           <div class = "item1>
               <div class = "meal-img">
                  <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                  <h2 class = "recipe-title">${meal.strMeal}</h2>
                  <h2 class = "recipe-category"> Category : ${meal.strCategory}</h2>
                </div>
           </div>

           <div class = "item2">
                <div class = "recipe-instruct">
                   <h3>Instructions:</h3>
                   <p>${meal.strInstructions}</p>
                </div>
                <div class = "recipe-link">
                   <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
                </div>
           </div>
        </div> 
    `;
    $('#recipe').html(output);
}