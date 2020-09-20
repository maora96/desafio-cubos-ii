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