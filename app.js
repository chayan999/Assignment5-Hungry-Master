
const data_container = document.getElementById('meal');
const searchBtn = document.getElementById('searchBtn');
const warning = document.getElementById('warning');

searchBtn.addEventListener('click', function () {
    const searchItem = document.getElementById('searchItem').value;
    data_container.innerHTML = '';
    if (searchItem === '') {
        warning.style.display = 'block';
    } else {
        getFood(searchItem);
        warning.style.display = 'none';
    }
});

const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderFoodInfo(data.meals[0]);
           // console.log(data.meals[0]);
        });
};

const renderFoodInfo = food => {
    const foodDetailsDiv = document.getElementById('foodsDetails');

    foodDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    
    <h5 class="pt-3 pb-2">Ingredients</h5>
    <ul class="list-unstyled mb-0">
        <li>${food.strMeasure1}, ${food.strIngredient1}</li>
        <li>${food.strMeasure2}, ${food.strIngredient2}</li>
        <li>${food.strMeasure3}, ${food.strIngredient3}</li>
        <li>${food.strMeasure4}, ${food.strIngredient4}</li>
    </ul>

`;
};

function getFood(mealId) {
    const mealApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(mealApi)
        .then(response => response.json())
        .then(data => {
            displayMeal(data.meals);
        });

    const displayMeal = meal => {
        const mealDiv = document.getElementById('meal');
        if (meal != null) {
            meal.map(food => {
                const mealInnerDiv = document.createElement('div');
                mealInnerDiv.className = 'col-md-3';
                const mealInfo = `
                        <div onclick="displayDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#mealsDetails">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                    `;
                mealInnerDiv.innerHTML = mealInfo;
                mealDiv.appendChild(mealInnerDiv);
            });
        } else {
            warning.style.display = 'block';
        }
    };
}
