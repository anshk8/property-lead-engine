import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import * as buyerController from '../controllers/buyer'

const saveDetailsSchema = z.object({
    minPrice: z.number().positive(),
    maxPrice: z.number().positive(),
    beds: z.number().int().min(0),
    baths: z.number().min(0),
}).refine((data) => data.maxPrice >= data.minPrice, {
    message: 'maxPrice must be greater than or equal to minPrice',
    path: ['maxPrice'],
})

const buyerRoute = new Hono()

buyerRoute.get('/', (c) => {
    return c.text('Hello Buyer!')
})

buyerRoute.post('/save_details', zValidator('json', saveDetailsSchema), async(c) => {
    return buyerController.saveDetails(c)
})


export default buyerRoute

