var express = require('express');
var router = express.Router();
const model = require('../models/index')
const paginate = require('express-paginate');
const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

/* GET home page. */
router.get('/', paginate.middleware(10, 50), async function(req, res, next) {
    try {
      const patrols = await model.patrol.findAndCountAll({
        limit: req.query.limit,
        offset: req.skip,
        include: [
            {
                model: model.users,
                attributes: ['name', 'email', 'role']
            },
            {
                model: model.patrol_locations,
                attributes: ['name', 'qr_code', 'status']
            }
        ]
      });
  
      if(patrols.count > 0 ){
        const total_data = patrols.count;
        const total_page = Math.ceil(patrols.count / req.query.limit);
        res.json({
          'status': 'OK',
          'messages': '',
          'data': patrols.rows,
          total_page,
          total_data,
          pages: paginate.getArrayPages(req)(3, total_page, req.query.page)
        })
      } else {
        res.status(400).json({
          'status': 'ERROR',
          'messages': 'No Records',
          'data': {}
        })
      }
    } catch (err) {
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {}
      })
    }
  });

  router.get('/:id', async function(req, res, next) {
    try {
      const patrol = await model.patrol.findOne({
        where: {
          patrol_id: req.params.id
        },
        include: [
          {
            model: model.patrol_locations,
            attributes: ['name','qr_code','status']
          }
        ]
      });
      if (patrol) {
        res.json({
          'status': 'OK',
          'messages': '',
          'data': patrol
        })
      } else {
        res.status(400).json({
          'status': 'ERROR',
          'messages': 'Patrol Detail not found',
          'data': {}
        })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {}
      })
    }
  });

  router.post('/', async function(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];

      const check_location = await model.patrol_locations.findOne({
        where: {
          qr_code: req.body.qr_code
        }
      })
  
      if(!check_location){
        return res.status(400).json({
          'status': 'ERROR',
          'messages': 'Location not exist or location is inactive',
          'data': {}
        })
      }
      
      const verifyUser = jwt.verify(token, secret.APISecret);
      const check_user = await model.users.findByPk(verifyUser.user_id);
      
      if(!check_user){
        return res.status(400).json({
          'status': 'ERROR',
          'messages': 'User not exist or user is inactive',
          'data': {}
        })
      }

      
  
      const create_patrol = await model.patrol.create({
        user_id: check_user.user_id,
        scan_date: new Date(),
        location_id: check_location.location_id
      });
      
      res.json({
        'status': 'OK',
        'messages': `Successfully patroled by ${check_user.name} at ${new Date()}`,
        'data': {}
      })
  
    } catch (err) {
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {}
      })
    }
  });


module.exports = router;
