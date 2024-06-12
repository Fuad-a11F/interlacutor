import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot('7155766037:AAFytQyeXoInUfaZjfVEdnI_got1ievAGhw', { polling: true });

let users = []

const button = {
    reply_markup: {
        keyboard: [
            [{ text: "✅Создать мероприятие✅" }],
            [{ text: "💫Вступить в мероприятие💫" }],
            [{ text: "🤑Оплата подписки🤑" }],
            [{ text: "🗒️Инфо🗒️" }, { text: "🗒️Правила🗒️" }],
            [{ text: "⚙Настройки⚙" }],
            [{ text: "🆘Пожаловаться🆘" }],
        ],
    },
}

const start = () => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;

        if (msg.text === '/start') {
            if (users.some(item => item.id === chatId)) {
                bot.sendMessage(chatId, 'Спасибо за возвращение!')

                return
            } else {
                users.push({id: chatId, type: 'name'})
            }

            await bot.sendMessage(chatId, `
Привет✋, я Interlocutor🤝, ваш помощник по планированию мероприятий.
Я здесь, чтобы помочь вам организовать идеальное событие и найти классную компанию.👥👥👥👥
`)

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Чтобы я мог лучше помочь вам с планированием вашего мероприятия, давайте сначала зарегистрируемся. Это займет всего пару минут!🕧🕔')
            }, 4000)

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Как вас зовут?👤')
            }, 7000)

        }

        else {
            const type = users.find(item => item.id === chatId)?.type || null

            if (!type) {
                bot.sendMessage(chatId, `Команда не найдена или временно не работает!🥺🥺`)

                return
            } else if (type === 'end') {
                bot.sendMessage(chatId, `Команда не найдена или временно не работает!🥺🥺`)

                return
            }

            if (type === 'name') {
                users = users.map(item => {
                    if (item.id === chatId) {
                        item.name = msg.text
                        item.type = 'sex'
                    }

                    return item
                })

                bot.sendMessage(chatId, `
Вы:
1. Мужчина🤴
2. Женщина👸
                `)
            } else if (type === 'sex') {
                users = users.map(item => {
                    if (item.id === chatId) {
                        if (msg.text === '1') {
                            item.sex = 'Мужчина'
                        } else  if (msg.text === '2') {
                            item.sex = 'Женщина'
                        } else {
                            item.sex = msg.text
                        }
                        item.type = 'age'
                    }

                    return item
                })

                   bot.sendMessage(chatId, `Сколько вам лет?📅`)
            } else if (type === 'age') {
                users = users.map(item => {
                    if (item.id === chatId) {
                        item.sex = msg.text
                        item.type = 'end'
                    }

                    return item
                })

                const type = users.find(item => item.id === chatId)?.name || null

                bot.sendMessage(chatId, `Спасибо, ${type}, теперь вы зарегистрированы и можете создавать интересные мероприятия.`, button)
            }
        }
    })

    bot.on("callback_query", async (query) => {
        const chatId = query.message.chat.id;

    })
}

start();