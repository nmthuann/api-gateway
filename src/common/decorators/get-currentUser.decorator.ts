// import { createParamDecorator, ExecutionContext, CACHE_MANAGER } from '@nestjs/common';

// export const GetCurrentUser = createParamDecorator(
//   async (key: string, context: ExecutionContext) => {
//     const cacheManager = context.switchToHttp().get(CACHE_MANAGER);
//     const data = await cacheManager.get(key);
//     return data;
//   },
// );