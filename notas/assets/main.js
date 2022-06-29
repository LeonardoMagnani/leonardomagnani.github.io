var table = document.getElementById('table').getElementsByTagName('tbody')[0];
var inputNome = document.getElementById('nome');
var inputNota = document.getElementById('nota');
var inputTurma = document.getElementById('form-turma');
var inputSubmit = document.getElementById('adicionar');
var qtd = document.getElementById('qtdP');
var alunosAprovados = [];
var alunosReprovados = [];
var aluno = [];
var id = 0;

table.addEventListener('click', removeItem);



function validarArray (alunos) {
    let newClassmater = new Object;


    if (inputNome.value == '' || inputNota.value == '' || inputTurma.value == 'Turma' || inputTurma.value == '') return alert('Digite as informações antes de adicionar na lista.');
    if (inputNota.value > 10) return alert('Não é permitido nota maior que 10.')

        newClassmater.nome = inputNome.value;
        newClassmater.nota = inputNota.value;
        newClassmater.turma = inputTurma.value;
        newClassmater.id = id;
        

        

        alunos.push(newClassmater);
        let alunosTr = document.createElement('tr');
        table.append(alunosTr);

        let idTab = document.createElement('td');
        idTab.classList.add('idTab');
        alunosTr.appendChild(idTab);
        idTab.innerHTML = alunos[alunos.length - 1].id;

        let alunosTlCol1 = document.createElement('td');
        alunosTlCol1.classList.add('alunosTlCol1');
        alunosTr.appendChild(alunosTlCol1);
        alunosTlCol1.innerHTML = alunos[alunos.length - 1].nome;

        let alunosTlCol2 = document.createElement('td');
        alunosTlCol2.classList.add('alunosTlCol2');
        alunosTr.appendChild(alunosTlCol2);
        alunosTlCol2.innerHTML = alunos[alunos.length - 1].nota;

        let alunosTlCol3 = document.createElement('td');
        alunosTlCol3.classList.add('alunosTlCol3');
        alunosTr.appendChild(alunosTlCol3);
        alunosTlCol3.innerHTML = alunos[alunos.length - 1].turma;

        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i></i>';
        removeButton.classList.add('trash-button');
        alunosTr.appendChild(removeButton);

        id++;

        if (newClassmater.nota >= 6) {
            alunosAprovados.push(newClassmater);
            alunosTlCol2.style.color='green'
        } else {
            alunosReprovados.push(newClassmater);
            alunosTlCol2.style.color='red'
        }

        inputNome.value = '';
        inputNota.value = '';
        inputTurma.value = 'Turma';
        inputNome.focus();

        atualizaQtd ()
}

function removeItem (e) {
    const item = e.target;
    if (item.classList[0] === 'trash-button') {
        const alu = item.parentElement;
        let idRemove = parseInt(alu.children[0].innerText);
        for (let i = 0; i < aluno.length; i++) {
            if (aluno[i].id == idRemove) {
                aluno.splice(i,1)
            }
        }

        for (let i = 0; i < alunosAprovados.length; i++) {
            if (alunosAprovados[i].id == idRemove) {
                alunosAprovados.splice(i,1)
            }
        }

        for (let i = 0; i < alunosReprovados.length; i++) {
            if (alunosReprovados[i].id == idRemove) {
                alunosReprovados.splice(i,1)
            }
        }

        alu.remove()
    }
    atualizaQtd ()
}

function atualizaQtd () {
    qtd.innerHTML = aluno.length
}

document.querySelector('#aprovados').addEventListener('click', function showPop () {
    if (alunosAprovados.length == 0) return alert('Nenhum dado a ser mostrado.')
    let popUp = document.querySelector('.popUpFull');
    popUp.classList.add('popUpFull-active-aprovados');
    document.querySelector('.popUp').style.border = '5px solid green';
    let popUpUl = document.getElementById('ulPop');

    
    if (popUpUl.children.length > 0) popUpUl.innerHTML = '';

    let popUpTitle = document.createElement('h2');
         popUpTitle.innerText = 'Aprovados';
         popUpTitle.style.color = 'green'
         popUpUl.appendChild(popUpTitle);
         for (let i = 0; i < alunosAprovados.length; i++) {
             let aprovado = document.createElement('li');
             aprovado.innerText = alunosAprovados[i].nome;
             popUpUl.appendChild(aprovado);
         }

})


document.querySelector('#reprovados').addEventListener('click', function showPop () {
    if (alunosReprovados.length == 0) return alert('Nenhum dado a ser mostrado.')
    let popUp = document.querySelector('.popUpFull');
    popUp.classList.add('popUpFull-active-aprovados');
    document.querySelector('.popUp').style.border = '5px solid red';
    let popUpUl = document.getElementById('ulPop');

    
    if (popUpUl.children.length > 0) popUpUl.innerHTML = '';

    let popUpTitle = document.createElement('h2');
         popUpTitle.innerText = 'Reprovados';
         popUpTitle.style.color = 'red'
         popUpUl.appendChild(popUpTitle);
         for (let i = 0; i < alunosReprovados.length; i++) {
             let reprovado = document.createElement('li');
             reprovado.innerText = alunosReprovados[i].nome;
             popUpUl.appendChild(reprovado);
         }
     
})




function closePop () {
    let popUp = document.querySelector('.popUpFull');
    popUp.classList.remove('popUpFull-active-aprovados');
    console.log('disparou')
}