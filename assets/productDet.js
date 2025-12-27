import supabase from "../config.js";

let searchParam = new URLSearchParams(window.location.search);

let pId = searchParam.get("id");
// console.log(pId);
let pCard = document.getElementById("pcard");

async function ProductRender() {
  try {
    const { data, error } = await supabase
      .from("productCards")
      .select("*")
      .eq("id", pId)
      .single();
    if (data) {
      pCard.innerHTML = `
        <div class="col-md-6">
        <img src='${data.imageUrl}' width='100'>
        <br>
         <label>Name : </label>
            <h1 class="display-5 fw-bold">${data.name}</h1>
       <label>price: </label>
            <h3 class="text-primary mb-3">${data.price}</h3>
            <label>category: </label>
            <p class="text-muted">${data.category}</p>
<label>description: </label>
            <p class="text-muted">${data.description}</p>
            
            <!-- Selection Options -->
            <div class="mb-4">
            <label class="form-label fw-semibold">Select Color:</label>
            ${data.colors
              .map((color) => {
                return `  
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-dark rounded-circle p-3 b" style="background-color:${color};" ></button>
                   
                </div>`;
              })
              .join("")}
              
            </div>

            <div class="d-flex gap-3 mb-4">
               
                <button onclick="addtoCart(${JSON.stringify(data).replace(
                  /"/g,
                  "&quot;"
                )})" class="btn btn-primary px-5 py-2 w-100"><i class="bi bi-cart-plus me-2"></i>Add to Cart</button>
            </div>
            
            <button class="btn btn-outline-danger w-100"><i class="bi bi-heart me-2"></i>Add to Wishlist</button>
        </div>`;
    }
  } catch (error) {
    console.log(error);
  }
}

ProductRender();
window.addtoCart = function (data) {
  console.log(data);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let exist = cart.find((item) => item.id === data.id);
  console.log(exist);

  console.log(cart);
  if (exist) {
    exist.quantity += 1;
  } else {
    cart.push({
      id: data.id,
      price: data.price,
      name: data.name,
      imgUrl: data.imageUrl,
      quantity: 1,
    });
  }

  //    let exist =

  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("item added in cart");
};
//  __________________________________showing cart continer in drawer
let cartContainer = document.getElementById("cartContainer");

let btnDrawer = document.getElementById("btn-drawer");

let totleDiv = document.getElementById("total");

function cartHandle() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  console.log("cart");

cartContainer.innerHTML =''

  cart.forEach((product,index) => {
    console.log(product);
    // console.log('index-->',index);
    

    cartContainer.innerHTML += `
            <div class="d-flex">
      <img src="${product.imgUrl}" alt="" width="100">
      <div>
     <h3>${product.name}</h3>
      <p>${product.price}</p>
        <div class="colorBtn" style="background-color:;"></div>
      </div>
      <div class="d-flex justify-content-center align-items-center">
      <button onclick="updateQunatity(${index},1)">+</button>
      <p>${product.quantity}</p>
      <button onclick=" updateQunatity(${index},-1)">-</button>
      </div>
      </div>
      </div>
        `;
  });


}
btnDrawer.addEventListener("click", cartHandle);


window.updateQunatity = function(index,operand){
  console.log(operand);
  
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log('yeh cart hai',cart[index]);
  
 cart[index].quantity += operand
 console.log('yeh updated cart value hai',cart);

 if(cart[index].quantity <=0 ){
     cart.splice(index,1)
 }
 localStorage.setItem("cart",JSON.stringify(cart))
 cartHandle()
}

// let arr = [{ // arr --> cart
//     name:"hira"
// }]
// let obj = {   // obj -->data
//     name:"hira"}
// let exist = arr.find(item => item.name == obj.name)
// exist
// {name: 'hira'}
