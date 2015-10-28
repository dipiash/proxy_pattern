# Доклад по proxy design pattern (Proxy == Заместитель == Surrogate)

### Назначение
Это паттерн, который структурирует объекты. Это виртуальный(суррогатный) объект
 другого - настоящего объекта. Применение паттерна позволяет контролировать
 доступ к настоящему объекту.

### Диаграмма класов

![Proxy_patt.gif](/img/Proxy_patt.gif)

### Пояснения
1. Позволяет управлять доступом к объекту, т.е. можем отложить создание и
инициализацию до того момента, когда нам может действительно понадобить объект.
2. Затраты на самом деле могут быть велики, а требуется быстро открыть/
загрузить что-либо.
3. Значит необходимо избегать создание сложных объектов на стадии загрузки/
открытия
4. Решение заключается в том, что используется другой объект - заместитель.
Заместитель - ведет себя точно также, как и реальный объект, и при
необходимости создает/загружает реальный объект.

### Применение
- Удаленный заместитель
- Виртуальный заместитель
- Защищающий заместитель
- «Умная» ссылка

### Представленые примеры
1. [Удаленный заместитель](/index.js)
2. [Виртуальный заместитель](/img_load.js)
3. ["Умная" ссылка](/redis_user_class.php)
```
  /**
   * Очистить список пользователей, которые не активны более 10 минут.
   */
  public function removeOldUsersOnline() {
    $this->redis->zRemRangeByScore('user:online', - time(), time() - 10*60);
  }
```

### Дополнительные ссылки
1. [Lazy Loading (include point of proxy design pattern)](https://khousuylong.wordpress.com/2009/03/24/lazy-loading/)
2. [Gang of Four – Proxy Design Pattern](http://idiotechie.com/gang-of-four-proxy-design-pattern/)
3. [The Proxy Pattern in Ruby](http://www.fngtps.com/2006/the-proxy-pattern-in-ruby/)
4. [List: design-patterns-in-ruby](https://github.com/nslocum/design-patterns-in-ruby#proxy)
5. [The Proxy Pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#proxypatternjquery)
6. [Обзор механизмов сборки мусора](http://eax.me/garbage-collection/)

### Чтобы посмотреть 1 пример
1. npm install -g json-server --save-dev
2. json-server --watch db.json
