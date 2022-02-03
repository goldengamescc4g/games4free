export default async function filtroMobile() {
  const filtroMobile = () => {
    const iconeMobile = document.querySelector('#hamburguer');
    const obody = document.body;
    const sideBarItems = document.querySelectorAll(".sidebar--menu li a")
    iconeMobile.addEventListener("click", (evento) => {
      obody.classList.toggle('filtro-show')
      window.scrollTo(0, 0)
    })

    sideBarItems.forEach((item) => {
      item.addEventListener('click', (evento) => {
        obody.classList.remove('filtro-show');
      })
    })

  }

  filtroMobile()
}