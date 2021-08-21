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

