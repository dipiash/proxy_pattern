<?php
    class RedisUserClass {

        private $redis = createRedisConnect();

        /**
         * Mark the user online
         *
         * @param $idUser
         */
        public function setUserOnline($idUser) {
            $this->redis->zAdd('user:online', time(), $idUser);
        }

        /**
         * Get count of users online
         *
         * @return int
         */
        public function getCountUsersOnline() {
            $count = $this->redis->zCount('user:online', time() - 10*60, time());

            return $count;
        }

        /**
         * Get list of users online
         *
         * @return array
         */
        public function getIdUsersOnline() {
            $arrayUsers = $this->redis->zRangeByScore('user:online', time() - 10*60, time());

            return $arrayUsers;
        }

        /**
         * Clear users list, which are inactive for more than 10 minutes.
         */
        public function removeOldUsersOnline() {
            $this->redis->zRemRangeByScore('user:online', -time(), time()- 10*60);
        }

    }
