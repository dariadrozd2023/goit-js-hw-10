// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

iziToast.show({
  
    message: `✅ Fulfilled promise in ${delay}ms`
    
});
iziToast.show({
  
    message: `❌ Rejected promise in ${delay}ms`

    
});