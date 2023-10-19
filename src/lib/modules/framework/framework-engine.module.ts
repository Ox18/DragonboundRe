import { Framework } from "./framework.module";

export const frameworkEngine = (framework: Framework): void => {
  framework.app.set('view engine', 'ejs')
}