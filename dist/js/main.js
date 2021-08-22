// tabs
const tabContent = document.querySelectorAll('.tabcontent'),
      tabTitle = document.querySelectorAll('.tabheader__item'),
      tabParent = document.querySelector('.tabheader__items');

const hideTabs = () => {
    tabContent.forEach(it => {
        it.classList.add('hide')
        it.classList.add('show')
    })

    tabTitle.forEach(it => {
        it.classList.remove('tabheader__item_active')
    })
}

hideTabs()

const showTabs = (i = 0) => {
    tabContent[i].classList.add('show', 'fade')
    tabContent[i].classList.remove('hide')
    tabTitle[i].classList.add('tabheader__item_active')
}

showTabs()

const changeTabs = event => {
    const target = event.target

    if (target.classList.contains('tabheader__item')) {
        tabTitle.forEach((it,i) => {
            if(target == it) {
                hideTabs()
                showTabs(i)
            }
        })
    }
}

tabParent.addEventListener('click', changeTabs)

// timer

function timer() {
    setInterval(timer, 1000);

    const deadline = Date.parse('2022-08-23'),
          now = Date.parse(new Date()),
          time = deadline - now;

    const seconds = Math.floor((time / 1000) % 60),
          minutes = Math.floor((time / 1000 / 60) % 60),
          hours = Math.floor((time / 1000 / 60 / 60) % 24),
          days = Math.floor((time / 1000 / 60 / 60 / 24));
    
    const secondsHTML = document.querySelector('#seconds'),
          minutesHTML = document.querySelector('#minutes'),
          hoursHTML = document.querySelector('#hours'),
          daysHTML = document.querySelector('#days');

    secondsHTML.innerHTML = `${addZero(seconds)}`
    minutesHTML.innerHTML = `${addZero(minutes)}`
    hoursHTML.innerHTML = `${addZero(hours)}`
    daysHTML.innerHTML = `${addZero(days)}`

    function addZero (element) {
        if (element < 10) {
            return `0${element}`
        } else {
            return element
        }
    }

    if (time <= 0) {
        secondsHTML.innerHTML = `00`
        minutesHTML.innerHTML = `00`
        hoursHTML.innerHTML = `00`
        daysHTML.innerHTML = `00`
    }

}

timer()

// modal

const btnsOpenModal = document.querySelectorAll('[data-modal]'),
      btnCloseModal = document.querySelector('[data-close]'),
      modal = document.querySelector('.modal');

const openModal = () => {
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
    clearInterval(modalTimerId)
}

const closeModal = () => {
    modal.classList.add('hide')
    modal.classList.remove('show')
    document.body.style.overflow = ''
}

btnsOpenModal.forEach(it => {
    it.addEventListener('click', openModal)
})

btnCloseModal.addEventListener('click', closeModal)

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal()
    }
})

document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modal.classList.contains('show')) {
        closeModal()
    }
})

const modalTimerId = setTimeout(openModal, 10000)

const showModalByScroll = () => {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
}

window.addEventListener('scroll', showModalByScroll)

// menu cards

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector = '.menu__field .container') {
        this.src = src
        this.alt = alt
        this.title = title
        this.descr = descr
        this.price = price
        this.parent = document.querySelector(parentSelector)
        this.transfer = 27
        this.changeToUAH()
    }

    changeToUAH() {
        this.price = this.price * this.transfer
    }

    render() {
        const element = document.createElement('div')
        element.innerHTML = `
        <div class="menu__item">
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>`
        this.parent.append(element)
    }
}
new MenuCard(
    'img/tabs/vegy.jpg', 
    'vegy', 
    'Меню "Фитнес"', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    8).render()

new MenuCard(
    'img/tabs/elite.jpg', 
    'elite', 
    'Меню “Премиум”', 
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    20).render()

new MenuCard(
    'img/tabs/post.jpg', 
    'post', 
    'Меню "Постное"', 
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    18).render()

new MenuCard(
    'http://sun9-3.userapi.com/s/v1/if1/y72Ov_XZPLyuIeAQsCKjkYj31CV4h3ULfIBf755hFxDLRpqvvyxv0Rcs-RDqK0dOBufGqVX5.jpg?size=200x235&quality=96&crop=0,0,500,588&ava=1', 
    'я новое меню', 
    'я новый альт', 
    'а я его новое описание', 
    10).render()







