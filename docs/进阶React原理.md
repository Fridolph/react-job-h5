## 核心原理

**虚拟DOM**

Diff算法

**声明周期**



**setState**

shouldComponentUpdate() 返回true才会往下执行
componentWillUpdate()  this.forceUpdate() 强行执行render()和componentDidUpdate()
render()
componentDidUpdate()

定制 shouldComponentUpdate(nextProps, nextState)


setState对状态的更新是异步的？

对本地的修改添加到一个队列中，队列机制，调用QueueUpdate队列方法更新state

render中执行setState会造成死循环