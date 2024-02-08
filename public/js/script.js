// Pesquisa e amostra dos produtos
const IP = "localhost:8080"
const ul = document.getElementById('list-products')
const inputsModal = {
    nome_produto: document.getElementById("nome-produto-modal"),
    descricao: document.getElementById("descricao-modal"),
    quantidade: document.getElementById("quantidade-modal"),
    preco: document.getElementById("preco-modal"),
    delete: document.getElementById("delete-modal"),
    file: document.getElementById("file-modal"),
    submit: document.getElementById("edit-modal")
}
const form = {
    nome_produto: document.getElementById('nome-produto'),
    descricao: document.getElementById('descricao'),
    quantidade: document.getElementById('quantidade'),
    preco: document.getElementById('preco'),
    file: document.getElementById('file'),
    submit: document.getElementById('add-produto')
}
let idProdutoInModal = ''

// Funções

const showModal = (id) => {
    let produto = Estoque.prototype.produtos.find(({_id}) => _id === id)

    const modal = new bootstrap.Modal(document.querySelector("#modal"))
    const path = produto.pathImage.replace("public", "")
    
    inputsModal.nome_produto.value = produto.nome_produto
    inputsModal.descricao.value = produto.descricao
    inputsModal.quantidade.value = produto.quantidade
    inputsModal.preco.value = produto.preco
    document.getElementById("img-produto-modal")
        .setAttribute("src", path)
    
    modal.show()
}

// Eventos

ul.addEventListener('click', function(event) {
    let li = event.target;

    const IDli = () => {
        while (li.nodeName !== 'LI') {
            li = li.parentNode;
    
            if (li.nodeName === 'UL') {
            li = null;
            break;
            }
        }

        Estoque.prototype.delete(li.id)
    }
    
    while (li.nodeName !== 'LI') {
        li = li.parentNode;

        if (li.nodeName === 'BUTTON' || li.classList[0].includes('button-list-container')) {
            IDli()
            return;
        }

        if (li.nodeName === 'UL') {
        li = null;
        break;
        }
    }
    idProdutoInModal = li.id

    showModal(li.id)
});

form.submit.addEventListener("click", (e) => {
    e.preventDefault()
    Estoque.prototype.add()
    for (let campo in form) {
        form[campo].value = ''
    }
})

inputsModal.submit.addEventListener("click", (e) => {
    e.preventDefault()
    if (!idProdutoInModal) return 'Não há produto no modal';
    Estoque.prototype.edit(idProdutoInModal)
})

inputsModal.delete.addEventListener("click", (e) => {
    e.preventDefault()
    if (!idProdutoInModal) return 'Não há produto no modal';
    Estoque.prototype.delete(idProdutoInModal)
})

// Classe Estoque

class Estoque {

    constructor () {
        this.produtos = []
    }

    async add () {
        const data = new FormData()
        data.append('nome_produto', form.nome_produto.value)
        data.append('descricao', form.descricao.value)
        data.append('quantidade', form.quantidade.value)
        data.append('preco', form.preco.value)
        data.append('file', form.file.files[0])

        const res = await fetch("/services/create", {
            method: 'POST',
            body: data
        })

        this.get()
        this.renderLis()
        return res
    }

    async get () {
        let res = await fetch("/services/estoque", {method: 'GET'})
        res = await res.json()

        this.produtos = res
        this.renderLis()
    }

    async edit (id) {
        let produto = Estoque.prototype.produtos.find(({_id}) => _id === id)

        const data = new FormData()
        data.append('nome_produto', inputsModal.nome_produto.value)
        data.append('descricao', inputsModal.descricao.value)
        data.append('quantidade', inputsModal.quantidade.value)
        data.append('preco', inputsModal.preco.value)
        data.append('file', inputsModal.file.files[0])

        const res = await fetch("/services/edit/" + produto._id, {
            method: 'PUT',
            body: data
        })

        this.get()
        this.renderLis()
        return res
    }

    async delete (id) {
        let produto = Estoque.prototype.produtos.find(({_id}) => _id === id)

        const res = await fetch("/services/delete/"+produto._id, {method: 'DELETE'})

        if (res.status === 200) {
            res.json()

            this.get()
            this.renderLis()
            return res.message
        }
    }


    renderLis () {
        let lis = this.produtos.reduce((acc, produto) => {
            acc += `
            <li id="${produto._id}" class="d-flex list-group-item">
                <div class="product">
                    <p>${produto.nome_produto}</p>
                </div>
                <div class="button-list-container">
                    <button type="button" class="btn btn-danger">excluir</button>
                </div>
            </li>
            `

            return acc;
        }, '')

        ul.innerHTML = lis
    }
}

Estoque.prototype.get()