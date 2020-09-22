/* bag */

let bag = JSON.parse(localStorage.getItem("bag"));
let cupom = JSON.parse(localStorage.getItem("cupom"));

/* cart */
const buttons = document.querySelectorAll(".add > button");
const emptyBag = document.querySelector(".sacola-vazia");
const notEmpty = document.querySelector(".sacola-itens");
const cupomInput = document.querySelector("#cupom-input")

let totalPrice = 0;
let actualTotal = 0;
const finalPrice = document.querySelector(".final-price");

fillBag();

function fillBag() {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
        .then(data => data.json())
        .then(dataJson => {
            let total = 0;
            let newBag = [];
            let results = dataJson.results;
          
            console.log(bag)

            let node = notEmpty.querySelectorAll("*");
            node.forEach(n => {
                n.remove()
            })

            let prices = [];

            bag.forEach(movie => {
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
                less.append(deleteImg);
                itemQuantidade.append(more, input, less);
                notEmpty.append(item);
                itemContent.append(spanTitle, spanPrice)
                item.append(img, itemContent, itemQuantidade);
                let total = 0;
                total += movie.qtd * movie.price;
                prices.push(total);
                actualTotal = prices.reduce((x, i) =>{
                    return i + x;
                }, 0)
                cupomInput.value = cupom;
                addPromo();   
 
            })

        })
    }


function addPromo() {
    if (cupom === "HTMLNAOELINGUAGEM") {
        finalPrice.innerText = `R$ ${actualTotal / 2}`
    } else {
        finalPrice.innerText = `R$ ${actualTotal}`
    }
}

/* dados */

const dados = document.querySelector(".dados");
const inputs = dados.querySelectorAll("input");
const sacola = document.querySelector(".sacola");
const btnDados = sacola.querySelector("button");

btnDados.addEventListener("click", () => {
    let campos = [];
    inputs.forEach(input => {
        campos.push(input);
    }) 

    let hugeIfTrue = campos.filter(x => {
        if (x.value === "") {
            return x
        }
    })

    if (hugeIfTrue.length != 0) {
        alert("Você não preencheu todos os campos!")
    } else {
        document.location = "confirm.html";
    }
    console.log(hugeIfTrue);
})
