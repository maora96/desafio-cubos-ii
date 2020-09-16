// criar e configurar servidor
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const server = new Koa();

server.use(bodyParser());


// criar estoque
let estoque = [];
// criar pedidos 
let pedidos = [];

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

    function calculateTotal() {
        pedidos.forEach(item => {
            let total = 0;
            item.produtos.forEach((p, i) => {
                total += (p.quantidade * p.valor);
            })
            item.valorTotal = total;
        })

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
    } else if (ctx.url.includes('/orders')) { // funcionalidade de pedidos
        // criar um novo pedido 
        if (ctx.method === "POST") {
            if (!ctx.request.body.id || !ctx.request.body.idCliente) {
                errorMessage(400, "Pedido mal-formatado!")
            } else {
                let order = ctx.request.body;
                pedidos.push(order);
                calculateTotal();
                successMessage(200, order);
            }
        } else if (ctx.method === "GET"){
            const url = ctx.url;
            // listar todos os pedidos
            if (url === "/orders" || url === "/orders/") {
                let availableOrders = [];
                pedidos.forEach(item => {
                    if (item.deletado === false) {
                        availableOrders.push(item)
                    }
                    calculateTotal();
                })
                successMessage(200, availableOrders);
            } else if (url.includes("estado=")) { // listar pedidos baseado em seu estado
                let one = url.split("=");
                let estado = one[1];
                let pedidosEstado = [];
                pedidos.forEach(item => {
                    if (item.estado === estado) {
                        pedidosEstado.push(item);
                        successMessage(200, pedidosEstado);
                    }
                    calculateTotal();
                }) 
            } else {
                // listar um pedido baseado em seu id
                let one = url.split("/");
                let id = parseInt(one[2]);
                let allOders = [];
                pedidos.forEach(item => {
                    if (item.id === id && item.deletado === false) {
                        allOders.push(item);
                    }
                    calculateTotal();
                })
                if (allOders.length != 0) {
                    successMessage(200, allOders);
                } else {
                    errorMessage(400, "Item não encontrado.")
                }
                
            }
        } else if (ctx.method === "DELETE") {
            const url = ctx.url;
            let one = url.split("/");
            let id = parseInt(one[2]);
            // deletar pedido
            pedidos.forEach(item => {
                if (item.id === id) {
                    item.deletado = true;
                    successMessage(200, item)
                }
            })
        } else {
            // atualizar pedido
            const url = ctx.url;
            let one = url.split("/");
            let id = parseInt(one[2]);
            pedidos.forEach(item => {
                if (item.id === id) {
                    // adicionar produto
                    if (ctx.request.body.adicionar === true) {
                        let novoProduto = ctx.request.body;
                        delete novoProduto.adicionar;
                        estoque.forEach(produto => {
                            if (produto.id === novoProduto.id) {
                                if (produto.deletado === false) {
                                    item.produtos.push(novoProduto)
                                    calculateTotal();
                                    successMessage(200, item);
                                } else {
                                    errorMessage(400, "Esse produto está marcado como deletado.")
                                }
                            } 
                        })
                    } else if (ctx.request.body.adicionar === false) { // remover produto
                        let produtoARemoverID = ctx.request.body.id;
                        item.produtos.forEach((p, i) => {
                            if (p.id === produtoARemoverID) {
                                item.produtos.splice(i, 1);
                                calculateTotal();
                                successMessage(200, item);
                            }
                        })
                    }

                    // atualizar quantidade somando
                    if (ctx.request.body.somar === true) {
                        let produtoID = ctx.request.body.id;
                        item.produtos.forEach((p, i) => {
                            if (p.id === produtoID) {
                                p.quantidade += ctx.request.body.quantidade;
                                calculateTotal();
                                successMessage(200, item)
                            }
                        })
                    } else { // atualizar quantidade diminuindo
                        let produtoID = ctx.request.body.id;
                        item.produtos.forEach((p, i) => {
                            if (p.id === produtoID) {
                                p.quantidade -= ctx.request.body.quantidade;
                                calculateTotal();
                                successMessage(200, item)
                            }
                        })
                    }

                    // atualizar estado do pedido
                    if (ctx.request.body.estado) {
                        if (item.estado === "incompleto" && item.produtos.length === 0) {
                            errorMessage(400, "Pedidos marcados como incompletos cuja lista de produtos está vazia não podem ter seu estado alterado.")
                        } else {
                            item.estado = ctx.request.body.estado;
                            calculateTotal();
                            successMessage(200, item);
                        }
                        
                    }

                    // erro se não for nenhuma dos casos acima
                    if (ctx.status === 404) {
                        errorMessage(404, "Pedido mal-formatado.")
                    }
                } else {
                    errorMessage(400, "ID não encontrado.")
                }
            })
        }
    }
})

server.listen(8081, () => console.log("ouvindo porta 8081!"));