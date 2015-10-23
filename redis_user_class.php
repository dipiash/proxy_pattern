class RedisUserClass {
    private $redis = createRedisConnect();

    /**
     * Установить пользователя онлайн.
     *
     * @param $idUser
     */
    public function setUserOnline($idUser) {
        $this->redis->zAdd('user:online', time(), $idUser);
    }

    /**
     * Получить кол-во пользователей онлайн.
     *
     * @return int
     */
    public function getCountUsersOnline() {
        $count = $this->redis->zCount('user:online', time() - 10*60, time());

        return $count;
    }

    /**
     * Получить список пользователей онлайн.
     *
     * @return array
     */
    public function getIdUsersOnline() {
        $arrayUsers = $this->redis->zRangeByScore('user:online', time() - 10*60, time());

        return $arrayUsers;
    }

    /**
     * Очистить список пользователей, которые не активны более 10 минут.
     */
    public function removeOldUsersOnline() {
        $this->redis->zRemRangeByScore('user:online', -time(), time()- 10*60);
    }

}
