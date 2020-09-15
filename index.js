// criar e configurar servidor
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const server = new Koa();

server.use(bodyParser());


// criar estoque
let estoque = [];

server.use(ctx => {
    // funcões de mensagem de erro e sucesso
    function errorMessage(s, m) {
        ctx.status = s;
        ctx.body = {
            status: "erro",
            dados: {
                mensagem: m
            }
        }
    }

    function successMessage(s, d) {
        ctx.status = s;
        ctx.body = {
            status: 'sucesso',
            dados: d,
        }
    }

    // funcionalidades de produtos
    if (ctx.url.includes('/products')) {

        // criar um novo produto
        if (ctx.method === "POST") {
            if (!ctx.request.body.id || !ctx.request.body.nome || !ctx.request.body.valor) {
                errorMessage(400, "Pedido mal-formatado!");
            } else {
                let produto = ctx.request.body;
                estoque.push(produto);
                successMessage(200, produto);
            }
        } else if (ctx.method === "GET") {
            const url = ctx.url;
            // listar todos os produtos
            if (url === "/products" || url === "/products/") {
                let produtos = [];
                estoque.forEach((item, i) => {
                    if(item.deletado === false && item.quantidade != 0) {
                        produtos.push(item);
                    }
                })

                if (produtos.length != 0) {
                    successMessage(200, produtos);
                } else {
                    errorMessage(400, "Não há produtos disponíveis.")
                }
            } else {
                // listar um produto baseado em sua id
                let one = url.split("/");
                let id = parseInt(one[2]);
                estoque.forEach(item => {
                    if (item.id === id) {
                        successMessage(200, item);
                    }
                })
            }
        } else if (ctx.method === "DELETE") {
            // deletar produto baseado em sua id
            const url = ctx.url;
            let one = url.split("/");
            let id = parseInt(one[2]);
            estoque.forEach(item => {
                if (item.id === id) {
                    item.deletado = true;
                    successMessage(200, item);
                } else {
                    errorMessage(400, "Produto não encontrado.");
                }
            })
        } else {
            // atualizar um produto baseado em sua id
            const url = ctx.url;
            let one = url.split("/");
            let id = parseInt(one[2]);
            estoque.forEach(item => {
                if (item.id = id) {
                    item.nome = ctx.request.body.nome;
                    item.valor = ctx.request.body.valor;
                    item.quantidade = ctx.request.body.quantidade;
                    item.description = ctx.request.body.description;
                    successMessage(200, item);
                } else {
                    errorMessage(400, "Produto não encontrado.")
                }
            })
        }
    }
})

server.listen(8081, () => console.log("ouvindo porta 8081!"));