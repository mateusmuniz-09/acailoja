const card = document.querySelectorAll(".box-acai");
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");
const overlay = document.querySelector(".overlay-geral");
const btnCart = document.querySelector(".cart");
const cart = document.querySelector(".carrinho-acai");
const fecharCart = document.getElementById("iconefechar");
const itemCart = document.querySelector(".lista-itens");
const addPedido = document.getElementById("addPedido");
let carrinho = [];

const cartItem = document.querySelector(".lista-itens");
const cartTotal = document.querySelector(".total");

fecharModal.addEventListener("click", function () {
  modal.classList.remove("show");
  overlay.classList.remove("visible");
  resetarForm();
});

btnCart.addEventListener("click", function () {
  overlay.classList.add("visible");
  cart.classList.add("open");
});

fecharCart.addEventListener("click", () => {
  cart.classList.remove("open");
  overlay.classList.remove("visible");
});

overlay.addEventListener("click", function () {
  overlay.classList.remove("visible");
  cart.classList.remove("open");
  modal.classList.remove("show");
});

card.forEach((card) =>
  card.addEventListener("click", function (event) {
    const modalParent = event.target.closest("button");

    if (modalParent) {
      modal.classList.add("show");
      overlay.classList.add("visible");
      const title = card.querySelector(".title").textContent;
      const price = card.querySelector(".price").textContent;
      const image = card.querySelector("img").src;
      atualizarModal(title, price, image);
    }
  })
);

function atualizarModal(title, price, image) {
  const modalTitle = document.querySelector(".modal-title");
  const modalPrice = document.querySelector(".modal-price");
  const modalImage = document.querySelector(".img-modal");

  modalTitle.textContent = title;
  modalPrice.textContent = price;
  modalImage.src = image;
}

/* ---------Adcionar ao carrinho ----------- */
modal.addEventListener("click", function (event) {
  const modalParent = event.target.closest("#addPedido");
  if (modalParent) {
    const titulo = modal.querySelector(".modal-title").textContent;
    let quantidade = 1;
    const adicionais = Array.from(
      document.querySelectorAll('input[name="mix"]:checked')
    ).map((checkbox) => checkbox.value);
    const cremes = Array.from(
      document.querySelectorAll('input[name="mix-cremes"]:checked')
    ).map((checkbox) => checkbox.value);

    const coberturas = Array.from(
      document.querySelectorAll('input[name="mix-cobertura"]:checked')
    ).map((checkbox) => checkbox.value);

    const frutas = Array.from(
      document.querySelectorAll('input[name="mix-fruta"]:checked')
    ).map((checkbox) => checkbox.value);

    carrinho.push({
      titulo,
      quantidade,
      adicionais,
      cremes,
      coberturas,
      frutas,
    });
    resetarForm();
    Swal.fire({
      icon: "success",
      title: "Seu pedido foi adicionado!",
      showConfirmButton: false,
      timer: 2000,
      background: "#73009d",
      color: "#b2f2bb",
      timerProgressBar: true,
    });

    modal.classList.remove("show");
    overlay.classList.remove("visible");
  }
  atualizarCart();
});

function atualizarCart() {
  cartItem.innerHTML = "";

  carrinho.forEach((item, index) => {
    const cartTitulo = item.titulo;
    const cartQtd = item.quantidade;
    const cartAdc = item.adicionais;
    const cartCremes = item.cremes;
    const cartCober = item.coberturas;
    const cartFrut = item.frutas;

    const produto = document.createElement("li");
    produto.innerHTML = `
     <div class="item-pedido">
    <div>
    <p><strong>${cartTitulo}</strong></p>
    <p><strong>Quantidade: </strong>${cartQtd}</p>
    <p><strong>Adicionais: </strong> ${cartAdc.join(", ")}</p>
     <p><strong>Cremes: </strong> ${cartCremes.join(", ")}</p>
     <p><strong>Coberturas: </strong> ${cartCober.join(", ")}</p>
     <p><strong>Frutas: </strong> ${cartFrut.join(", ")}</p>
    </div>
    <button class="remove" data-index="${index}">Remover</button>
     </div>
    `;
    cartItem.appendChild(produto);
  });

  const contador = document.getElementById("contador");

  if (carrinho.length > 0) {
    contador.style.display = "block";
    contador.textContent = carrinho.length;
  } else {
    contador.style.display = "none";
  }
}

