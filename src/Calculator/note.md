目前。两个 TemperatureInput 组件都将其值保存在本地状态中

但是，我们希望这两个输入是相互同步的。当我们更新摄氏温度输入时，华氏温度输入应反映转换后的温度，反之亦然。

在React中，共享State状态是通过将其移动到需要它的组件的最接近的共同祖先组件来实现的。
这被称为“状态提升 Lifting State Up”。我们将从TemperatureInput 中移除相关本地状态，并将其移动到Calculator

如果 Calculator 拥有共享状态，那么它将成为两个输入当前温度的“单一数据来源”。它可以指示他们具有彼此一致的值。由于两个 TemperatureInput 组件的 props 都来自同一个父级Calculator组件，两个输入将始终保持同步。

...

现在，无论你编辑哪个输入框，Calculator 中的 this.state.temperature 和 this.state.scale 都会更新。其中一个输入框获取值，所以任何用户输入都被保留，并且另一个输入总是基于它重新计算值。

让我们回顾一下编辑输入时会发生什么：

* React 调用在DOM `<input>`上的onChange 指定的函数，这是 TemperatureInput中的handleChange方法

* TemperatureInput组件中的handleChange方法使用新的期望值调用 this.props.onTemperatureChange()，TemperatureInput组件中的属性，包括 onTemperatureChange，由其父组件Calculator提供

* 当它预先呈现时，Calculator指定了 TemperatureInput的 onTemperatureChange 是 Calculator的 handleCelsiusChange 方法，并且华氏 TemperatureInput 的 onTemperatureChange 是 Calculator 的 handleFahrenheitChange 方法。因此，会根据我们编辑的输入框，分别调用这两个 Calculator 方法。

* 在这些方法中，Calculator组件要求React通过使用新的输入值和刚刚编辑的输入框的当前度量衡来调用this.setState()来重新渲染自身

* React调用 Calculator组件的render方法来了解UI外观应该是什么样子，基于当前温度和激活的度量衡来重新计算两个输入框的值，这里进行温度转换

* React使用Calculator指定新的Props属性调用各个TemperatureInput组件的render方法，它了解UI外观应该是什么样子

* ReactDOM更新DOM以匹配期望的输入值，我们刚编辑的输入框接受当前值，另一个输入框更新为转换后的温度

每个更新都会执行相同的步骤，以便输入保持同步

---

**经验总结**

在一个React应用中，对于任何可变的数据都应该遵循“单一数据源”原则。通常情况下，state首先被添加到它进行渲染的组件。
然后，如果其他的组件也需要它，你可以提升状态到它们最近的祖先组件。你应该依赖`从上到下的数据流向`，而不是试图在不同的组件中同步状态

提升状态相对于双向绑定方法需要写更多的“模板”代码。但是有一个好处，它可以更方便地找到和隔离bugs。
由于任何state状态都存货在若干的组件中，而且可以分别对其独立修改，所以发生错误的可能大大减少，另外，可实现任何定制的逻辑来拒绝或者转换用户输入

如果某个东西可以从props属性或者state状态得到，那么它可能不应该在state中。例如，我们只保存最后编辑的temperature和它的scale，而不是保存celsiusValue和fahrenheitValue
另一个输入框的值总是在render()方法中计算而来，这使我们对其进行清除和四舍五入到其他自字段同时不会丢失用户输入的精度。

当你看到 UI 中的错误，你可以使用 React 开发者工具来检查 props ，并向上遍历树，直到找到负责更新状态的组件。这使你可以跟踪到 bug 的源头