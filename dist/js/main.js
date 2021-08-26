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

modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
        closeModal()
    }
})

document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modal.classList.contains('show')) {
        closeModal()
    }
})

const modalTimerId = setTimeout(openModal, 50000)

const showModalByScroll = () => {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
}

window.addEventListener('scroll', showModalByScroll)

// menu cards

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src
        this.alt = alt
        this.title = title
        this.descr = descr
        this.price = price
        this.classes = classes
        this.parent = document.querySelector(parentSelector)
        this.transfer = 27
        this.changeToUAH()
    }

    changeToUAH() {
        this.price = this.price * this.transfer
    }

    render() {
        const element = document.createElement('div')
        if (this.classes.length === 0) {
            this.element = 'menu__item'
            element.classList.add(this.element)
        } else {
            this.classes.forEach(it => element.classList.add(it))
        }
        element.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`
        this.parent.append(element)
    }
}
new MenuCard(
    'img/tabs/vegy.jpg', 
    'vegy', 
    'Меню "Фитнес"', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    8,
    '.menu__field .container',
    'menu__item').render()

new MenuCard(
    'img/tabs/elite.jpg', 
    'elite', 
    'Меню “Премиум”', 
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    20,
    '.menu__field .container',
    'menu__item',
    'big').render()

new MenuCard(
    'img/tabs/post.jpg', 
    'post', 
    'Меню "Постное"', 
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    18,
    '.menu__field .container',
    'menu__item').render()

// forms

const forms = document.querySelectorAll('form')

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с Вами свяжемся',
    failure: 'Что-то пошло не так...'
}

forms.forEach(it => {
    postData(it)
})


function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const statusMessage = document.createElement('img')
        statusMessage.src = message.loading
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `
        form.append(statusMessage)
        form.insertAdjacentElement('afterend', statusMessage)

        const formData = new FormData(form)
        
        const object = {}
        formData.forEach(function(value, key) {
            object[key] = value
        })


        fetch('server.php', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(object)
        }).then(data => data.text())
        .then(data => {
                console.log(data)
                showThanksModal(message.success)
                statusMessage.remove()
        }).catch(() => {
            showThanksModal(message.failure)
        }).finally(() => {
            form.reset()
        })
    })
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog')

    prevModalDialog.classList.add('hide')
    openModal()

    const thanksModal = document.createElement('div')
    thanksModal.classList.add('modal__dialog')
    thanksModal.innerHTML = `
        <div class='modal__content'>
            <div class='modal__close' data-close>&times;</div>
            <div class='modal__title'>${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal)
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show')
        prevModalDialog.classList.remove('hide')
        closeModal()
    }, 4000)
}

fetch('db.json')
    .then(data => data.json())
    .then(res => console.log(res))