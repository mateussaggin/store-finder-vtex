import { ALLOWED_METHODS } from '../../constants'

export async function validate(ctx: Context, next: () => Promise<any>) {
    if (!ALLOWED_METHODS.includes(ctx.method.toUpperCase())) {
        ctx.throw(405)
    }

    await next()
}  