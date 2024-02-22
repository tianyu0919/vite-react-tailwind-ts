/*
 * @Author: 卢天宇
 * @Date: 2023-12-11 21:31:33
 * @Description:
 */
class Subject {
  observers: HTMLElement[]
  resizeObserver: ResizeObserver
  callback?: (dom: HTMLElement) => void

  constructor() {
    this.observers = []

    // * 创建观察者
    this.resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        // 执行宽高变化后的操作
        if (this.callback && typeof this.callback === 'function') {
          this.callback(entry.target as HTMLElement)
        }
      })
    })
  }

  // * 添加观察者
  subscribe(observer: HTMLElement) {
    console.log('添加观察者了')
    if (observer && this.observers.indexOf(observer) > -1) return
    this.observers.push(observer)
    this.resizeObserver.observe(observer)
    console.log(this.observers)
  }

  // * 移除观察者
  unsubscribe(observer: HTMLElement) {
    const idx = this.observers.indexOf(observer)
    if (observer && idx > -1) {
      this.observers.splice(idx, 1)
      this.resizeObserver.unobserve(observer)
    }
  }
}

export default new Subject()
