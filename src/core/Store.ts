import { Config } from '../models/Config'

export interface Options {
    [propName: string]: any
}

export class Store {
    static getOptions(): Options {
        const options = localStorage.getItem('Chinese_Mooc_Toolkit_options')
        if (!options) return {}
        try {
            return JSON.parse(options) || {}
        } catch (err) {
            console.log(`[${Config.NAME}] 从本地读取配置失败: `, err)
            return {}
        }
    }
    static setOption(options: Options): void {
        localStorage.setItem('Chinese_Mooc_Toolkit_options', JSON.stringify(options))
    }
}
