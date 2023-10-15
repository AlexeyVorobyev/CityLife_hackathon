export interface ItemTree {
    title:string,
    items?:ItemTree[]
    callback?:Function
}

export const sideBarConfig:ItemTree[] = [
    {
        title: 'ЖКХ',
        items: [
            {
                title: 'Вода',
                items: [
                    {
                        title: 'Показатели',
                    },
                    {
                        title: 'Трубопровод',
                    },
                    {
                        title: 'История',
                    },
                    {
                        title: 'Обновления',
                    },
                    {
                        title: 'Энергия',
                    },
                    {
                        title: 'Газ',
                    },
                    {
                        title: 'Мусор',
                    },
                ]
            },
            {
                title: 'Энергия',
                items: [
                    {
                        title: 'Показатели',
                    },
                    {
                        title: 'ЛЭП',
                    },
                    {
                        title: 'История',
                    },
                    {
                        title: 'Обновления',
                    },
                ]
            },
            {
                title: 'Газ',
                items: [
                    {
                        title: 'Показатели',
                    },
                    {
                        title: 'Трубопровод',
                    },
                    {
                        title: 'История',
                    },
                    {
                        title: 'Обновления',
                    },
                ]
            },
            {
                title: 'Мусор',
                items: [
                    {
                        title: 'Показатели',
                    },
                    {
                        title: 'Маршрут',
                    },
                    {
                        title: 'История',
                    },
                    {
                        title: 'обновления',
                    },
                ]
            },
        ]
    },
    {
        title: 'Климат',
        items: [
            {
                title: 'Загрязнение',
            },
            {
                title: 'Температура',
            },
            {
                title: 'Облачность',
            },
            {
                title: 'Ветер',
            },
        ]
    },
    {
        title: 'Районы',
        items: [
            {
                title: 'Показатели',
            },
            {
                title: 'Население',
            },
            {
                title: 'Потребитель',
            },
        ]
    },
    {
        title: 'Рекомендации',
    },
]