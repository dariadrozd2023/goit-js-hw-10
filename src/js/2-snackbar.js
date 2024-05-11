// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.js-input'),
  stateRadios: document.querySelectorAll('.js-state-radio'),
  submitBTN: document.querySelector('.js-submit'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event){
    event.preventDefault();

    const delay = parseInt(refs.input.value);
    const state = getState(); 


    const promise =new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
        
    });
     promise
    .then(delay => {
        // Успішне виконання промісу
        iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
        });
    })
    .catch(delay => {
        // Відхилення промісу
        iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
        });
    });
}
function getState() {
    for (const radio of refs.stateRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
}
