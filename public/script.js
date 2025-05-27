document.addEventListener('DOMContentLoaded', function() { 
    // Elementos do DOM
    const inputTarefa = document.getElementById('campo');
    const btnCriar = document.getElementById('btn-campo');
    const faixaTarefas = document.querySelector('.faixa');

    // Array para armazenar as tarefas
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    
    // Função para renderizar as tarefas na tela
    function renderizarTarefas() {
        // Limpa as tarefas existentes (exceto o título)
        while (faixaTarefas.children.length > 1) {
            faixaTarefas.removeChild(faixaTarefas.lastChild);
        }
        
        // Adiciona cada tarefa ao DOM
        tarefas.forEach((tarefa, index) => {
            const divTarefa = document.createElement('div');
            divTarefa.className = 'tarefa';
            divTarefa.dataset.id = index;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tarefa.concluida;
            checkbox.addEventListener('change', () => toggleConcluida(index));
            
            const spanTexto = document.createElement('span');
            spanTexto.textContent = tarefa.texto;
            if (tarefa.concluida) {
                spanTexto.style.textDecoration = 'line-through';
                spanTexto.style.color = '#888';
            }
            
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.className = 'btn-editar';
            btnEditar.addEventListener('click', () => editarTarefa(index));
            
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.className = 'btn-excluir';
            btnExcluir.addEventListener('click', () => excluirTarefa(index));
            
            divTarefa.appendChild(checkbox);
            divTarefa.appendChild(spanTexto);
            divTarefa.appendChild(btnEditar);
            divTarefa.appendChild(btnExcluir);
            
            faixaTarefas.appendChild(divTarefa);
        });
        
        // Salva no localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    // Função para adicionar nova tarefa
    function adicionarTarefa() {
        const texto = inputTarefa.value.trim();
        if (texto) {
            tarefas.push({
                texto: texto,
                concluida: false
            });
            inputTarefa.value = '';
            renderizarTarefas();
        }
    }
});