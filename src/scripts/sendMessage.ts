const messages = {
  name: "Please fill your name",
  email: "Please fill your email",
  message: "Please fill message",
  wrongEmail: "Invalid Email address",
} as const;

const escapeMarkdown = (text: string) => {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
};

const submitForm = (event: SubmitEvent) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const invalidFields: HTMLInputElement[] = [];

  if (!form) throw new Error("Element form not found");

  const inputs = form.querySelectorAll<HTMLInputElement>("[required]");
  inputs.forEach((input) => {
    input.classList.remove("contact__form-input_error");
    const errorElement = input.nextElementSibling;
    if (
      errorElement &&
      errorElement.className === "contact__form-error-message"
    )
      errorElement.remove();

    if (!input.checkValidity()) {
      invalidFields.push(input);
      input.classList.add("contact__form-input_error");

      const errorElement = document.createElement("span");
      errorElement.className = "contact__form-error-message";

      if (input.validity.valueMissing) {
        const name = input.name as keyof typeof messages;
        errorElement.textContent = messages[name];
      } else if (input.validity.typeMismatch && input.type === "email") {
        errorElement.textContent = messages.wrongEmail;
      }
      input.parentNode?.insertBefore(errorElement, input.nextSibling);
    }
  });

  if (invalidFields.length > 0) {
    invalidFields[0].focus();
  } else {
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData.entries());

    const token = "8498593670:AAEONv451HOH33H5dXKcuaoQhv_2VZ4R-04";
    const chatId = "7718762023";
    const text =
      `📩 *New message*\n\n` +
      `*From:* ${escapeMarkdown(formDataObject.name as string)}` +
      `\n*Email:* ${escapeMarkdown(formDataObject.email as string)}` +
      `${
        formDataObject.company
          ? `\n*Company:* ${escapeMarkdown(formDataObject.company as string)}`
          : ""
      }` +
      `\n\n*Message:*\n${escapeMarkdown(formDataObject.message as string)}`;

    form.style.opacity = ".5";
    fetch(
      `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
        text
      )}&parse_mode=MarkdownV2`
    )
      .then(() => {
        form.reset();
        const snackbar =
          form.parentNode?.parentNode?.querySelector(".snackbar");
        const closeButton = snackbar?.querySelector(".snackbar__close-button");
        const closeButtonFunc = () => {
          snackbar?.classList.remove("snackbar_active");
        };
        closeButton?.addEventListener("click", closeButtonFunc);
        snackbar?.classList.add("snackbar_active");

        setTimeout(() => {
          closeButtonFunc();
          closeButton?.removeEventListener("click", closeButtonFunc);
        }, 3000);
      })
      .catch((error) => alert("Ошибка: " + error))
      .finally(() => {
        form.style.opacity = "1";
      });

    return;
  }
};

export const sendMessage = () => {
  const form = document.querySelector<HTMLFormElement>(".contact__form");
  if (!form) throw new Error("Element contact__form not found");
  form.addEventListener("submit", submitForm);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          if (node.classList.contains("my-class")) {
            node.addEventListener("click", () => {
              console.log("Клик на новом элементе!");
            });
          }

          const nestedElements =
            node.querySelectorAll<HTMLFormElement>(".contact__form");
          nestedElements.forEach((el) => {
            el.addEventListener("submit", submitForm);
          });
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};
