// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate = null; // Оголошуємо змінну для збереження обраної дати
let timerInterval = null; // Зберігає ідентифікатор інтервалу для таймера

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('body > button'),
  timerDisplay: document.querySelector('.timer'),
};

refs.startBtn.addEventListener('click', startTimer);

refs.startBtn.disabled = false; // Кнопка активна

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,

  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; // Зберігаємо обрану дату у змінну

    const now = new Date(); // Поточна дата
    if (userSelectedDate < now) {
      // Перевіряємо, чи обрана дата в минулому
      window.alert('Please choose a date in the future'); // Показуємо повідомлення
      refs.startBtn.disabled = true; // Робимо кнопку неактивною
    } else {
      refs.startBtn.disabled = false; // Якщо дата в майбутньому, кнопка активна
    }
  },
});

function startTimer() {
  if (!userSelectedDate) return; // Якщо користувач не обрав дату, не починати таймер

  const now = new Date().getTime(); // Отримуємо поточну дату та час

  const targetDate = userSelectedDate.getTime(); // Отримуємо вказану користувачем дату та час

  let remainingTime = targetDate - now;

  if (timerInterval) clearInterval(timerInterval); // Якщо таймер вже запущено, зупиняємо його

  timerInterval = setInterval(() => {
    // Оновлюємо інтерфейс таймера кожну секунду
    refs.input.disabled = true;
    refs.startBtn.disabled = true;
    remainingTime -= 1000;

    if (remainingTime <= 0) {
      // Перевіряємо, чи таймер дійшов до кінцевої дати
      clearInterval(timerInterval); // Зупиняємо таймер
      refs.timerDisplay.textContent = '00:00:00:00';
      refs.input.disabled = false;
      refs.startBtn.disabled = false;
      return;
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Форматуємо та відображаємо час у форматі xx:xx:xx:xx
    refs.timerDisplay.textContent = `${formatTime(days)}:${formatTime(
      hours
    )}:${formatTime(minutes)}:${formatTime(seconds)}`;
  }, 1000);
}
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
