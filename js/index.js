class Dialog {
    constructor() {
      this.dialogElement = document.createElement('div');
      document.body.appendChild(this.dialogElement);
      this.dialogElement.style.display = 'none';
      this.dialogElement.style.position = 'absolute';
      this.dialogElement.style.top = '50%';
      this.dialogElement.style.left = '50%';
      this.dialogElement.style.transform = 'translate(-50%, -50%)';
      this.dialogElement.style.padding = '20px';
      this.dialogElement.style.border = '1px solid #ccc';
      this.dialogElement.style.background = '#fff';
      this.dialogElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    }

    show(message) {
      this.dialogElement.innerText = message;
      this.dialogElement.style.display = 'block';
    }

    hide() {
      this.dialogElement.style.display = 'none';
    }
  }

  class Alert extends Dialog {
    constructor() {
      super();
    }

    show(message) {
      super.show(message);
      setTimeout(() => {
        this.hide();
      }, 2000);
    }
  }

  class Prompt extends Dialog {
    constructor() {
      super();
    }

    show(message) {
      super.show(message);
      const input = document.createElement('input');
      input.type = 'text';
      this.dialogElement.appendChild(input);
      input.focus();
      return new Promise((resolve) => {
        input.addEventListener('change', () => {
          resolve(input.value);
          this.hide();
        });
      });
    }
  }

  class Confirm extends Dialog {
    constructor() {
      super();
    }

    show(message) {
      super.show(message);
      const confirmButton = document.createElement('button');
      confirmButton.innerText = 'OK';
      this.dialogElement.appendChild(confirmButton);
      confirmButton.addEventListener('click', () => {
        this.hide();
      });

      const cancelButton = document.createElement('button');
      cancelButton.innerText = 'Cancel';
      this.dialogElement.appendChild(cancelButton);
      cancelButton.addEventListener('click', () => {
        this.hide();
      });

      return new Promise((resolve) => {
        confirmButton.addEventListener('click', () => {
          resolve(true);
        });

        cancelButton.addEventListener('click', () => {
          resolve(false);
        });
      });
    }
  }

  // Пример использования

  const alertButton = document.createElement('button');
  alertButton.innerText = 'Show Alert';
  document.body.appendChild(alertButton);
  alertButton.addEventListener('click', async () => {
    const alert = new Alert();
    await alert.show('This is an alert!');
  });

  const promptButton = document.createElement('button');
  promptButton.innerText = 'Show Prompt';
  document.body.appendChild(promptButton);
  promptButton.addEventListener('click', async () => {
    const prompt = new Prompt();
    const result = await prompt.show('Enter something:');
    console.log('Prompt result:', result);
  });

  const confirmButton = document.createElement('button');
  confirmButton.innerText = 'Show Confirm';
  document.body.appendChild(confirmButton);
  confirmButton.addEventListener('click', async () => {
    const confirm = new Confirm();
    const result = await confirm.show('Are you sure?');
    console.log('Confirm result:', result);
  });