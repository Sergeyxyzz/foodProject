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