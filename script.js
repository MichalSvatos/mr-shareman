const form = document.getElementById('form')
const modalWindow = document.querySelector('.js-modal')

// TODO:
// - [ ] disabled state for buttons
// - [ ] exit fullscreen on esc
// - [ ] test fullscreen on different devices

// MODAL ------------------------------------------------------
const modalHandler = () => {
	if (!modalWindow) return

	closeModal(modalWindow)
	lightSwitch(modalWindow)
	fullscreen(modalWindow)
}

const openModal = (modalWindow, value) => {
	const modalBody = modalWindow.querySelector('.js-modal-body')

	modalBody.innerHTML = value
	modalWindow.classList.add('is-visible')
}

const closeModal = (modalWindow) => {
	const btnCloseModal = document.querySelector(".js-modal-close")

	btnCloseModal.addEventListener('click', (e) => {
		e.preventDefault()
		modalWindow.classList.remove('is-visible')
	})
}

const lightSwitch = (modalWindow) => {
	const lightSwitchButton = document.querySelector('.js-modal-lights')

	lightSwitchButton.addEventListener('click', (e) => {
		e.preventDefault()
		lightSwitchButton.classList.toggle('is-active')
		modalWindow.classList.toggle('lights-on')
	})
}

const fullscreen = (modalWindow) => {
	const fullscreenButton = document.querySelector('.js-modal-fullscreen')

	fullscreenButton.addEventListener('click', (e) => {
		e.preventDefault()
		fullscreenButton.classList.toggle('is-active')

		if (document.fullscreenElement) {
			document.exitFullscreen();

		} else {
			modalWindow.requestFullscreen();

		}
	})
}

// FORM -------------------------------------------------------
const clearTextarea = (textarea) => {
	textarea.value = ""
}

const onLoadFocus = (textarea) => {
	textarea.focus()
}

if (form) {
	const textarea = document.getElementById('text')
	const btnClear = document.querySelector('.js-button-clear')
	const btnScreen = document.querySelector('.js-button-screen')

	btnScreen.addEventListener('click', () => {
		if (!textarea.value) return

		openModal(modalWindow, textarea.value)
	})

	btnClear.addEventListener('click', () => {
		clearTextarea(textarea)
	})

	onLoadFocus(textarea)
	modalHandler()
}
