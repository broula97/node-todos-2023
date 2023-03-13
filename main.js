import express from 'express'
import fs from 'fs/promises'

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

let todos = [
  {
    id: Math.random(),
    title: 'Nakoupit jídlo',
    done: false,
  },
  {
    id: Math.random(),
    title: 'Nakoupit pivo',
    done: true,
  },
]

app.get('/', (req, res) => {
  res.render('index', {
    todos: todos,
  })
})

app.post('/new-todo', (req, res) => {
  const newTodo = {
    id: Math.random(),
    title: req.body.title,
    done: false,
  }

  todos.push(newTodo)

  res.redirect('/')
})

app.get('/remove-todo/:id', (req, res) => {
  const idToRemove = Number(req.params.id)

  todos = todos.filter((todo) => todo.id !== idToRemove)

  res.redirect('/')
})

app.get('/toggle-todo/:id', (req, res) => {
  const idToToggle = Number(req.params.id)

  const todo = todos.find((todo) => todo.id === idToToggle)

  todo.done = !todo.done

  res.redirect('/')
})

app.get('/todo/:id', (req, res) => {
  const idTodo = Number(req.params.id)

  const todo = todos.find((todo) => todo.id === idTodo)
  const title = todo ? todo.title : '';

  res.render('todo', {
    todo: idTodo,
    title: title,
    id: idTodo
  })
})

app.get('/todo/status-todo/:id', (req, res) => {
  const idToStatus = Number(req.params.id)

  const todo = todos.find((todo) => todo.id === idToStatus)

  todo.done = !todo.done
  

  res.redirect('/')
})

app.get('/todo/remove-todo/:id', (req, res) => {
  const idToRemove = Number(req.params.id)

  todos = todos.filter((todo) => todo.id !== idToRemove)

  res.redirect('/')
})

app.get('/back', (req, res) => {

  res.redirect('/')
})

app.post('/todo/rename/:id', (req, res) => {
  const todoId = Number(req.params.id);
  const newTitle = String(req.body.newTitle);
  const todo = todos.find((todo) => todo.id === todoId);

  console.log(todoId)

  todo.title = newTitle;
  res.redirect('/');
})

app.listen(3000, () => {
  console.log('App listening on port 3000')
})
