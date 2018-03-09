## 组合 VS 继承 Composition vs Inheritance

React拥有一个强大的组合模型，我们建议使用组合而不是继承以实现代码的重用

### 包含

一些组件在设计前无法获知自己要使用什么子组件，尤其在Sidebar和Dialog等通用容器中比较常见

我们建议这种组件使用特别的children prop来直接传递子元素到他们的输出中

