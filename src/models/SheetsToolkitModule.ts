import { ToolkitModule } from '../core/ToolkitModule'
import { Toolkit } from '../core/Toolkit'

/**
 * 加入自定义样式
 */
export class SheetsToolkitModule extends ToolkitModule<Toolkit> {
    label: string = 'sheets'
    enablePages: string[] = ['#/learn/announce', '#/learn/content', '#/learn/content', '#/learn/examlist', '#/learn/forumindex', '#/learn/score', '#/learn/testlist', ]
    init(event: Toolkit): void {
        event.log('加入自定义样式')
        SheetsToolkitModule.appendSheets()
    }
    onload(event: Toolkit): void {}
    // 通过注入 css 实现隐藏广告并固定布局
    static appendSheets() {
        const sheet = document.createTextNode(SheetsToolkitModule._getSheets())
        const el = document.createElement('style')
        el.id = 'handle-sheets'
        el.appendChild(sheet)
        document.getElementsByTagName('head')[0].appendChild(el)
    }
    static _getSheets() {
        return `
                html {
                    --document-filter: grayscale(0); /* #html 防止网页被黑白处理, 适用于特殊日期 */
                }
                /* 外层全局样式 */
                html {
                    filter: var(--document-filter) !important;
                }
                /* 视频页样式 */
                .u-learnBCUI { width: 100%; }
                .u-learnBCUI .u-select { width: auto; }
                .up.j-up.f-thide { background-position: right center; }
                .up.j-up.f-thide::after {
                    content: '';
                    position: absolute;
                    top: 38%;
                    width: 0;
                    height: 0;
                    border: 4px solid transparent;
                    border-width: 6px 5px 0 5px;
                    border-top-color: #c6c6c6;
                    -webkit-transition: all .3s;
                    transition: all .3s;
                    cursor: pointer;
                }
                .down.f-bg.j-list { width: auto !important; }
                /* 推荐课程, 会在暂停播放是弹出 */
                .ux-modal.um-recommend-modal { display: none; }
            `
    }
}