document.addEventListener("click", function (event) {
  const removeBtn = event.target.closest(".remove");
  if (removeBtn) {
    const index = parseInt(removeBtn.dataset.index);
    carrinho.splice(index, 1);
    atualizarCart();
  }
});
/*   ----------------- limitador de adiconais------------ */
/*
const checkboxes = document.querySelectorAll(
  'input[type="checkbox"][name="mix"]'
);

 checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const selecionados = Array.from(checkboxes).filter((c) => c.checked);

    if (selecionados.length > 5) {
      // Desabilita os que não estão marcados
      checkboxes.forEach((c) => {
        if (!c.checked) {
          checkbox.checked = false;
          c.disabled = true;
          Swal.fire({
            icon: "warning",
            title: "Limite de 5 adicionais!",
            showConfirmButton: false,
            timer: 2000,
            text: "Você só pode escolher até 5 adicionais.",
            confirmButtonColor: "#d36ca2",
          });
        }
      });
    } else {
      checkboxes.forEach((c) => {
        c.disabled = false;
      });
    }
  });
});
 */
function resetarForm() {
  document.querySelectorAll(".form-adicionais").forEach((form) => {
    form.reset();
  });
}

document.querySelector(".finalizar").addEventListener("click", () => {
  const nome = document.querySelector('input[name="nome"]').value;
  const telefone = document.querySelector('input[name="telefone"]').value;
  const rua = document.querySelector('input[name="rua"]').value;
  const numero = document.querySelector('input[name="numero"]').value;
  const bairro = document.querySelector('input[name="bairro"]').value;
  const complemento = document.querySelector('input[name="complemento"]').value;

  const pagamento = document.querySelector('input[name="pagamento"]:checked');

  if (
    !nome ||
    !telefone ||
    !rua ||
    !numero ||
    !bairro ||
    !pagamento ||
    carrinho.length === 0
  ) {
    alert(
      "Preencha todos os campos obrigatórios e adicione pelo menos um item ao carrinho."
    );
    return;
  }

  let mensagem = `🛒 *Novo Pedido de Açaí*\n\n`;
  mensagem += `👤 *Nome:* ${nome}\n📱 *Telefone:* ${telefone}\n\n`;
  mensagem += `📍 *Endereço:*\nRua ${rua}, nº ${numero}\nBairro: ${bairro}\n`;
  if (complemento) mensagem += `Complemento: ${complemento}\n\n`;
  mensagem += `🍧 *Itens do Pedido:*\n`;

  carrinho.forEach((item, index) => {
    mensagem += `${index + 1}°. ${item.titulo} - Quantidade: ${
      item.quantidade
    }\n`;
    if (item.adicionais.length > 0) {
      mensagem += `Acompanhamentos: ${item.adicionais.join(", ")}\n`;
      mensagem += `Cremes: ${item.cremes.join(", ")}\n`;
      mensagem += `Frutas: ${item.frutas.join(", ")}\n`;
      mensagem += `Coberturas: ${item.coberturas.join(", ")}\n`;
    }
    mensagem += `\n`;
  });
  mensagem += `💳 *Pagamento:* ${pagamento.value}\n`;

  const numeroWhats = "+5588981252883";
  const url = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(
    mensagem
  )}`;
  window.open(url, "_blank");

  carrinho = [];
  atualizarCart();
  alert("✅ Pedido enviado com sucesso! O carrinho foi esvaziado.");
  location.reload();
});
