# Report on the proxy design pattern

### Purpose
This is a pattern that structures objects. It's a virtual (surrogate) object for another - the real object. Using this pattern allows controlling access to the real object.

### Explanations
1. Allows controlling access to an object, i.e., we can delay its creation and initialization until the moment we might really need the object.
2. The costs might actually be high, but there's a need to quickly open/load something.
3. This means it's necessary to avoid creating complex objects during the loading/opening phase.
4. The solution is to use another object - a proxy. The proxy behaves exactly like the real object and, if necessary, creates/loads the real object.

### Application
- Remote proxy
- Virtual proxy
- Protective proxy
- "Smart" reference

### Presented examples
1. [Remote proxy](/index.js)
2. [Virtual proxy](/img_load.js)
3. ["Smart" reference](/redis_user_class.php)
   ```
   /**
    * Clear the list of users who have been inactive for more than 10 minutes.
    **/
   public function removeOldUsersOnline() {
     $this->redis->zRemRangeByScore('user:online', - time(), time() - 1060);
   }
   ```

### Additional links
1. [Lazy Loading (include point of proxy design pattern)](https://khousuylong.wordpress.com/2009/03/24/lazy-loading/)
2. [Gang of Four – Proxy Design Pattern](http://idiotechie.com/gang-of-four-proxy-design-pattern/)
3. [The Proxy Pattern in Ruby](http://www.fngtps.com/2006/the-proxy-pattern-in-ruby/)
4. [List: design-patterns-in-ruby](https://github.com/nslocum/design-patterns-in-ruby#proxy)
5. [The Proxy Pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#proxypatternjquery)
6. [Overview of garbage collection mechanisms](http://eax.me/garbage-collection/)

### To view the 1st example
1. npm install -g json-server --save-dev
2. json-server --watch db.json
