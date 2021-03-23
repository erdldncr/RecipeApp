const meals=document.getElementById('meals');
const favMeals=document.querySelector('.fav-meals')
const favContainer=document.querySelector('.fav-container')
getRandomMeal()
fetchFavMeals()
async function getRandomMeal(){
    const resp= await (await fetch('https://www.themealdb.com/api/json/v1/1/random.php'))
    
    const responseData= await resp.json()
    const randomMeal= responseData['meals'][0]
    console.log(randomMeal)
    addMeal(randomMeal,true)
}


async function getMealByID(id){
   const res= await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)

   const resDate= await res.json()
   const meal=resDate.meals
    return meal
}
async function getMealsBySearch(){
    const meals= await  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term)
    // console.log(meals)
}

 function addMeal(randomMeal,random=false){
document.querySelector('.meals').innerHTML=''
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
    <button class="fav-btn">
        <i class="fas fa-heart"></i>
    </button>
</div>
`
meals.appendChild(meal)
const btn=document.querySelector('.fav-btn')
btn.addEventListener('click',()=>{
    if( btn.classList.contains('active')){
        removeMealLS(randomMeal.idMeal)
    }   
   else{
    addMealLS(randomMeal.idMeal)
    fetchFavMeals()
    getRandomMeal()
   }
   btn.classList.toggle('active')


})
}
function addMealLS(mealId){
    const mealIds=getMealLS()
    localStorage.setItem('mealIDs',JSON.stringify([...mealIds,mealId]));

}

function removeMealLS(mealId){
    const mealIds=getMealLS()
    localStorage.setItem('mealIDs',JSON.stringify(mealIds.filter(id=>id!==mealId)));
}

function getMealLS(){
    const mealIds=JSON.parse(localStorage.getItem('mealIDs'))||[];

    return mealIds;
}
 async function fetchFavMeals(){
     favMeals.innerHTML=''
    const mealIDs=getMealLS();
   for(let i=0;i<mealIDs.length;i++){
       let mealId=mealIDs[i]
       let meal =await getMealByID(mealId)
       addMealToFAv(meal)
   }
   //// add them to the screen
   
}

function addMealToFAv(meal){
        let li=document.createElement('li')
        li.id=meal[0].idMeal
        li.innerHTML=`<img src="${meal[0].strMealThumb}" alt="">
        <span>${meal[0].strMeal}</span>`
        favMeals.appendChild(li)
    
    }
favContainer.addEventListener('click',(e)=>{
    
    removeMealLS(e.target.parentElement.id)
    fetchFavMeals()
  })