import {z} from 'zod'

const tokenOutput = z.string()

type TokenOutputInterface = z.infer<typeof tokenOutput>

export {type TokenOutputInterface, tokenOutput}
