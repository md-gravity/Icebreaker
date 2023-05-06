import {initTRPC} from '@trpc/server'

import {type Context} from './library/context'

const tRPC = initTRPC.context<Context>().create()
const {router, procedure, middleware} = tRPC

type Router = ReturnType<typeof router>

export {router, procedure, middleware, type Router}
