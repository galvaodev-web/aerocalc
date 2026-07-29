const formulario = document.getElementById("formulario");
const botaoLimpar = document.getElementById("limpar");
const mensagemErro = document.getElementById("mensagemErro");

const nomeAeronave = document.getElementById("nomeAeronave");
const autonomiaTotal = document.getElementById("autonomiaTotal");
const autonomiaUtil = document.getElementById("autonomiaUtil");
const alcance = document.getElementById("alcance");
const combustivelReserva = document.getElementById("combustivelReserva");
const alerta = document.getElementById("alerta");

function converterHoras(horasDecimais) {
  const horas = Math.floor(horasDecimais);
  const minutos = Math.round((horasDecimais - horas) * 60);

  if (minutos === 60) {
    return `${horas + 1}h 00min`;
  }

  return `${horas}h ${String(minutos).padStart(2, "0")}min`;
}

function calcularDesempenho(evento) {
  evento.preventDefault();

  const aeronave =
    document.getElementById("aeronave").value.trim() || "Aeronave";

  const combustivel = Number(document.getElementById("combustivel").value);

  const consumo = Number(document.getElementById("consumo").value);

  const velocidade = Number(document.getElementById("velocidade").value);

  const reservaMinutos = Number(document.getElementById("reserva").value);

  mensagemErro.textContent = "";

  if (
    combustivel <= 0 ||
    consumo <= 0 ||
    velocidade <= 0 ||
    reservaMinutos < 0
  ) {
    mensagemErro.textContent = "Insira valores válidos maiores que zero.";

    return;
  }

  const reservaHoras = reservaMinutos / 60;

  const totalHoras = combustivel / consumo;

  const reservaLitros = consumo * reservaHoras;

  const horasUteis = totalHoras - reservaHoras;

  if (horasUteis <= 0) {
    nomeAeronave.textContent = aeronave;
    autonomiaTotal.textContent = converterHoras(totalHoras);
    autonomiaUtil.textContent = "0h 00min";
    alcance.textContent = "0 NM";
    combustivelReserva.textContent = `${reservaLitros.toFixed(1)} L`;

    alerta.className = "alerta perigo";
    alerta.textContent =
      "Combustível insuficiente para cumprir a reserva informada.";

    return;
  }

  const alcanceMilhasNauticas = horasUteis * velocidade;

  nomeAeronave.textContent = aeronave;
  autonomiaTotal.textContent = converterHoras(totalHoras);
  autonomiaUtil.textContent = converterHoras(horasUteis);
  alcance.textContent = `${alcanceMilhasNauticas.toFixed(0)} NM`;

  combustivelReserva.textContent = `${reservaLitros.toFixed(1)} L`;

  alerta.className = "alerta sucesso";
  alerta.textContent = `Cálculo concluído. A autonomia útil considera uma reserva de ${reservaMinutos} minutos.`;
}

function limparResultados() {
  formulario.reset();

  document.getElementById("aeronave").value = "";
  document.getElementById("combustivel").value = "";
  document.getElementById("consumo").value = "";
  document.getElementById("velocidade").value = "";
  document.getElementById("reserva").value = "";

  nomeAeronave.textContent = "Aeronave";
  autonomiaTotal.textContent = "--";
  autonomiaUtil.textContent = "--";
  alcance.textContent = "--";
  combustivelReserva.textContent = "--";

  mensagemErro.textContent = "";

  alerta.className = "alerta neutro";
  alerta.textContent = "Preencha os campos e clique em “Calcular desempenho”.";
}

formulario.addEventListener("submit", calcularDesempenho);
botaoLimpar.addEventListener("click", limparResultados);
