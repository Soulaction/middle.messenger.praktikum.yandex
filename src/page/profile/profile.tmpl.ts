export default `
<main class="page-profile">
    <div class="left-panel">
        <button class="left-panel-button"></button>
    </div>
    <div class="page-wrapper page-profile-content">
        <div class="user-avatar-wrapper">
            <img class="user-avatar" src="src/assets/images/profile.png" alt="Иконка профиля"/>
        </div>
        <h1 class="user-name">Дмитрий</h1>
        <div class="user-info">
            <div class="user-info-item">
                <span class="user-info-label user-info-text">Почта</span>
                <p class="user-info-description user-info-text">pochta@yandex.ru</p>
            </div>
            <div class="user-info-border"></div>
            <div class="user-info-item">
                <span class="user-info-label user-info-text">Логин</span>
                <p class="user-info-description user-info-text">dmitry</p>
            </div>
            <div class="user-info-border"></div>
            <div class="user-info-item">
                <span class="user-info-label user-info-text">Имя</span>
                <p class="user-info-description user-info-text">Иван</p>
            </div>
            <div class="user-info-border"></div>
            <div class="user-info-item">
                <span class="user-info-label user-info-text">Фамилия</span>
                <p class="user-info-description user-info-text">Иванов</p>
            </div>
            <div class="user-info-border"></div>
            <div class="user-info-item">
                <span class="user-info-label user-info-text">Имя в чате</span>
                <p class="user-info-description user-info-text">Дмитрий</p>
            </div>
            <div class="user-info-border"></div>
            <div class="user-info-item">
                <span class="user-info-label user-info-text">Телефон</span>
                <p class="user-info-description user-info-text">+7 (909) 967 30 30</p>
            </div>
            <footer class="user-info-footer">
            {{> Link label="Изменить данные"}}
            {{> Link label="Изменить пароль"}}
            {{> Link class="danger" label="Выйти"}}
            </footer>
        </div>
    </div>
</main>
`;