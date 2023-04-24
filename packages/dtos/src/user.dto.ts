import {z} from 'zod'

const userDto = z.object({
  email: z.string(),
  id: z.number(),
  temporal: z.boolean(),
  username: z.string(),
})

type UserDtoInterface = z.infer<typeof userDto>

export {type UserDtoInterface, userDto}
