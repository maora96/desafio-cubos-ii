
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
const buttons = document.querySelectorAll(".add > button");
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


buttons.forEach(item => {
    item.addEventListener("click", () => {
        let filmeCard = item.closest(".filme-card");
        let title = filmeCard.querySelector(".movie-title").innerText;
        bag.push(title);
        fillBag();
    })
})


let actionResults;

fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=28&language=pt-BR")
    .then(data => data.json())
    .then(dataJson => {
        actionResults =  dataJson.results;
    })

let romanceResults;

fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=10749&language=pt-BR")
    .then(data => data.json())
    .then(dataJson => {
        romanceResults =  dataJson.results;
    })

let sfResults;

fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=878&language=pt-BR")
    .then(data => data.json())
    .then(dataJson => {
        sfResults =  dataJson.results;
    })

let terrorResults;

fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=27&language=pt-BR")
    .then(data => data.json())
    .then(dataJson => {
        terrorResults =  dataJson.results;
    })
    
    
let todosFilmes;    

function fillBag() {
    fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
        .then(data => data.json())
        .then(dataJson => {
            let newBag = [];
            let results = dataJson.results;
            console.log(results)
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

            actionResults.forEach(item => {
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

            romanceResults.forEach(item => {
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

            sfResults.forEach(item => {
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

            terrorResults.forEach(item => {
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

            todosFilmes = newBag.reduce((prev, current ) => {
                const existe = prev.find((filme) => {
                    return (filme.id === current.id)
                });
                const novosFilmes = prev;
                if (existe) {
                    return prev;
                } else {
                    novosFilmes.push(current);
                    return novosFilmes;
                }
            }, [])
            
            let node = notEmpty.querySelectorAll("*");
            node.forEach(n => {
                n.remove()
            })


            
            todosFilmes.forEach((movie, i) => {
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
                        todosFilmes.splice(i, 1);
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
                localStorage.setItem("bag", JSON.stringify(todosFilmes));
                 
            })

        })

        

    }


function addPromo() {
    let total = 0;
    bag.forEach(item => {
        const filme = todosFilmes.find(f => {
            return (f.title === item); 
        })
        if(filme) {
            total += filme.price;
        }
    })
    console.log(total);
    if (cupomInput.value === "HTMLNAOELINGUAGEM") {
        finalPrice.innerText = `R$ ${total / 2}`
    } else {
        finalPrice.innerText = `R$ ${total}`
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
    addPromo();
    /*
    cupomInput.value = "HTMLNAOELINGUAGEM";
    finalPrice.innerText = `R$ ${actualTotal / 2}`*/
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
        
    })

