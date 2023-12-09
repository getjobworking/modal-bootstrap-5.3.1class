/**
 * Simple InfoModal class for creating and managing informational modals.
 * Version 1.1.1
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
    this.modalElement = document.getElementById('infoModal');
    this.modalClone = this.modalElement.cloneNode(true);
    this.modalClone.id = id;
    this.modalClone.querySelector('.modal-title').textContent = options.title || 'Information Message';
    const textElement = this.modalClone.querySelector('.text');
    textElement.innerHTML = options.info || '';

    this.autoCloseTimer = null;

    if (options.autoCloseInterval) {
      this.setupAutoClose(options.autoCloseInterval);
    }
    
    this.setupButtons(options.buttons);
    
    if (options.icon) {
      const iconElement = document.createElement('div');
      iconElement.className = 'icon';
      iconElement.innerHTML = `<i class="${options.icon}"></i>`;
      this.modalClone.querySelector('.message').insertBefore(iconElement, textElement);
    }

    const primaryButton = this.modalClone.querySelector('.modal-footer button.btn-primary');
    if (primaryButton) {
      primaryButton.addEventListener('click', () => {
        this.close();
      });
    }

    this.modalClone.addEventListener('hidden.bs.modal', () => {
      this.destroy();
    });

    this.modalClone.style.display = 'block';
    this.modalClone.style.visibility = 'visible';
    document.body.appendChild(this.modalClone);
    this.modal = new bootstrap.Modal(this.modalClone);
    this.show(options.info);
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
      cancelButton.addEventListener('click', () => this.close());

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
  close() {
    this.modal.hide();
    this.clearAutoCloseTimer();
  }

  /**
   * Destroys the modal and removes it from the DOM.
   */
  destroy() {
    this.modalClone.remove();
    this.clearAutoCloseTimer();
  }

  /**
   * Sets up auto-closing of the modal after a specified interval.
   * @param {number} interval - The time interval (in milliseconds) before auto-closing the modal.
   */
  setupAutoClose(interval) {
    this.autoCloseTimer = setTimeout(() => {
      this.close();
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
      infoModal.close();
    }
  };

  // Assign the modal object to a global variable with the specified ID
  window[id] = modalObject;
}
