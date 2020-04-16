import { ToolkitModule, HookHandler } from "./ToolkitModule"

export class Toolkit {
    debug = true
    options = {}
    quality: Element | undefined // 当前清晰度
    highestQuality: Element | undefined // 最高清晰度
    /**
     * 工具集
     */
    static modules: ToolkitModule<Toolkit>[] = []
    constructor(options = {}) {
        Object.assign(this.options, options)
        this.emit('init')
    }
    /**
     * 注册工具模块
     */
    static use(moduleItem: ToolkitModule<Toolkit>) {
        Array.isArray(moduleItem) ? moduleItem.map(item => Toolkit.use(item)) : Toolkit.modules.push(moduleItem)
    }
    emit(evtName: keyof HookHandler<Toolkit>): void {
        console.log(evtName)
        for (const module of Toolkit.modules) {
            if (module.handleCurrentPage) {
                this.log(`🚗 emit event: [${evtName}] with module<${module.label}>`)
                module[evtName](this)
            }
        }
    }
    // /**
    //  * 触发钩子函数
    //  * @param {string}} hook 钩子函数名
    //  */
    // emitHook(hook: string) {
    //     Toolkit.modules.forEach(module => {
    //         const page = Page.currentPage
    //         // 未知页面不处理
    //         if (!page) return
    //         // 如果当前模块不包含在当前页面的可使用模块列表中, 就忽略这个模块
    //         if (Array.isArray(page.enableModules) && !page.enableModules.includes(module.constructor)) {
    //             // this.log('⚠️ disabled module', module.constructor && module.constructor.name)
    //             return
    //         }
    //         // this.log('🚗 enable module: ', module.constructor && module.constructor.name)
    //         if (Reflect.has(module, hook) && typeof module[hook] === 'function')
    //         // return Reflect.has(module, hook) &&
    //         //     typeof module[hook] === 'function' &&
    //         //     module[hook](this)
    //     })
    // }
    log(...args: any) {
        console.log('%c[Chinese_Mooc_Toolkit] LOG: ', 'color:teal', ...args)
    }
    static delay(timeout = 200) {
        return new Promise(resolve => setTimeout(resolve, timeout))
    }
}