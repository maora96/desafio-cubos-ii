
/* top filmes */
const topFilmes = document.querySelector(".top-filmes");
const title = topFilmes.querySelectorAll(".movie-title");
const poster = topFilmes.querySelectorAll(".movie-img");
const nota = topFilmes.querySelectorAll(".nota-top");
const price = topFilmes.querySelectorAll(".price");

/* todos filmes */ 
const geralFilmes = document.querySelector(".geral-filmes");
const posters = geralFilmes.querySelectorAll(".movie-img");
const titles = geralFilmes.querySelectorAll(".movie-title");
const notas = geralFilmes.querySelectorAll(".nota-top");
const prices = geralFilmes.querySelectorAll(".price");

/* buttons */
const btnAll = document.querySelector("#btn-all");
const btnAction = document.querySelector("#btn-action");
const btnRomance = document.querySelector("#btn-romance");
const btnSF = document.querySelector("#btn-sf");
const btnTerror = document.querySelector("#btn-terror");

/* sacola */ 

const sacola = document.querySelector(".sacola");
const btnSacola = document.querySelector("button");
console.log(btnSacola)
const btnsTop = document.querySelectorAll(".top-filmes .add > button");
const btnsGeral = document.querySelectorAll(".geral-filmes .add > button");
const emptyBag = document.querySelector(".sacola-vazia");
const notEmpty = document.querySelector(".sacola-itens");
const btnCheckout = sacola.querySelector("button");

btnCheckout.addEventListener("click", () => {
    let cupom = cupomInput.value;
    localStorage.setItem("cupom", JSON.stringify(cupom));
    document.location = "dados.html";
    
})


let bag = [];

let totalPrice = 0;
let actualTotal = 0;
const finalPrice = document.querySelector(".final-price");
console.log(finalPrice)

btnsTop.forEach(item => {
    item.addEventListener("click", () => {
        let filmeCard = item.closest(".filme-card");
        let title = filmeCard.querySelector(".movie-title").innerText;
        bag.push(title);
        fillBag();
    })
})

btnsGeral.forEach(item => {
    item.addEventListener("click", () => {
        let filmeCard = item.closest(".filme-card");
        let title = filmeCard.querySelector(".movie-title").innerText;
        bag.push(title);
        fillBag();
    })
})

function fillBag() {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
        .then(data => data.json())
        .then(dataJson => {
            let newBag = [];
            let results = dataJson.results;
            results.forEach(item => {
                if(bag.includes(item.title)) {
                    let count = 0;
                    bag.forEach(y => {
                        if (y === item.title) {
                            count++
                        }
                    })
                    item.qtd = count;
                    newBag.push(item);
                }
            })

            
            let node = notEmpty.querySelectorAll("*");
            node.forEach(n => {
                n.remove()
            })

            let prices = [];
            newBag.forEach((movie, i) => {
                let item = document.createElement("div");
                item.classList.add("item");
                
                console.log(":(")
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
                    console.log("mais")
                    console.log(movie.qtd)
                    input.value = movie.qtd;
                    

                })
                less.append(deleteImg);
                less.addEventListener("click", () => {
                    movie.qtd = 0;
                    newBag.splice(i, 1);
                    
                    bag.forEach((x, y) => {
                        if (x === movie.title) {
                            bag.splice(y, 1);
                        } 
                    })
                    
                    item.remove();
                })
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

                addPromo();   
                localStorage.setItem("bag", JSON.stringify(newBag));
                 
            })

        })

        

    }


function addPromo() {
    if (cupomInput.value === "HTMLNAOELINGUAGEM") {
        finalPrice.innerText = `R$ ${actualTotal / 2}`
    } else {
        finalPrice.innerText = `R$ ${actualTotal}`
    }
}


let bagInterval = setInterval(() => {
    if (bag.length > 0) {
        emptyBag.style.display = "none";
        notEmpty.style.display = "block";
        btnSacola.disabled = false;
    } else {
        emptyBag.style.display = "flex";
        notEmpty.style.display = "none";
        btnSacola.disabled = true;
    }
}, 1000);


/* timer */
const timer = document.querySelector(".timer");
const promo = document.querySelector(".promo");
const cupomInput = document.querySelector("#cupom-input");

promo.addEventListener("click", () => {
    cupomInput.value = "HTMLNAOELINGUAGEM";
    finalPrice.innerText = `R$ ${actualTotal / 2}`
})

let time = 300;
let minutes = (time) => {
    return Math.floor(time / 60);
}

let seconds = (time) => {
    return Math.floor(time % 60);
}


