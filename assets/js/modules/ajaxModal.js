export default async function ajaxModal() {
  const wrapperDiv = document.querySelector('.wrapper')
  const modalContainer = document.querySelector('.modal--container')
  const modalGame = document.querySelector('.modal--game')
  const obody = document.body;

  async function getResponseModal(id) {
    try {
      const response = await fetch(`https://gamerpower.p.rapidapi.com/api/giveaway?id=${id}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "gamerpower.p.rapidapi.com",
          "x-rapidapi-key": "59df7faf5emsh2cb45c52d4b33e3p18956fjsn99432fdbfb5d",

        }
      })

      const data = await response.json()
      console.log(data)
      generateContentModal(data)
    } catch (err) {
      console.log(err)
    }
  }


  const generateContentModal = (data) => {
    const {
      id,
      image,
      open_giveaway_url,
      published_date,
      title,
      type,
      description,
      worth,
      platforms,
      instructions
    } = data;

    modalGame.innerHTML = `
        <span class="close--button"><img src="assets/img/close.svg"></span>
          <div class="game--img">
            <img src="${image}">
          </div>
          <div class="game--informacoes">
              <span class="plataforma">${platforms}</span>
              <h3 class="titulo">${title}</h3>
           <div class="preco-nav">
              <p class="preco">FREE <span>${worth}</span></p>
           <span class="tipo">${type}</span>
           </div>
            <p class="descricao">${description}</p>
            <div class="instrucoes">
              <h3>How to get the game</h3>
              <p>${instructions}</p>
            </div> 
      </div>
      <div class="btn--container">
            <a href="${open_giveaway_url}" target="_blank" class="btn--pegar">
            Get Free</a>
          </div>
    `


  }

  function gameDetails(event, id) {
    obody.classList.add('modal-ativo');
    getResponseModal(id)
  }

  function removeModal() {
    obody.classList.remove('modal-ativo');
    modalGame.innerHTML = '';
  }


  wrapperDiv.addEventListener('click', (e) => {
    if (!e.target.closest(".ver--mais")) {
      return
    }
    const id = e.target.closest(".item").dataset.id;
    gameDetails(event, id);
  });

  modalContainer.addEventListener('click', (e) => {

    if (e.target === modalContainer || e.target.closest('.close--button')) {
      removeModal();
    }
  });
}