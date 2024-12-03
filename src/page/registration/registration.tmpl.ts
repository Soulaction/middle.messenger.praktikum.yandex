export default `
<main class="page-wrapper">
    <div class="form-authorization-wrapper">
        <h1 class="authorization-title">Регистрация</h1>
        <form class="authorization-form" name="registration">
        <div class="input-wrapper">
            {{> Label for="email" label="Почта"}}
            {{> Input for="id" name="email" type="email" placeholder="Введите почтовый адрес"}}
        </div>
        <div class="input-wrapper">
            {{> Label for="login" label="Логин"}}
            {{> Input id="login" name="login" type="text" placeholder="Введите логин"}}
        </div>
         <div class="input-wrapper">
            {{> Label for="first_name" label="Имя"}}
            {{> Input id="first_name" name="first_name" type="text" placeholder="Введите имя"}}
        </div>
        <div class="input-wrapper">
            {{> Label for="second_name" label="Фамилия"}}
            {{> Input for="second_name" name="second_name" type="text" placeholder="Введите фамилию"}}
        </div>
         <div class="input-wrapper">
            {{> Label for="phone" label="Телефон"}}
            {{> Input id="phone" name="phone" type="tel" placeholder="Введите номер телефона"}}
        </div>
        <div class="input-wrapper">
            {{> Label for="password" label="Пароль"}}
            {{> Input id="password" name="password" type="password" placeholder="Введите пароль"}}
        </div>        
        <div class="input-wrapper">
            {{> Label for="password_again" label="Пароль (ещё раз)"}}
            {{> Input for="password_again" name="password_again" type="password" placeholder="Повторите пароль"}}
            {{> ErrorMessage errorText="Пароли не совпадают"}}
        </div>
        <footer class="authorization-footer">
                {{> Button label="Зарегестрироваться"}}
                {{> Link label="Войти"}}
        </footer>
        </form>
    </div>
</main>
`;