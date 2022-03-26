// let removeCartItemButtons = document.getElementsByClassName('btn-danger')
// // console.log(deleteCartBtn)
// for (let i=0; i < removeCartItemButtons.length; i++){
//     let button = removeCartItemButtons[i]
//     button.addEventListener('click',(event)=>{
//         let buttonClicked = event.target
//         buttonClicked.parentElement.parentElement.remove()
//     })
// }

// function updateCartTotal(){
//     let cartItemContainer = document.getElementsByClassName('menus')[0]
//     let cartItem = cartItemContainer.getAttributeNames('menu_list')
//     for (let i=0; i < cartItem.length; i++){
//         let cartItem = cartItem[i];
//         let menuPrice = cartItem.getElementsByClassName('menu-price')[0]
//         let quantity = cartItem.getElementsByClassName('quantity')[0]
//         let price = parseFloat(menuPrice.innerText.replace('$',''))
//     }
// }



// Building each Meal

const menueBtb = document.querySelector(".hamburger");
const sidebbar = document.querySelector("#sidebar");
const closeBtbn = document.querySelector(".side_close");
let displayAvailablestores = [];

menueBtb.addEventListener('click', () => {
    if (sidebbar.classList.contains('on')) {
        sidebbar.classList.remove('on');
    } else {
        sidebbar.classList.add('on');
    }
});

closeBtbn.addEventListener('click', () => {
    sidebbar.classList.remove('on');
});


async function showMeals() {

    const user = await getSignedInUser();
    sharedDataId['cartMeals'] = [];
    db.collection("customers").doc(user.uid).collection('cart').get().then((snapshot) => {

        snapshot.docs.forEach(doc => {
            sharedDataId.cartMeals.push(doc.data());
            // console.log(doc.data());
            let individualMeal = doc;
            renderEachMealData(individualMeal);
        })
        calculatePrices(sharedDataId.cartMeals);


    });



}

function renderEachMealData(doc) {


    let mealData = document.getElementById("menuItems");

    document.getElementById("storeName").innerHTML = `${doc.data().restaurantName}`;
    document.getElementById("pickUpTime").innerHTML = `${doc.data().pickUpTime}`;
    document.getElementById("storeImage").innerHTML = `<img src = "${doc.data().storeImage}" alt = "storeimage">`;


    mealData.innerHTML += `<div class="menu_list">
    <ul class="menu_detail">
        <li class="store_img">  <img src="${doc.data().mealImage}" alt=""></li>
        <li>
            <b>${doc.data().menuName}</b>
            
            <p>
               
                <input class="quantity" type="number" id= "givenQuantity" onkeyup="changeQuantity(event, '${doc.data().mealId}')"  value="${doc.data().Quantity}"> 
               
            </p>

        </li>
        <li><span class="menu-price" style="text-decoration:line-through" id = "givenOriginalPrice" >${doc.data().originalPrice}</span>
            <p id = "givenSalePrice" >${doc.data().salePrice}</p>
        </li>
        <li><a class="btn-danger">delete icon</a></li>
    </ul>
</div>`


    // let savedAmount = (originalMealCost - totalMealCost).toFixed(2); givenQuantity.value

}


function changeQuantity(e, mealId) {
    sharedDataId.cartMeals = sharedDataId.cartMeals.map(item => {
        if (item.mealId === mealId) {
            item.Quantity = e.target.value || 0;
        }
        return item;
    })
    calculatePrices(sharedDataId.cartMeals);
}

function calculatePrices(mealData) {
    let totalMealCost = 0;
    let originalMealCost = 0;
    mealData.forEach(item => {
        totalMealCost = (+totalMealCost + (+item.Quantity * +item.salePrice));
        originalMealCost = +originalMealCost + (+item.Quantity * +item.originalPrice);
    })
    let savedAmount = (originalMealCost - totalMealCost).toFixed(2);
    // console.log("totalMealCost : " + totalMealCost);
    // console.log(originalMealCost);
    // console.log(savedAmount);
    document.getElementById("savedAmount").innerHTML = savedAmount;
    document.getElementById("originalAmount").innerHTML = totalMealCost.toFixed(2);
}


async function cart() {
    // alert('clicked on reserve');
    document.getElementById('reserveMeal').disabled = true;
    if (sharedDataId.cartMeals) {
        sharedDataId.cartMeals.forEach((item) => {
            db.collection('customers').doc(auth.currentUser.uid).collection('cart').doc(item.mealId).set(item);
        });
    }
    location.href = "#orderConfirm";
}


showMeals();