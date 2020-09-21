/* filme ids */ 

let ids = [];
console.log(ids);

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

const div = document.querySelectorAll(".add");
const buttons = document.querySelectorAll(".add > button");
const emptyBag = document.querySelector(".sacola-vazia");
const notEmpty = document.querySelector(".sacola-itens");

let bag = [];



buttons.forEach(item => {
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


                newBag.forEach(movie => {
                    if (item.id === movie.id) {
                        const spans = notEmpty.querySelectorAll("span");
                        if (spans.length === 0) {
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
                        } else {
                            for (let i = 0; i < spans.length; i++) {
                                if (spans[i].innerText === movie.title) {
                                    let item = spans[i].closest(".item");
                                    let input = item.querySelector("input");
                                    input.value = movie.qtd;
                                    
                                } else {}
                                
                            }

                            
                        }
                        
                    }

                    console.log(newBag)
                
                
            })
 

            
            })
                                        
                                        /*let item = document.createElement("div");
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
                                        spanTitle.innerText = y.title;
                                        img.src = y.poster_path;
                                        spanPrice = `R$${y.price}`;
                                        input.type = "number";
                                        input.value = 0;
                                        more.innerText = "+";
                                        less.append(deleteImg);
                                        itemQuantidade.append(more, input, less);
                                        notEmpty.append(item);
                                        itemContent.append(spanTitle, spanPrice)
                                        item.append(img, itemContent, itemQuantidade);*/
                                    
                                        
                  
          
        })
}

let bagInterval = setInterval(() => {
    if (bag.length > 0) {
        emptyBag.style.display = "none";
        notEmpty.style.display = "block";
    } else {
        emptyBag.style.display = "flex";
        notEmpty.style.display = "none";
    }
}, 1000);

/* timer */
const timer = document.querySelector(".timer");
const promo = document.querySelector(".promo");
const cupomInput = document.querySelector("#cupom-input");
promo.addEventListener("click", () => {
    cupomInput.value = "HTMLNAOELINGUAGEM"
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
        })
})

fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
    .then(data => data.json())
    .then(dataJson => {
        let results = dataJson.results;

        results.forEach(item => {
            ids.push(item.id)
        })
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

fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/genre/movie/list?language=pt-BR")
    .then(data => data.json())
    .then(dataJson => console.log(dataJson))

fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=28&language=pt-BR")
    .then(data => data.json())
    .then(dataJson => console.log(dataJson))