document.addEventListener("DOMContentLoaded", function() {
    const poltronasList = document.getElementById("poltronas-list");
    const horariosList = document.getElementById("horarios-list");
    const poltronaSelecionadaSpan = document.getElementById("poltrona-selecionada");
    const confirmarReservaBtn = document.getElementById("confirmar-reserva");
    const formaPagamento = document.getElementsByName("pagamento");

    // Adicione suas poltronas aqui, com a estrutura adequada
    const numeroColunas = 6;
    const numeroLinhas = 6;
    const poltronas = [];
    
    // Horários disponíveis
    const horarios = ["10:00", "13:00", "15:30", "18:00", "20:30"];

    // Gerar as poltronas
    for (let linha = 1; linha <= numeroLinhas; linha++) {
        for (let coluna = 1; coluna <= numeroColunas; coluna++) {
            const poltrona = {
                identificador: `${String.fromCharCode(64 + linha)}${coluna}`,
                disponivel: Math.random() < 0.5
            };
            poltronas.push(poltrona);
        }
    }

    // Função para criar a lista de poltronas
    function renderizarPoltronas() {
        poltronasList.innerHTML = "";
        poltronas.forEach(poltrona => {
            const li = document.createElement("li");
            li.textContent = `Poltrona ${poltrona.identificador}`;
            if (poltrona.disponivel) {
                li.classList.add("disponivel");
                li.addEventListener("click", () => selecionarPoltrona(poltrona.identificador));
            } else {
                li.classList.add("ocupada");
            }
            poltronasList.appendChild(li);
        });
    }

    // Função para criar a lista de horários
    function renderizarHorarios() {
        horariosList.innerHTML = "";
        horarios.forEach(horario => {
            const input = document.createElement("input");
            input.type = "radio";
            input.id = horario;
            input.name = "horario";
            input.value = horario;
            const label = document.createElement("label");
            label.htmlFor = horario;
            label.textContent = horario;
            horariosList.appendChild(input);
            horariosList.appendChild(label);
            horariosList.appendChild(document.createElement("br"));
        });
    }

    // Função para selecionar a poltrona
    function selecionarPoltrona(identificadorPoltrona) {
        poltronaSelecionadaSpan.textContent = identificadorPoltrona;
        confirmarReservaBtn.disabled = false;
        const poltronaSelecionada = document.querySelector(".selecionada");
        if (poltronaSelecionada) {
            poltronaSelecionada.classList.remove("selecionada");
        }
        const poltronaClicada = document.querySelector(`#poltronas-list li:contains(${identificadorPoltrona})`);
        poltronaClicada.classList.add("selecionada");
    }

    // Função para verificar se a forma de pagamento foi selecionada
    function verificarPagamento() {
        for (let i = 0; i < formaPagamento.length; i++) {
            if (formaPagamento[i].checked) {
                return true;
            }
        }
        return false;
    }

    // Função para verificar se o horário foi selecionado
    function verificarHorario() {
        const horariosSelecionados = document.getElementsByName("horario");
        for (let i = 0; i < horariosSelecionados.length; i++) {
            if (horariosSelecionados[i].checked) {
                return true;
            }
        }
        return false;
    }

    // Adiciona um evento de clique para o botão de confirmar reserva
    confirmarReservaBtn.addEventListener("click", function() {
        const poltronaSelecionada = poltronaSelecionadaSpan.textContent;
        const pagamentoSelecionado = verificarPagamento();
        const horarioSelecionado = verificarHorario();
        if (poltronaSelecionada && pagamentoSelecionado && horarioSelecionado) {
            const horarioReserva = document.querySelector("input[name='horario']:checked").value;
            alert(`Poltrona ${poltronaSelecionada} selecionada para o horário ${horarioReserva}. Reserva confirmada!`);
            // Aqui você pode adicionar a lógica para enviar os dados para o servidor
        } else {
            alert("Por favor, selecione uma poltrona, um horário e a forma de pagamento.");
        }
    });

    // Renderiza as poltronas e horários quando o DOM estiver pronto
    renderizarPoltronas();
    renderizarHorarios();
});
