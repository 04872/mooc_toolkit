export interface HookHandler<T> {
    init(ctx: T): void
    onload(ctx: T): void
}

export abstract class ToolkitModule<T> implements HookHandler<T> {
    static QUALITYS = [
        { key: '超高清' },
        { key: '高清' },
        { key: '标清' },
    ]
    // 视频清晰度按钮组
    static get DOM_QUALITY_LIST(): HTMLElement | null { return document.querySelector('.m-popover-quality > ul') }
    // 视频当前清晰度按钮
    static get DOM_QUALITY_BUTTONS(): HTMLElement[] {
        if (ToolkitModule.DOM_QUALITY_LIST && ToolkitModule.DOM_QUALITY_LIST.children) {
            const elements = Array.from(ToolkitModule.DOM_QUALITY_LIST.children)
            return (<HTMLElement[]>elements)
        }
        return []
    }
    // 模块名称
    abstract label: string;
    // 钩子函数
    abstract init(event: T): void;
    abstract onload(event: T): void;
    abstract enablePages: string[] = [];
    get handleCurrentPage(): boolean {
        let route: string = location.hash
        const queryIndex = route.indexOf('?')
        if (queryIndex > 0) route = route.substr(0, queryIndex)
        return this.enablePages.includes(route)
    }
}