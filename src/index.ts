import { Toolkit } from './core/Toolkit'
import { SheetsToolkitModule } from './models/SheetsToolkitModule'
import { PlayerToolkitModule } from './models/PlayerToolkitModule'

Toolkit.use(new SheetsToolkitModule())
Toolkit.use(new PlayerToolkitModule())

const _$Toolkit = new Toolkit()
// ⚠️ 单页面应用中 onload 仅触发一次, 这里手动监听页面跳转以触发 init 事件
window.addEventListener('DOMContentLoaded', () => _$Toolkit.emit('onload'))
window.addEventListener('hashchange', () => _$Toolkit.emit('init'))