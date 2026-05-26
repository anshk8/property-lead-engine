import { Hono } from 'hono'
import buyerRoute from './routes/buyer'

const app = new Hono()


app.route('/buyer', buyerRoute)

export default app
