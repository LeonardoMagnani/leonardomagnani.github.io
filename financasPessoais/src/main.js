const ano = document.getElementById("ano");
const mes = document.getElementById("mes");
const dia = document.getElementById("dia");
const tipo = document.getElementById("tipo");
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const addButton = document.getElementById("buttonAdd");
const searchButton = document.getElementById("search");
const verificarButton =document.getElementById("verificar");

function currentlyDate () {
    return String(new Date()).split(' ').splice(0,5)
}

if (addButton != null) addButton.addEventListener("click", cadastrarDespesa);
if (searchButton != null) searchButton.addEventListener("click", filtrarRegistros);
if (verificarButton != null) verificarButton.addEventListener("click", calculaSaudeFinanceira);


class Despesa {
    constructor (id, ano, mes, dia, tipo, descricao, valor) {
        this.id = id;
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo; 
        this.descricao = descricao;
        this.valor = valor;
    }
}

function cadastrarDespesa () {
    let success = 'success';
    let bad = 'bad';
    if (!ano.value || ano.value == 'Ano' || ano.value < parseInt(currentlyDate()[3])) return userEntryModalStatus(bad,'ano');
    if (!mes.value || mes.value == 'Mês') return userEntryModalStatus(bad,'mês');
    if (!dia.value || dia.value == 'Dia' || dia.value < 1 || dia.value > 31) return userEntryModalStatus(bad,'dia');
    if (!tipo.value || tipo.value == 'Tipo') return userEntryModalStatus(bad,'tipo');
    if (descricao.value == '' || descricao.value == 'Descrição') return userEntryModalStatus(bad,'descrição');
    if (!valor.value || valor.value == 'Valor') return userEntryModalStatus(bad,'valor');
    postToLocalStorage(new Despesa(gerarId (), ano.value, mes.value, dia.value, tipo.value, descricao.value, Number(valor.value)));
    ano.value = 'Ano';
    mes.value = 'Mês';
    dia.value = '';
    tipo.value = 'Tipo';
    descricao.value = '';
    valor.value = '';
    userEntryModalStatus(success);
}

function postToLocalStorage (userFormEntry) {
    let id = userFormEntry.id;
    localStorage.setItem(id, JSON.stringify(userFormEntry));
}

function gerarId () {
    let ids = [];
    Object.keys(localStorage).forEach((key) => {
        let localObjects = JSON.parse(localStorage[key]);
        ids.push(localObjects.id);
    });
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ0123456789";
    let uuidLength = 16;
    let uuid = "";
    for (let i = 0; i < uuidLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        uuid += chars.substring(randomNumber, randomNumber + 1);
    }
    // Por segurança, vamos validar se o uuid gerado não é repetido e vai substituir a informação que já está no banco.
    ids.forEach((d) => {
        if (d == uuid) return gerarId();
    })
    return uuid;
}

function userEntryModalStatus (status, userEntry) {
    const modalTitle = document.getElementById('modal-title');
    const buttonCloseTop = document.getElementById('button-top'); 
    const paragrafoModal = document.getElementById('paragrafo-modal')
    const buttonBottom = document.getElementById('button-bottom'); 
    if (status == 'success') {
        if (modalTitle.classList.contains('text-danger')) modalTitle.classList.remove('text-danger');
        if (buttonCloseTop.classList.contains('btn-outline-danger')) buttonCloseTop.classList.remove('btn-outline-danger');
        if (buttonBottom.classList.contains('btn-danger')) buttonBottom.classList.remove('btn-danger');
        modalTitle.classList.add('text-success');
        modalTitle.innerHTML = `Tudo certo, registro inserido!`;
        buttonCloseTop.classList.add('btn-outline-success');
        paragrafoModal.innerHTML = "Despesa cadastrada com <span class='text-success'>sucesso</span>.";
        buttonBottom.classList.add('btn-success');
    } else if (status == 'bad') { 
        if (modalTitle.classList.contains('text-success')) modalTitle.classList.remove('text-success');
        if (buttonCloseTop.classList.contains('btn-outline-success')) buttonCloseTop.classList.remove('btn-outline-success');
        if (buttonBottom.classList.contains('btn-success')) buttonCloseTop.classList.remove('btn-success');
        modalTitle.classList.add('text-danger');
        modalTitle.innerHTML = `Ops, ocorreu um problema...`
        buttonCloseTop.classList.add('btn-outline-danger');
        paragrafoModal.innerHTML = `O campo <span class='text-danger'>${userEntry}</span> está ausente ou incorreto.`;
        buttonBottom.classList.add('btn-danger');
    }
    $('#modal-entry').modal('show');
}


function carregaListaDespesa () {
    let lista = document.getElementById('tbody');
    lista.innerHTML = ''; 
    // A função recuperaRegistros() é para o caso de alteração do método de retorno do BD, seria somente alterar a função.
    let despesas = recuperaRegistros (localStorage);
    exibirTabela(despesas);
}

