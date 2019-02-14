Приложение TODO-list для хранения списка задач.

1. Выводить список задач
2. Создавать, редактировать и удалять созданные задачи
3. Менять задачам статус (Open (default), In progress, Done)
4. Менять приоритет задач (Low, Minor, Major, High)
5. Данные по всем задачам хранить в localStorage
6. Список возможных статусов, приоритетов и дефолтных задач хранить не в отдельном js-файле, а получать посредством AJAX-запроса к файлу data.json
7. По нажатию на определенную кнопку, отправлять все созданные задачи в формате JSON по некоторому пути (эндпоинту)

P.S.: 
Для запуска приложения необходимо сделать (in terminal):
1. git init + git clone https://github.com/Yaroslav2019/todolist.git
2. Run npm install
3. Run babel src/ -d dist/
