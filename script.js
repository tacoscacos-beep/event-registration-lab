// --- ЛАБОРАТОРНАЯ РАБОТА 5: REST API И HTTP ЗАПРОСЫ ---

const loadButton = document.getElementById('load-members-btn');
const communityStatus = document.getElementById('community-status');
const communityContainer = document.getElementById('community-cards-container');

// Привязываем событие клика на кнопку загрузки участников
if (loadButton) {
    loadButton.addEventListener('click', loadMembers);
}

// Асинхронная функция загрузки участников с публичного API
async function loadMembers() {
    communityStatus.textContent = "Loading community members...";
    loadButton.disabled = true;
    
    // Очищаем контейнер перед новым рендером, чтобы избежать дубликатов
    communityContainer.innerHTML = "";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        // Проверяем успешность HTTP-ответа
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = await response.json();
        
        // Берем только первых 5 пользователей, как требует задание
        renderCommunityUsers(users.slice(0, 5));
        
        communityStatus.textContent = ""; // Очищаем статус при успешной загрузке
    } catch (error) {
        console.error("Fetch error:", error);
        communityStatus.textContent = "Unable to load community members. Please try again.";
    } finally {
        // Всегда возвращаем кнопку в активное состояние
        loadButton.disabled = false;
    }
}

// Функция создания и отрисовки карточек пользователей через DOM-методы
function renderCommunityUsers(usersArray) {
    usersArray.forEach(user => {
        const card = document.createElement('div');
        card.className = 'event-card';

        const nameHeading = document.createElement('h3');
        nameHeading.textContent = user.name;

        const emailP = document.createElement('p');
        emailP.className = 'event-time';
        emailP.textContent = `📧 ${user.email}`;

        const cityP = document.createElement('p');
        cityP.textContent = `📍 City: ${user.address.city}`;

        const companyP = document.createElement('p');
        companyP.textContent = `💼 Company: ${user.company.name}`;

        card.appendChild(nameHeading);
        card.appendChild(emailP);
        card.appendChild(cityP);
        card.appendChild(companyP);

        communityContainer.appendChild(card);
    });
}


// --- ЛАБОРАТОРНАЯ РАБОТА 4: ОСНОВНОЙ ФУНКЦИОНАЛ ---

// Глобальные переменные для выбранного события, списка регистраций и уведомлений
let selectedEventName = '';
let registrations = JSON.parse(localStorage.getItem('registrations')) || [];

let notifications = JSON.parse(localStorage.getItem('notifications')) || [
    { text: "👋 Welcome! The platform has been successfully updated to version 1.1.", date: "Developer Update" }
];

// Инициализация страницы при загрузке (проверка темы и отрисовка данных из localStorage)
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        const themeBtn = document.querySelector('.theme-toggle-btn');
        if (themeBtn) themeBtn.textContent = '☀️';
    }
    renderRegistrations();
    renderNotifications();
});

// Функция переключения светлой и темной темы
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme', !isDark);
    const themeBtn = document.querySelector('.theme-toggle-btn');
    if (themeBtn) themeBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Открытие и закрытие выпадающего меню уведомлений
