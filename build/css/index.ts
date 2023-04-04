import theme from '../../src/packages/theme/dark'
import { generateModifyVars } from '../generate/generateModifyVars';
export function configCss() {
    return {
        preprocessorOptions: {
            less: {
                // modifyVars:generateModifyVars(),
                modifyVars: {
                    ...theme,
                },
                javascriptEnabled: true,
            },
        }
    }
}
