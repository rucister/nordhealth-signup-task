import { signupHandlers } from './signup'
import { loginHandlers } from './login'
import { forgotHandlers } from './forgot'
import { logoutHandlers } from './logout'

export const handlers = [
  ...signupHandlers,
  ...loginHandlers,
  ...forgotHandlers,
  ...logoutHandlers
]