var express = require('express');
var router = express.Router();
const model = require('../models/index')
const paginate = require('express-paginate');

/* GET home page. */
router.get('/', paginate.middleware(10, 50), async function(req, res, next) {
    try {
      const locations = await model.patrol_locations.findAndCountAll({
        limit: req.query.limit,
        offset: req.skip
      });
  
      if(locations.count > 0 ){
        const total_data = locations.count;
        const total_page = Math.ceil(locations.count / req.query.limit);
        res.json({
          'status': 'OK',
          'messages': '',
          'data': locations.rows,
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
      const location = await model.patrol_locations.findOne({
        where: {
          location_id: req.params.id
        }
      });
      if (location) {
        res.json({
          'status': 'OK',
          'messages': '',
          'data': location
        })
      } else {
        res.status(400).json({
          'status': 'ERROR',
          'messages': 'Patrol Location not found',
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
      const check_location = await model.patrol_locations.findOne({
        where: {
          name: req.body.name
        }
      })
  
      if(check_location){
        return res.status(400).json({
          'status': 'ERROR',
          'messages': 'Location name already exist.',
          'data': {}
        })
      }
  
      if(req.body.name == null || req.body.name == undefined){
        return res.status(400).json({
          'status': 'ERROR',
          'messages': 'Name field cannot be blank',
          'data': {}
        })
      }

      if(req.body.qr_code == null || req.body.qr_code == undefined){
        return res.status(400).json({
          'status': 'ERROR',
          'messages': 'Something wrong when generate QR code, try again later.',
          'data': {}
        })
      }
  
      const location = await model.patrol_locations.create({
        name: req.body.name,
        qr_code: req.body.qr_code,
      });
      
      res.json({
        'status': 'OK',
        'messages': 'Add patrol location success',
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

  router.put('/:id', async function(req, res, next) {
    try {
      const update = await model.patrol_locations.findByPk(req.params.id);
  
      if(!update){
        return res.status(400).json({
          'status': 'ERROR',
          'messages': 'Location Not Found!',
          'data': {}
        })
      }
  
      await model.patrol_locations.update({
        name: req.body.name,
        qr_code: req.body.qr_code,
        status: req.body.status,
      },{
        where: {
          location_id: req.params.id
        },
      });
  
      const location = await model.patrol_locations.findOne({
        where: {
          location_id: req.params.id
        }
      })
      res.json({
        'status': 'OK',
        'messages': 'Update location success',
        'data': location
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {}
      })
    }
  });


  router.delete('/:id', async function(req, res, next) {
    try {
      const location = await model.patrol_locations.destroy({
        where: {
            location_id: req.params.id
        }
      });

      if(!location){
        return res.status(400).json({
            'status': 'ERROR',
            'messages': 'Location Not Found!',
            'data': {}
          })
      }

      res.send({
        'status': 'OK',
        'messages': 'Delete success',
        'data': {}
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {}
      })
    }
  });


module.exports = router;
