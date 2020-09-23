/* bag */

let bag = JSON.parse(localStorage.getItem("bag"));
let cupom = JSON.parse(localStorage.getItem("cupom"));

console.log(bag)

/* cart */
const buttons = document.querySelectorAll(".add > button");
const emptyBag = document.querySelector(".sacola-vazia");
const notEmpty = document.querySelector(".sacola-itens");
const cupomInput = document.querySelector("#cupom-input")

let totalPrice = 0;
let actualTotal = 0;
const finalPrice = document.querySelector(".final-price");
cupomInput.value = cupom;

fillBag();

function fillBag() {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
        .then(data => data.json())
        .then(dataJson => {
          
            console.log(bag)

            let node = notEmpty.querySelectorAll("*");
            node.forEach(n => {
                n.remove()
            })


            bag.forEach((movie, i) => {
                let item = document.createElement("div");
                item.classList.add("item");
                
                
                let img = document.createElement("img");
                img.classList.add("item-img");
                let itemContent = document.createElement("div");
                itemContent.classList.add("item-content");
                                                
                let spanTitle = document.createElement("span");
                spanTitle.classList.add("span-title");
                                                
                let spanPrice = document.createElement("span");
                    
                let itemQuantidade = document.createElement("div");
                itemQuantidade.classList.add("item-quantidade");
                    
                let more = document.createElement("div");
                more.classList.add("more");
                    
                let input = document.createElement("input");
                                                
                let less = document.createElement("div");
                less.classList.add("less");
                    
                let deleteImg = document.createElement("img");
                                                
                deleteImg.src = "assets/delete.png";  
                spanPrice.classList.add("span-price");
                spanTitle.innerText = movie.title;
                img.src = movie.poster_path;
                spanPrice = `R$${movie.price}`;
                input.type = "number";
                input.value = movie.qtd;
                more.innerText = "+";
                more.addEventListener("click", () => {
                    movie.qtd = movie.qtd + 1;
                    bag.push(movie.title);
                    input.value = movie.qtd;
                    less.innerHTML = "-";
                    deleteImg.remove();
                    addPromo();
                })
                if (movie.qtd === 1) {
                    less.append(deleteImg);
                } else {
                    less.innerHTML = "-";
                }
                
                less.addEventListener("click", () => {
                    if (movie.qtd === 1) {
                        console.log(movie.qtd)
                        movie.qtd = 0;
                        bag.splice(i, 1);
                        bag = bag.filter(y => {
                            return (y != movie.title);
                        })
                        addPromo();
                        item.remove();
                    } else {
                        movie.qtd-- 
                        deleteImg.remove();
                        console.log(movie.qtd)
                        less.innerText = "-";
                        input.value = movie.qtd;
                        if (movie.qtd === 1) {
                            less.innerHTML = "";
                            less.append(deleteImg);
                        }
                    }
                    
                })
                itemQuantidade.append(more, input, less);
                notEmpty.append(item);
                itemContent.append(spanTitle, spanPrice)
                item.append(img, itemContent, itemQuantidade);
               

                addPromo();   
                 
            })

        })
    }


function addPromo() {
    let total = 0;
    bag.forEach(item => {
        const price = item.price;
        if(price) {
            total += price;
        }
    })
    console.log(finalPrice);
    console.log(total);
    if (cupomInput.value === "HTMLNAOELINGUAGEM") {
        finalPrice.innerText = `R$ ${total / 2}`
    } else {
        finalPrice.innerText = `R$ ${total}`
    }
}

/* dados */

const dados = document.querySelector(".dados");
const inputs = dados.querySelectorAll("input");
const sacola = document.querySelector(".sacola");
const btnDados = sacola.querySelector("button");

function findEmpty() {
    let campos = [];
    inputs.forEach(input => {
        campos.push(input);
    }) 

    let hugeIfTrue = campos.filter(x => {
        if (x.value === "") {
            return x
        }
    })
    return hugeIfTrue;
}


btnDados.addEventListener("click", () => {
    let bool = findEmpty();

    if (bool.length != 0) {
        alert("Você não preencheu todos os campos!")
    } else {
        document.location = "confirm.html";
    }
})

setInterval(() => {
    console.log(findEmpty())
    if (findEmpty().length === 0) {
        btnDados.disabled = false;
        
    } 

}, 1000);
