/* eslint-disable camelcase */
const redis = require('redis');
const client = redis.createClient();
const { logger } = require('../../logger/logger');

class Redis {
  /**
     * @description function written to provide data to user in minimal time using caching
     * @param {*} a req valid request is expected
     * @param {*} res depends on the request of user
     * @param {*} if there is no data function calls for next function
     */
   redis_NOteById = (req, res, next) => {
     const noteId = req.params.id;
     client.get(noteId, (error, redis_data) => {
       if (error) {
         logger.error(error);
         throw error;
       } else if (redis_data) {
         logger.info('getLabels successfully retrieved');
         res.status(200).send({
           redis_NoteById: JSON.parse(redis_data),
           message: 'getlabels successfully retrieved',
           success: true
         });
       } else {
         next();
       }
     });
   }

   /**
    * @description function written to provide data to user in minimal time using caching
    * @param {*} a req valid request is expected
    * @param {*} res depends on the request of user
    * @param {*} if there is no data function calls for next function
    */

   redis_LabelById = (req, res, next) => {
     const labelId = req.params.id;
     client.get(labelId, (error, redis_data) => {
       if (error) {
         logger.error(error);
         throw error;
       } else if (redis_data) {
         logger.info('getLabels successfully retrieved');
         res.status(200).send({
           redis_LabelById: JSON.parse(redis_data),
           message: 'getLabels successfully retrieved',
           success: true
         });
       } else {
         next();
       }
     });
   }

   /**
    * @description setting data to key into redis
    * @param userId
    * @param data
    */

   setData = (key, time, redis_data) => {
     client.setex(key, time, redis_data);
   };

   /**
    * @description clearing cache
    */

   clearCache = (key) => {
     client.del(key, (err, res) => {
       if (err) {
         logger.error('cache not cleared');
       } else {
         console.log('Cache cleared');
         logger.info('Cache cleared');
       }
     });
   }
}

module.exports = new Redis();
