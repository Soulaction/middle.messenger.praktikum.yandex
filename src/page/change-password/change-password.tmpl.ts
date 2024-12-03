export default `
<main class="page-profile">
    <div class="left-panel">
        <button class="left-panel-button"></button>
    </div>
    <div class="page-wrapper page-profile-content">
        <div class="user-avatar-wrapper">
            <img class="user-avatar" src="src/assets/images/profile.png" alt="Иконка профиля"/>
        </div>
        <form class="user-info" name="edit-profile">
            <div class="user-info-item-edit">
                <label class="user-info-label user-info-label-edit user-info-text"
                       for="oldPassword">Старый пароль</label>
                {{> Input id="oldPassword" 
                          class="right-placeholder" 
                          name="oldPassword"
                          type="password"
                          placeholder="Введите старый пароль"}}
            </div>
            <div class="user-info-item-edit">
                <label class="user-info-label user-info-label-edit user-info-text"
                       for="newPassword">Новый пароль</label>
                {{> Input id="newPassword" 
                          class="right-placeholder" 
                          name="newPassword" 
                          type="password" 
                          placeholder="Введите новый пароль"}}
            </div>
            <div class="user-info-item-edit">
                <label class="user-info-label user-info-label-edit user-info-text"
                       for="newPasswordAgain">Повторите новый пароль</label>
                {{> Input id="newPasswordAgain" 
                          class="right-placeholder" 
                          name="newPasswordAgain" 
                          type="password" 
                          placeholder="Повторите пароль"}}
            </div>
            <footer class="user-edit-psw-footer">
                {{> Button label="Сохранить"}}
            </footer>
        </form>
    </div>
</main>
`;