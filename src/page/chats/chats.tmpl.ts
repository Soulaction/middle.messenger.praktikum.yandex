export default `
<main class="page-chats-wrapper">
    <div class="left-panel-chat">
        <ul class="list-chat">
            {{#each chats}}
                {{> Chat  }}
            {{/each}}
        </ul>
    </div>
    <div class="chat">
        <div class="correspondence">
            В разработке 
        </div>
        <form class="send-msg-form" name="send-msg-form">
            <input class="send-msg-input" name="message" placeholder="Сообщение"/>
            <button class="button-row send-msg-submit" type="submit"></button>
        </form>
    </div>
</main>
`;
