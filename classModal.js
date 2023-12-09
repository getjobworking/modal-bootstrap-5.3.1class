/**
 * Simple InfoModal class for creating and managing informational modals.
 * Version 1.1.2
 * Author: Get Job
 * Email: getjobworking@gmail.com
 *
 * @class
 * @constructor
 * @param {string} id - Unique identifier for the modal.
 * @param {object} [options={}] - Options for configuring the modal.
 */
class InfoModal {
	/**
	 * Creates an instance of InfoModal.
	 * @param {string} id - Unique identifier for the modal.
	 * @param {object} [options={}] - Options for configuring the modal.
	 */
	constructor(id, options = {}) {
		this.id = id;
		this.modalClone = this.createModal(id, options);
		this.autoCloseTimer = null;

		this.modalClone.addEventListener('hidden.bs.modal', () => {
			this.destroy();
		});

		this.modalClone.style.display = 'block';
		this.modalClone.style.visibility = 'visible';
		document.body.appendChild(this.modalClone);
		this.modal = new bootstrap.Modal(this.modalClone);
		this.show(options.info);
		this.setupButtons(options.buttons);
	}

	/**
	 * Creates the modal DOM structure based on the provided options.
	 * @param {string} id - Unique identifier for the modal.
	 * @param {object} options - Options for configuring the modal.
	 * @returns {HTMLElement} - The created modal element.
	 */
	createModal(id, options) {
		const modalElement = document.createElement('div');
		modalElement.className = 'modal fade';
		modalElement.tabIndex = '-1';
		modalElement.setAttribute('aria-labelledby', `${id}Label`);
		modalElement.setAttribute('aria-hidden', 'true');

		const modalDialog = document.createElement('div');
		modalDialog.className = 'modal-dialog';

		const modalContent = document.createElement('div');
		modalContent.className = 'modal-content';

		const modalHeader = document.createElement('div');
		modalHeader.className = 'modal-header';

		const modalTitle = document.createElement('h5');
		modalTitle.className = 'modal-title';
		modalTitle.textContent = options.title || 'Information Message';

		const closeButton = document.createElement('button');
		closeButton.type = 'button';
		closeButton.className = 'btn-close';
		closeButton.setAttribute('data-bs-dismiss', 'modal');
		closeButton.setAttribute('aria-label', 'Close');

		modalHeader.appendChild(modalTitle);
		modalHeader.appendChild(closeButton);

		const modalBody = document.createElement('div');
		modalBody.className = 'modal-body';

		const messageContainer = document.createElement('div');
		messageContainer.className = 'message';

		const textElement = document.createElement('div');
		textElement.className = 'text';
		textElement.innerHTML = options.info || '';

		messageContainer.appendChild(textElement);
		modalBody.appendChild(messageContainer);

		const modalFooter = document.createElement('div');
		modalFooter.className = 'modal-footer';

		modalContent.appendChild(modalHeader);
		modalContent.appendChild(modalBody);
		modalContent.appendChild(modalFooter);

		modalDialog.appendChild(modalContent);
		modalElement.appendChild(modalDialog);

		return modalElement;
	}


	/**
   * Adds buttons to the modal based on the provided configuration.
   * @param {array} buttons - An array of buttons.
   */
	setupButtons(buttons) {
		const buttonsContainer = this.modalClone.querySelector('.modal-footer');

		if (buttons && buttons.length > 0) {
			buttons.forEach(button => {
				const buttonElement = document.createElement('button');
				buttonElement.type = 'button';
				buttonElement.className = `btn ${button.className || 'btn-secondary'}`;
				buttonElement.textContent = button.label || 'Button';
				buttonElement.addEventListener('click', () => {
					if (button.callback && typeof button.callback === 'function') {
						button.callback();
					}
				});

				buttonsContainer.appendChild(buttonElement);
			});
		} else {
			// Domyślnie dodajemy jeden przycisk "Anuluj" (Cancel)
			const cancelButton = document.createElement('button');
			cancelButton.type = 'button';
			cancelButton.className = 'btn btn-primary';
			cancelButton.textContent = 'Anuluj';
			cancelButton.addEventListener('click', () => this.destroy());

			buttonsContainer.appendChild(cancelButton);
		}
	}

	/**
	 * Shows the modal with a new message.
	 * @param {string} message - The message to display in the modal.
	 */
	show(message) {
		const textElement = this.modalClone.querySelector('.text');
		textElement.innerHTML = message;
		this.modal.show();
	}

	/**
	 * Closes the modal.
	 */
	hide() {
		this.modal.hide();
		this.clearAutoCloseTimer();
	}

	/**
	 * Destroys the modal and removes it from the DOM.
	 */
	destroy() {
		this.modal.hide();
		this.modalClone.remove();
		this.clearAutoCloseTimer();
	}

	/**
	 * Sets up auto-closing of the modal after a specified interval.
	 * @param {number} interval - The time interval (in milliseconds) before auto-closing the modal.
	 */
	setupAutoClose(interval) {
		this.autoCloseTimer = setTimeout(() => {
			this.destroy();
		}, interval);
	}

	/**
	 * Clears the auto-close timer.
	 */
	clearAutoCloseTimer() {
		if (this.autoCloseTimer) {
			clearTimeout(this.autoCloseTimer);
			this.autoCloseTimer = null;
		}
	}
}

/**
 * Function to create an InfoModal and assign it to a global variable.
 * @param {string} id - Unique identifier for the modal.
 * @param {object} [options={}] - Options for configuring the modal.
 */
function ModalInfo(id, options = {}) {
	const infoModal = new InfoModal(id, options);

	// Create an object with a method to close the modal
	const modalObject = {
		close: () => {
			infoModal.destroy();
		}
	};

	// Assign the modal object to a global variable with the specified ID
	window[id] = modalObject;
}