function toggleNotifications(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('notif-dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

// Закрытие выпадающего списка уведомлений при клике вне его области
window.addEventListener('click', (e) => {
    const dropdown = document.getElementById('notif-dropdown');
    const notifBtn = document.getElementById('notif-btn');
    if (dropdown && notifBtn && dropdown.style.display === 'block' && !dropdown.contains(e.target) && !notifBtn.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});

// Добавление нового системного уведомления
function addNotification(text) {
    notifications.unshift({ text, date: "Just now" });
    localStorage.setItem('notifications', JSON.stringify(notifications));
    renderNotifications();
}

// Очистка всех уведомлений
function clearNotifications() {
    notifications = [];
    localStorage.setItem('notifications', JSON.stringify(notifications));
    renderNotifications();
}

// Отрисовка списка уведомлений и бейджика непрочитанных
function renderNotifications() {
    const listEl = document.getElementById('notif-list');
    const badgeEl = document.getElementById('notif-badge');
    if (!listEl || !badgeEl) return;

    listEl.innerHTML = '';

    if (notifications.length === 0) {
        listEl.innerHTML = '<p class="no-notifs">No new notifications</p>';
        badgeEl.style.display = 'none';
        return;
    }

    badgeEl.style.display = 'inline-block';
    badgeEl.textContent = notifications.length;

    notifications.forEach(notif => {
        const div = document.createElement('div');
        div.className = 'notif-item';
        div.innerHTML = `<strong>${notif.date}</strong><br>${notif.text}`;
        listEl.appendChild(div);
    });
}

// Логика выбора карточки мероприятия (выделение только одной карточки)
function selectEvent(eventName, btnElement) {
    selectedEventName = eventName;
    const eventInput = document.getElementById('selected-event-input');
    if (eventInput) eventInput.value = eventName;
    
    document.querySelectorAll('.events-section .event-card').forEach(card => card.classList.remove('selected-event'));
    btnElement.closest('.event-card').classList.add('selected-event');
    
    const eventError = document.getElementById('event-error');
    if (eventError) eventError.textContent = '';
}

// Элементы формы
const nameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const groupInput = document.getElementById('student-group');
const agreementCheck = document.getElementById('agreement');

// Живые счетчики и валидация через вспомогательную функцию
function setupField(input, counterId, errorId, validator) {
    if (!input) return;
    const counter = document.getElementById(counterId);
    input.addEventListener('input', () => {
        if (counter) counter.textContent = `${input.value.length} characters`;
        if (validator(input.value.trim())) clearError(input, errorId);
    });
}

if (nameInput) setupField(nameInput, 'name-counter', 'name-error', val => val.length >= 3);
if (emailInput) setupField(emailInput, 'email-counter', 'email-error', val => val.includes('@') && val.includes('.'));
if (groupInput) setupField(groupInput, 'group-counter', 'group-error', val => val !== '');

// Обработка изменения состояния чекбокса согласия
if (agreementCheck) {
    agreementCheck.addEventListener('change', () => {
        if (agreementCheck.checked) {
            const agreementError = document.getElementById('agreement-error');
            if (agreementError) agreementError.textContent = '';
        }
    });
}

// Обработка отправки формы регистрации
const form = document.getElementById('registration-form');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameVal = nameInput ? nameInput.value.trim() : '';
        const emailVal = emailInput ? emailInput.value.trim() : '';
        const groupVal = groupInput ? groupInput.value.trim() : '';
        const eventInputEl = document.getElementById('selected-event-input');
        const eventVal = eventInputEl ? eventInputEl.value.trim() : '';
        const isAgreed = agreementCheck ? agreementCheck.checked : false;

        let isValid = true;

        if (nameVal.length < 3) {
            showError(nameInput, 'name-error', 'Name must be at least 3 characters.');
            isValid = false;
        }

        if (!emailVal.includes('@') || !emailVal.includes('.')) {
            showError(emailInput, 'email-error', 'Please enter a valid email.');
            isValid = false;
        }

        if (groupVal === '') {
            showError(groupInput, 'group-error', 'Group is required.');
            isValid = false;
        }

        const eventError = document.getElementById('event-error');
        if (eventVal === '') {
            if (eventError) eventError.textContent = 'Please select an event.';
            isValid = false;
        } else {
            if (eventError) eventError.textContent = '';
        }

        const agreementError = document.getElementById('agreement-error');
        if (!isAgreed) {
            if (agreementError) agreementError.textContent = 'You must agree to the rules.';
            isValid = false;
        } else {
            if (agreementError) agreementError.textContent = '';
        }

        // Если всё валидно — сохраняем данные и обновляем DOM без перезагрузки
        if (isValid) {
            registrations.push({ name: nameVal, email: emailVal, group: groupVal, event: eventVal });
            localStorage.setItem('registrations', JSON.stringify(registrations));
            renderRegistrations();

            addNotification(`🎉 Success! You are registered for "${eventVal}".`);

            form.reset();
            document.querySelectorAll('.counter-text').forEach(el => el.textContent = '0 characters');
            document.querySelectorAll('.events-section .event-card').forEach(card => card.classList.remove('selected-event'));
        }
    });
}

// Вспомогательные функции для показа и скрытия ошибок
function showError(input, errorId, msg) {
    if (!input) return;
    input.classList.add('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = msg;
}

function clearError(input, errorId) {
    if (!input) return;
    input.classList.remove('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = '';
}

// Динамическое создание элементов списка регистраций в DOM
function renderRegistrations() {
    const listElement = document.getElementById('registration-list');
    if (!listElement) return;

    listElement.innerHTML = '';

    if (registrations.length === 0) {
        listElement.innerHTML = '<p style="color: #6b7280; font-style: italic;">No registrations yet.</p>';
        return;
    }

    registrations.forEach((reg, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${reg.name}</strong> (${reg.group}) — <em>${reg.event}</em><br>
                <small style="color: #6b7280;">📧 ${reg.email}</small>
            </div>
            <button class="delete-btn" onclick="deleteRegistration(${index})">Cancel</button>
        `;
        listElement.appendChild(li);
    });
}

// Удаление отдельной регистрации из списка и localStorage
function deleteRegistration(index) {
    registrations.splice(index, 1);
    localStorage.setItem('registrations', JSON.stringify(registrations));
    renderRegistrations();
}