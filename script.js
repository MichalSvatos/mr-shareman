const form = document.getElementById('form')
const modalWindow = document.querySelector('.js-modal')
const modalBody = document.querySelector('.js-modal-body')

// TODO:
// - [ ] disabled state for buttons
// - [x] exit fullscreen on esc
// - [x] test fullscreen on different devices
// - [ ] fix for iOS fullscreen

// MODAL ------------------------------------------------------
const modalHandler = () => {
	if (!modalWindow) return

	closeModal(modalWindow)
	lightSwitch(modalWindow)
	fullscreen(modalWindow)
	resize(modalBody)
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

	document.addEventListener("keydown", (event) => {
		if (event.key === 'Escape') {
			modalWindow.classList.remove('is-visible')
		}
	})
}

const lightSwitch = (modalWindow) => {
	const lightSwitchButton = document.querySelector('.js-modal-lights')

	lightSwitchButton.addEventListener('click', () => {
		lightSwitchButton.classList.toggle('is-active')
		modalWindow.classList.toggle('lights-on')
	})
}

const toggleFullScreen = () => {
	// Thanks https://web.dev/native-hardware-fullscreen/
	const doc = window.document;
	const docEl = doc.documentElement;

	const requestFullScreen =
		docEl.requestFullscreen ||
		docEl.mozRequestFullScreen ||
		docEl.webkitRequestFullScreen ||
		docEl.msRequestFullscreen;

	const cancelFullScreen =
		doc.exitFullscreen ||
		doc.mozCancelFullScreen ||
		doc.webkitExitFullscreen ||
		doc.msExitFullscreen;

	if (
		!doc.fullscreenElement &&
		!doc.mozFullScreenElement &&
		!doc.webkitFullscreenElement &&
		!doc.msFullscreenElement
	) {
		requestFullScreen.call(docEl);

	} else {
		cancelFullScreen.call(doc);

	}
}

const fullscreen = (modalWindow) => {
	const fullscreenButton = document.querySelector('.js-modal-fullscreen')

	fullscreenButton.addEventListener('click', () => {
		fullscreenButton.classList.toggle('is-active')

		toggleFullScreen()
	})
}

const resize = (modalBody) => {
	const plus = document.querySelector(".js-modal-plus")
	const minus = document.querySelector(".js-modal-minus")

	// -- TODO: DRY ...
	plus.addEventListener("click", () => {
		let fontSize = Number(modalBody.dataset.fontSize)

		if (fontSize >= 150) return
		fontSize = fontSize + 10
		modalBody.dataset.fontSize = fontSize
		modalBody.setAttribute("style", `font-size: ${fontSize}%`)
	})

	minus.addEventListener("click", () => {
		let fontSize = Number(modalBody.dataset.fontSize)

		if (fontSize <= 50) return
		fontSize = fontSize - 10
		modalBody.dataset.fontSize = fontSize
		modalBody.setAttribute("style", `font-size: ${fontSize}%`)
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
