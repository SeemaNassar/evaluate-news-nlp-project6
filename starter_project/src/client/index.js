import { handleSubmit, initForm } from './js/formHandler';

alert("I EXIST");

// ensure event listeners are added only after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initForm();
});

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

export { handleSubmit };