let interval = setInterval(() => {
    let min = minutes(time);
    let sec = seconds(time);
    if (sec >= 0 && sec < 10) {
        timer.innerText = `00:0${min}:0${sec}`
    } else {
        timer.innerText = `00:0${min}:${sec}`
    }
    time--
    if (time < 0) {
        clearInterval(interval);
    }
}, 1000);

setTimeout(() => {
    promo.style.display = "none";
}, 300000);

/* click events fetch */ 

btnAll.addEventListener("click", () => {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
        .then(data => data.json())
        .then(dataJson => {
            let results = dataJson.results;
            titles.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].title
                })
            })
    
            posters.forEach((item, i) => {
                results.forEach(x => {
                    item.src = results[i].poster_path;
                })
            })
    
            notas.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].vote_average;
                })
            })
    
            prices.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].price;
                })
            })

            btnAction.classList.remove("active");
            btnAll.classList.add("active");
            btnRomance.classList.remove("active");
            btnSF.classList.remove("active");
            btnTerror.classList.remove("active");
        })
})

btnAction.addEventListener("click", () => {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=28&language=pt-BR")
        .then(data => data.json())
        .then(dataJson => {
            let results = dataJson.results;
            titles.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].title
                })
            })
    
            posters.forEach((item, i) => {
                results.forEach(x => {
                    item.src = results[i].poster_path;
                })
            })
    
            notas.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].vote_average;
                })
            })
    
            prices.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].price;
                })
            })
            btnAction.classList.add("active");
            btnAll.classList.remove("active");
            btnRomance.classList.remove("active");
            btnSF.classList.remove("active");
            btnTerror.classList.remove("active");
        })
})

btnRomance.addEventListener("click", () => {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=10749&language=pt-BR")
        .then(data => data.json())
        .then(dataJson => {
            let results = dataJson.results;
            titles.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].title
                })
            })
    
            posters.forEach((item, i) => {
                results.forEach(x => {
                    item.src = results[i].poster_path;
                })
            })
    
            notas.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].vote_average;
                })
            })
    
            prices.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].price;
                })
            })
            btnAction.classList.remove("active");
            btnAll.classList.remove("active");
            btnRomance.classList.add("active");
            btnSF.classList.remove("active");
            btnTerror.classList.remove("active");
        })
})

btnSF.addEventListener("click", () => {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=878&language=pt-BR")
        .then(data => data.json())
        .then(dataJson => {
            let results = dataJson.results;
            titles.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].title
                })
            })
    
            posters.forEach((item, i) => {
                results.forEach(x => {
                    item.src = results[i].poster_path;
                })
            })
    
            notas.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].vote_average;
                })
            })
    
            prices.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].price;
                })
            })
            btnAction.classList.remove("active");
            btnAll.classList.remove("active");
            btnRomance.classList.remove("active");
            btnSF.classList.add("active");
            btnTerror.classList.remove("active");
        })
})

btnTerror.addEventListener("click", () => {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=27&language=pt-BR")
        .then(data => data.json())
        .then(dataJson => {
            let results = dataJson.results;
            titles.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].title
                })
            })
    
            posters.forEach((item, i) => {
                results.forEach(x => {
                    item.src = results[i].poster_path;
                })
            })
    
            notas.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].vote_average;
                })
            })
    
            prices.forEach((item, i) => {
                results.forEach(x => {
                    item.innerText = results[i].price;
                })
            })
            btnAction.classList.remove("active");
            btnAll.classList.remove("active");
            btnRomance.classList.remove("active");
            btnSF.classList.remove("active");
            btnTerror.classList.add("active");
        })
})

fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
    .then(data => data.json())
    .then(dataJson => {
        let results = dataJson.results;

    
        /* top filmes */ 
        title.forEach((item, i) => {
            results.forEach(x => {
                item.innerText = results[i].title
            })
        })

        poster.forEach((item, i) => {
            results.forEach(x => {
                item.src = results[i].poster_path;
            })
        })

        nota.forEach((item, i) => {
            results.forEach(x => {
                item.innerText = results[i].vote_average;
            })
        })

        price.forEach((item, i) => {
            results.forEach(x => {
                item.innerText = results[i].price;
            })
        })

        /* filmes geral */ 

        titles.forEach((item, i) => {
            results.forEach(x => {
                item.innerText = results[i].title
            })
        })

        posters.forEach((item, i) => {
            results.forEach(x => {
                item.src = results[i].poster_path;
            })
        })

        notas.forEach((item, i) => {
            results.forEach(x => {
                item.innerText = results[i].vote_average;
            })
        })

        prices.forEach((item, i) => {
            results.forEach(x => {
                item.innerText = results[i].price;
            })
        })
        console.log(results)
    })


    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
        .then(data => data.json())
        .then(dataJson => {
            console.log(dataJson.results)
        }) 