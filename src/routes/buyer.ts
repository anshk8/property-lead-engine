import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

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
    let body;

    try {
        body = await c.req.json()
    } catch (error) {
        return c.json({ error: 'Invalid JSON' }, 400)
    }

    const csv = [
        'minPrice,maxPrice,beds,baths',
        `${body.minPrice},${body.maxPrice},${body.beds},${body.baths}`,
    ].join('\n') + '\n'
    
    return c.body(csv, 200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="buyer-details.csv"',
    })
})


export default buyerRoute

