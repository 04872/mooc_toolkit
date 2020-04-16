import { ToolkitModule } from '../core/ToolkitModule'
import { Toolkit } from '../core/Toolkit'

/**
 * 处理视频播放器
 */
export class PlayerToolkitModule extends ToolkitModule<Toolkit> {
    label: string = 'player'
    enablePages: string[] = ['#/learn/content']
    onload(event: Toolkit): void {}
    init(ctx: Toolkit) {
        ctx.log('⚙ 开始修改视频清晰度')
        this._fixedQuality(ctx)
    }
    async _fixedQuality(ctx: Toolkit) {
        for (let times = 40; times--;) {
            const qualityBtnList = ToolkitModule.DOM_QUALITY_LIST
            await Toolkit.delay(300)
            if (!qualityBtnList) continue
            if (qualityBtnList.children.length === 1) break // 仅有一个清晰度时不作处理
            let _highestQualityBtn = null // 最高清晰度
            // 寻找最高清晰度
            const qualityButtons = Array.from(ToolkitModule.DOM_QUALITY_BUTTONS)
            for (const q of ToolkitModule.QUALITYS) {
                for (const d of qualityButtons) {
                    if (d.innerHTML === q.key) {
                        _highestQualityBtn = d
                        break
                    }
                }
                if (_highestQualityBtn) break
            }
            // 切换到最高清晰度, ⚠️ 这里需要多次调用 click(), 实测一次可能不会成功
            if (_highestQualityBtn) {
                ctx.quality = qualityButtons.find(d => d.classList.contains('z-sel'))
                ctx.highestQuality = _highestQualityBtn
                _highestQualityBtn.click()
                if (ctx.quality === ctx.highestQuality) {
                    ctx.log('⚙ 修改视频清晰度成功')
                    break
                } else {
                    ctx.log('⚙ 修改视频清晰度ing ...')
                }
            }
        }
    }
}