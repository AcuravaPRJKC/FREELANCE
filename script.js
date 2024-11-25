// Firebase SDK: Подключение необходимых модулей
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlP0Zp94TEy-ueM3Mg1R9c79fL_dUq0k4",
    authDomain: "freelance-1e3b3.firebaseapp.com",
    projectId: "freelance-1e3b3",
    storageBucket: "freelance-1e3b3.firebasestorage.app",
    messagingSenderId: "700770747092",
    appId: "1:700770747092:web:d8880c19dcae42ffd6f141",
    measurementId: "G-GD4PN89P0C"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Регистрация пользователя
document.getElementById("register-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("Регистрация прошла успешно!");
    } catch (error) {
        alert(`Ошибка при регистрации: ${error.message}`);
    }
});

// Вход пользователя
document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Вы успешно вошли!");
        loadProfiles(); // Загрузка профилей после входа
    } catch (error) {
        alert(`Ошибка при входе: ${error.message}`);
    }
});

// Выход пользователя
document.getElementById("logout-button")?.addEventListener("click", async () => {
    try {
        await signOut(auth);
        alert("Вы успешно вышли из системы.");
    } catch (error) {
        alert(`Ошибка при выходе: ${error.message}`);
    }
});

// Создание профиля
document.getElementById("profile-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("profile-name").value;
    const services = document.getElementById("profile-services").value;
    const portfolio = document.getElementById("profile-portfolio").value;

    try {
        if (!auth.currentUser) {
            alert("Сначала войдите в систему!");
            return;
        }
        await addDoc(collection(db, "profiles"), {
            name: name,
            services: services,
            portfolio: portfolio,
            userId: auth.currentUser.uid,
        });
        alert("Профиль успешно создан!");
        loadProfiles();
    } catch (error) {
        alert(`Ошибка при создании профиля: ${error.message}`);
    }
});

// Загрузка всех профилей
async function loadProfiles() {
    const profilesContainer = document.getElementById("profiles-container");
    profilesContainer.innerHTML = ""; // Очистка контейнера

    try {
        const querySnapshot = await getDocs(collection(db, "profiles"));
        querySnapshot.forEach((doc) => {
            const profile = doc.data();
            profilesContainer.innerHTML += `
                <div class="profile">
                    <h3>${profile.name}</h3>
                    <p><strong>Услуги:</strong> ${profile.services}</p>
                    <p><strong>Портфолио:</strong> ${profile.portfolio}</p>
                </div>
            `;
        });
    } catch (error) {
        alert(`Ошибка при загрузке профилей: ${error.message}`);
    }
}

// Слушатель изменений состояния авторизации
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadProfiles(); // Загружаем профили при входе пользователя
    } else {
        console.log("Пользователь вышел из системы или не вошел.");
    }
});

