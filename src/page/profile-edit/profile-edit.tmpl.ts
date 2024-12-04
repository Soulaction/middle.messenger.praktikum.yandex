export default `
<main class="page-profile">
    <div class="left-panel">
        <button class="left-panel-button"></button>
    </div>
    <div class="page-wrapper page-profile-content">
        <div class="user-avatar-wrapper">
            <img class="user-avatar" src="/images/profile.png" alt="Иконка профиля"/>
        </div>
        <form class="user-info" name="edit-profile">
            <div class="user-info-item-edit">
                <label class="user-info-label user-info-label-edit user-info-text"
                       for="email">Почта</label>
                {{> Input id="email" class="right-placeholder" name="email" type="email" placeholder="Введите почтовый адрес"}}
            </div>
            <div class="user-info-item-edit">
                <label class="user-info-label user-info-label-edit user-info-text"
                       for="login">Логин</label>
                {{> Input id="login" class="right-placeholder" name="login" type="text" placeholder="Введите логин"}}
            </div>
            <div class="user-info-item-edit">
                <label class="user-info-label user-info-label-edit user-info-text"
                       for="first_name">Имя</label>
                {{> Input id="first_name" class="right-placeholder" name="first_name" type="text" placeholder="Введите имя"}}
            </div>
            <div class="user-info-item-edit">
                <label class="user-info-label user-info-label-edit user-info-text"
                       for="second_name">Фамилия</label>
                {{> Input id="second_name" class="right-placeholder" name="second_name" type="text" placeholder="Введите фамилию"}}
            </div>
            <div class="user-info-item-edit">
                <label class="user-info-label user-info-label-edit user-info-text" 
                       for="display_name">Имя в чате</label>
                {{> Input id="display_name" class="right-placeholder" name="display_name" type="text" placeholder="Введите имя в чате"}}
            </div>
            <div class="user-info-item-edit">
                <label class="user-info-label user-info-label-edit user-info-text" 
                       for="phone">Телефон</label>
                {{> Input id="phone" class="right-placeholder" name="phone" type="tel" placeholder="Введите номер телефона"}}
            </div>
            <footer class="user-edit-data-footer">
            {{> Button label="Сохранить"}}
            </footer>
        </form>
    </div>
</main>
`;