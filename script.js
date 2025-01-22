const form = document.getElementById('form')
const message = document.querySelector('.app__message')
const modalWindow = document.querySelector('.js-modal')
const modalBody = document.querySelector('.js-modal-body')
const qrCodeContainer = document.getElementById('qr-code-container')
const qrCodeButton = document.querySelector('.js-modal-qr')

// TODO:
// - [ ] disabled state for buttons
// - [x] exit fullscreen on esc
// - [x] test fullscreen on different devices
// - [ ] fix for iOS fullscreen

// MODAL ------------------------------------------------------
const modalHandler = () => {
	if (!modalWindow) return

	closeModal(modalWindow)
	buttonSwitch(modalWindow)
	fullscreen()
	fontSizeChanger(modalBody)
}

const openModal = (modalWindow, value) => {
	const modalBody = modalWindow.querySelector('.js-modal-body')

	modalBody.textContent = value
	modalWindow.classList.add('is-visible')

	return modalBody.innerHTML

}

const closeModal = (modalWindow) => {
	const btnCloseModal = document.querySelector(".js-modal-close")

	btnCloseModal.addEventListener('click', (e) => {
		e.preventDefault()
		modalWindow.classList.remove('is-visible')
	})

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			modalWindow.classList.remove('is-visible')
			qrCodeContainer.innerHTML = ""
			qrCodeButton.classList.remove("is-active")
		}
	})
}

const buttonSwitch = (modalWindow) => {
	const switchButton = document.querySelectorAll('.js-modal-button-switch')

	switchButton.forEach(button => {
		button?.addEventListener('click', (e) => {
			button.classList.toggle('is-active')

			if (e.currentTarget.classList.contains("js-modal-qr")) {
				if (!qrCodeContainer) return

				if (qrCodeContainer.innerHTML === "") {
					new QRCode(qrCodeContainer, e.currentTarget.dataset.value)

				} else {
					qrCodeContainer.innerHTML = ""

				}
			}

			if (e.currentTarget.classList.contains("js-modal-lights")) {
				modalWindow.classList.toggle('lights-on')
			}
		})
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

const fullscreen = () => {
	const fullscreenButton = document.querySelector('.js-modal-fullscreen')

	fullscreenButton.addEventListener('click', () => {
		fullscreenButton.classList.toggle('is-active')

		toggleFullScreen()
	})
}

const fontSizeChanger = (modalBody) => {
	const fontSizeButtons = document.querySelectorAll('.js-modal-font-size')
	const fontSizeIncrement = 10
	const fontSizeMax = 150
	const fontSizeMin = 50

	fontSizeButtons.forEach((button) => {
		button.addEventListener('click', () => {
			let fontSize = Number(modalBody.dataset.fontSize)

			if (button.dataset.fontSizeAction === 'increase') {
				if (fontSize >= fontSizeMax) return
				fontSize += fontSizeIncrement
			}

			if (button.dataset.fontSizeAction === 'decrease') {
				if (fontSize <= fontSizeMin) return
				fontSize -= fontSizeIncrement
			}

			modalBody.dataset.fontSize = fontSize.toString()
			modalBody.setAttribute("style", `font-size: ${fontSize}%`)
		})
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

	textarea.addEventListener('input', () => {
		if (textarea.value.length > 140) {
			modalBody.setAttribute("style", `font-size: 80%`)
			message.dataset.visiblity = 'visible'

		} else {
			message.dataset.visiblity = 'hidden'

		}
	})

	btnScreen.addEventListener('click', () => {
		if (!textarea.value) return

		qrCodeButton.setAttribute("data-value", textarea.value)
		openModal(modalWindow, textarea.value)
	})

	btnClear.addEventListener('click', () => {
		clearTextarea(textarea)
	})

	onLoadFocus(textarea)
	modalHandler()
}