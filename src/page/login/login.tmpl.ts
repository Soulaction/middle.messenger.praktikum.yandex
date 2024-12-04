export default `
<main class="page-wrapper">
    <div class="form-authorization-wrapper">
        <h1 class="authorization-title">Вход</h1>
        <form class="authorization-form" name="login">
        <div class="input-wrapper">
            {{> Label for="login" label="Логин"}}
            {{> Input id="login" name="login" type="text" placeholder="Введите логин"}}
        </div>
        <div class="input-wrapper">
            {{> Label for="password" label="Пароль"}}
            {{> Input for="password" name="password" type="password" placeholder="Введите пароль"}}
            {{> ErrorMessage errorText="Неверный пароль"}}
        </div>
        <footer class="authorization-footer">
                {{> Button label="Войти" type="submit"}}
                {{> Link label="Нет аккаунта?"}}
        </footer>
        </form>
    </div>
</main>
`;