function dateDefault (numEntry) {
    if (numEntry.length == 1) {
        return `0${numEntry}`;
    } else {
        return numEntry;
    }
}

function recuperaRegistros (arr) {
    let despesas = [];
    Object.keys(arr).forEach((key) => {
        let despesa;
        despesa = JSON.parse(arr[key]);
        despesas.push(despesa);
    });
    return despesas;
}

function filtrarRegistros () { 
    let registros = recuperaRegistros(localStorage);
    let dadosInseridos = new Despesa(null, ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);
    tbody.innerHTML = '';
    if (dadosInseridos.ano != 'Ano') registros = registros.filter(data => data.ano == dadosInseridos.ano);
    if (dadosInseridos.mes != 'Mês') registros = registros.filter(data => data.mes == dadosInseridos.mes);
    if (dadosInseridos.dia != '') registros = registros.filter(data => data.dia == dadosInseridos.dia);
    if (dadosInseridos.tipo != 'Tipo') registros = registros.filter(data => data.tipo == dadosInseridos.tipo);
    if (dadosInseridos.descricao != '') registros = registros.filter(data => data.descricao == dadosInseridos.descricao);
    if (dadosInseridos.valor != '') registros = registros.filter(data => data.valor == dadosInseridos.valor);
    if (registros.length == 0) {
        alert('Não gerou dados para retorno.')
    } else {
        exibirTabela(registros);   
    }
}

function exibirTabela (arrRegistros) {
    let lista = document.getElementById('tbody');
    arrRegistros.forEach((d) => {
        let tr = document.createElement('tr');
        let tipoExibicao;
        switch (d.tipo) {
            case '1':
                tipoExibicao = 'Alimentação';
            break;
            case "2":
                tipoExibicao = 'Educação';
            break;
            case "3":
                tipoExibicao = 'Lazer';
            break;
            case "4":
                tipoExibicao = 'Saúde';
            break;
            case "5":
                tipoExibicao = 'Transporte';
            break;
        }
        lista.appendChild(tr);
        tr.classList.add(d.id);

        tr.insertCell(-1).innerHTML = `${dateDefault(d.dia)}/${dateDefault(d.mes)}/${d.ano}`;
        tr.insertCell(-1).innerHTML = `${tipoExibicao}`;
        tr.insertCell(-1).innerHTML = `${d.descricao}`;
        tr.insertCell(-1).innerHTML = `${(d.valor).toFixed(2)}`;
        let btn = document.createElement('button');
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.onclick = removeDespesa;
        tr.insertCell(-1).append(btn);

    });
}

function removeDespesa (e) {
    let elementClicked = e.path;

    Object.keys(elementClicked).forEach((key) => {
        if(elementClicked[key].tagName == 'TR') elementClicked = elementClicked[key].className;
    });

    Object.keys(localStorage).forEach((key) => {
        let idLocalStorage = JSON.parse(localStorage[key]).id;
        if (elementClicked == idLocalStorage)  localStorage.removeItem(elementClicked);
    });

    carregaListaDespesa();

    // Continuar função perguntando ao usuário -> Realmente deseja remover o elemento x ?
    

}

function calculaSaudeFinanceira () {
    let salario = Number(document.getElementById("salario").value);
    let somaDespesas = {
        alimentacao: 0,
        educacao: 0,
        lazer: 0,
        saude: 0,
        transporte: 0,
        calculaPorcentagem (salario, despesa) {
            let result = (despesa * 100) / salario;
            return Math.floor(result);
        }
    };
    let registros = recuperaRegistros(localStorage);
    let divSaude = document.getElementById("retorno-saudeFinanceira");
    
    if (salario == 0) return alert("Informe o salário para prosseguir");

    registros.forEach(d => {
        if (d.tipo == 1) somaDespesas.alimentacao += d.valor;
        if (d.tipo == 2) somaDespesas.educacao += d.valor;
        if (d.tipo == 3) somaDespesas.lazer += d.valor;
        if (d.tipo == 4) somaDespesas.saude += d.valor;
        if (d.tipo == 5) somaDespesas.transporte += d.valor;

       
    });

    let alimentacao = document.createElement('p');
    alimentacao.
    
    console.log(`% com ALIMENTAÇÃO: ${somaDespesas.calculaPorcentagem(salario, somaDespesas.alimentacao)}`);
    console.log(`% com EDUCAÇÃO: ${somaDespesas.calculaPorcentagem(salario, somaDespesas.educacao)}`);
    console.log(`% com LAZER: ${somaDespesas.calculaPorcentagem(salario, somaDespesas.lazer)}`);
    console.log(`% com SAÚDE: ${somaDespesas.calculaPorcentagem(salario, somaDespesas.saude)}`);
    console.log(`% com TRANSPORTE: ${somaDespesas.calculaPorcentagem(salario, somaDespesas.transporte)}`);

}