import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'

const app = express()

const customLogger = (message: any) => {
  return console.log(`this is the message ${message}`)
}

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  customLogger(req.body)
  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'hello' })
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signIn)
export default app
