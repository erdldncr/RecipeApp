const meals=document.getElementById('meals');


async function getRandomMeal(){
    const resp= await (await fetch('https://www.themealdb.com/api/json/v1/1/random.php'))
    
    const responseData= await resp.json()
    const randomMeal= responseData['meals'][0]
    console.log(randomMeal)
    addMeal(randomMeal,true)
}
getRandomMeal()
async function getMealByID(){
   const meal= await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
//    console.log(meal)
}
async function getMealsBySearch(){
    const meals= await  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term)
    // console.log(meals)
}

 function addMeal(randomMeal,random=false){
const meal=document.createElement('div')
meal.classList.add('meal')

meal.innerHTML=`
<div class="meal-header">
${random?
    `<span class="random">
Random Recipe
</span>`:''}
    
    <img src="${randomMeal.strMealThumb}" alt="${randomMeal.strMeal}">
</div>
<div class="meal-body">
    <h4>${randomMeal.strMeal}</h4>
    <button class="fav-btn active">
        <i class="fas fa-heart"></i>
    </button>
</div>
`
meals.appendChild(meal)

}