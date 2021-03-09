/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

Route.on('/').render('welcome')

Route.get('/signup', async ({ view }) => {
  return view.render('users/signup')
})
Route.get('/users', async ({ view }) => {
  const users = [
    {
      id: 1,
      email: 'Getting Started with AdonisJS',
      body: '',
    },
    {
      id: 2,
      email: 'Covering Basics of Lucid ORM',
      body: '',
    },
    {
      id: 3,
      email: 'Understanding Build Process',
      body: '',
    },
  ]

  return view.render('users/index', { users })
})
Route.post('/users', async ({ request, response }) => {
  const validatedUser = await request.validate(UserValidator)
  await User.create(validatedUser)
  response.redirect('/signin')
})

Route.get('/signin', async ({ view }) => {
  return view.render('users/signin')
})
Route.post('/signin', async ({ request, response, auth }) => {
  // const [email, password] = request.only(['email', 'password'])
  const { email, password } = request.all()

  console.log(email, password)
  await auth.attempt(email, password)
  response.redirect('/users')
})
