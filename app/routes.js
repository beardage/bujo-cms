'use strict'

var express = require('express')

var taskRoutes = express.Router()

var Task = require('./models/task')

// get all tasks in the db

taskRoutes.route('/all').get(function (req, res, next) {
  Task.find(function (err, tasks) {
    if (err) {
      return next(new Error(err))
    }

    res.json(tasks) // return all tasks
  })
})

// create a task item
taskRoutes.route('/add').post(function (req, res) {
  Task.create(
    {
      name: req.body.name,
      done: false
    },
    function (error, task) {
      if (error) {
        res.status(400).send('Unable to create task list')
      }
      res.status(200).json(task)
    }
  )
})

// delete a task item

taskRoutes.route('/delete/:id').get(function (req, res, next) {
  var id = req.params.id
  Task.findByIdAndRemove(id, function (err, task) {
    if (err) {
      return next(new Error('task was not found'))
    }
    res.json('Successfully removed')
  })
})

// perform update on task item

taskRoutes.route('/update/:id').post(function (req, res, next) {
  var id = req.params.id
  Task.findById(id, function (error, task) {
    if (error) {
      return next(new Error('task was not found'))
    } else {
      task.name = req.body.name
      task.done = req.body.done

      task.save({
        function (error, task) {
          if (error) {
            res.status(400).send('Unable to update task')
          } else {
            res.status(200).json(task)
          }
        }
      })
    }
  })
})

module.exports = taskRoutes
