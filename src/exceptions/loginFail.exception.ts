import { BaseException } from "../lib/exceptions/base.exception";

export class LoginFailException extends BaseException {
  constructor() {
    super(500, "Login fail");
  }
}
