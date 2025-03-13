import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetCurrentUser = createParamDecorator(async (key: string, context: ExecutionContext) => {
  const cacheManager = context.switchToHttp().getNext()
  const data = await cacheManager.get(key)
  return data
})
