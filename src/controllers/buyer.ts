export const saveDetails = async (c: any) => {
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
}