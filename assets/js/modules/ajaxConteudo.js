export default async function ajaxConteudo() {
  const wrapperDiv = document.querySelector('.wrapper')
  const errorMessage = document.querySelector('.error--message')
  const elFiltros = document.querySelectorAll('.sidebar--menu li a')
  const textoLoja = document.querySelector('.nome--loja')
  const modalGame = document.querySelector('.modal--game')
  const obody = document.body;



  const removeLoading = (isLoading) => {
    const spinner = document.querySelector('.loader--container');
    if (isLoading) {
      spinner.classList.add('ativo');

    } else {
      spinner.classList.remove('ativo');
    }
  }




  async function getResponseAll() {
    removeLoading(true)
    try {
      const response = await fetch(`https://gamerpower.p.rapidapi.com/api/filter?type=game&platform=epic-games-store.gog.origin.steam.ubisoft`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "gamerpower.p.rapidapi.com",
          "x-rapidapi-key": "59df7faf5emsh2cb45c52d4b33e3p18956fjsn99432fdbfb5d"
        }
      })
      const data = await response.json()
      setTimeout(() => {
        removeLoading(false)
        generateContent(data)

      }, 500)


    } catch (err) {
      console.log(err)
    }
  }

  async function getResponseFiltered(platform) {
    removeLoading(true)
    try {
      const response = await fetch(`https://gamerpower.p.rapidapi.com/api/filter?type=game&platform=${platform}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "gamerpower.p.rapidapi.com",
          "x-rapidapi-key": "59df7faf5emsh2cb45c52d4b33e3p18956fjsn99432fdbfb5d"
        }
      })
      const data = await response.json()
      if (data.status === 0) {
        wrapperDiv.innerHTML = ''
        errorMessage.classList.add('temErro')
        setTimeout(() => {
          removeLoading(false)
          errorMessage.innerHTML = 'No free games or DLC found :(';
        }, 500)

        return
      }
      errorMessage.classList.remove('temErro')
      setTimeout(() => {
        generateContent(data)
        removeLoading(false)
      }, 500)
      errorMessage.innerHTML = '';


    } catch (err) {
      console.log(err)
    }

  }


  const generateContent = (data) => {

    const mapData = data.map(({
      id,
      image,
      open_giveaway_url,
      published_date,
      title,
      type,
      description,
      worth,
      platforms
    }) => {

      return `
        <div class="item" data-id="${id}">
          <div class="imagem--jogo">
            <img src="${image}">
          </div>
          <div class="informacoes--jogo">
            <h3 class="titulo">${title}</h3>
            <div class="preco-nav">
              <p class="preco">FREE <span>${worth}</span></p>
              <span class="tipo">${type}</span>
            </div>
            <p class="descricao">${description}</p>
            <button type="button" class="ver--mais">More info</button>
          </div>
          <div class="btn--container">
            <a href="${open_giveaway_url}" target="_blank" class="btn--pegar">
            Get Free</a>
          </div>
        </div>
      `
    }).join('')
    wrapperDiv.innerHTML = mapData;
  }



  const activeFilter = () => {
    elFiltros.forEach((el) => {
      el.addEventListener('click', (e) => {
        elFiltros.forEach((link) => {
          link.classList.remove('link-ativo')
        })
        e.preventDefault();
        e.target.classList.add('link-ativo')
        wrapperDiv.innerHTML = '';
        removeLoading()
        getResponseFiltered(el.dataset.plataforma)
        switch (el.dataset.plataforma) {
          case 'epic-games-store.gog.origin.steam':
            textoLoja.innerHTML = 'Todas as plataformas';
            break;
          case 'epic-games-store':
            textoLoja.innerHTML = 'Epic Games';
            break;
          case 'gog':
            textoLoja.innerHTML = 'GOG';
            break;
          case 'origin':
            textoLoja.innerHTML = 'Origin';
            break;
          case 'steam':
            textoLoja.innerHTML = 'Steam';
            break;
        }
      })
    })
  }
  getResponseAll();
  activeFilter();




}