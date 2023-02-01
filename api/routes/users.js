var express = require('express');
var router = express.Router();
const model = require('../models/index');
const paginate = require('express-paginate');
const bcrypt = require('bcrypt')
const jwtAuth = require('../middleware/jwtAuth')

/* GET users listing. */
router.get('/', paginate.middleware(10, 50), async function(req, res, next) {
  try {
    const users = await model.users.findAndCountAll({
      attributes: ['user_id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
      limit: req.query.limit,
      offset: req.skip,
    });

    if(users.count > 0 ){
      const total_data = users.count;
      const total_page = Math.ceil(users.count / req.query.limit);
      res.json({
        'status': 'OK',
        'messages': '',
        'data': users.rows,
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

router.post('/', async function(req, res, next) {
  try {
    const create = await model.users.findOne({
      where: {
        email: req.body.email
      }
    })

    if(create){
      return res.status(400).json({
        'status': 'ERROR',
        'messages': 'Email already registered.',
        'data': {}
      })
    }

    if(req.body.password == null || req.body.password == undefined){
      return res.status(400).json({
        'status': 'ERROR',
        'messages': 'Password cant be blank',
        'data': {}
      })
    }

    const hashPwd = bcrypt.hashSync(req.body.password, 10)

    const users = await model.users.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPwd,
      role: req.body.role
    });
    
    res.json({
      'status': 'OK',
      'messages': 'Add User Success',
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

router.get('/:id', async function(req, res, next) {
  try {
    const users = await model.users.findOne({
      attributes: ['user_id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
      where: {
        user_id: req.params.id
      }
    });
    if (users) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': users
      })
    } else {
      res.status(400).json({
        'status': 'ERROR',
        'messages': 'User not found',
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

router.put('/:id', async function(req, res, next) {
  try {
    const update = await model.users.findByPk(req.params.id);

    if(!update){
      return res.status(400).json({
        'status': 'ERROR',
        'messages': 'User Not Found!',
        'data': {}
      })
    }

    const updateUser = await model.users.update({
      name: req.body.name,
      email: req.body.email,
    },{
      where: {
        user_id: req.params.id
      },
    });

    const user = await model.users.findOne({
      attributes: ['user_id', 'email', 'name', 'createdAt', 'updatedAt'],
      where: {
        user_id: req.params.id
      }
    })
    res.send({
      'status': 'OK',
      'messages': 'Update user success',
      'data': user
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {}
    })
  }
})

router.delete('/:id', async function(req, res, next) {
  try {
    const users = await model.users.destroy({
      where: {
        user_id: req.params.id
      }
    });

    if(!users){
      return res.status(400).json({
          'status': 'ERROR',
          'messages': 'User Not Found!',
          'data': {}
        })
    }

    res.json({
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
