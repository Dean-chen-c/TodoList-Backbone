App.Collections.TodoList = Backbone.Collection.extend({
    // 集合中包含的模型类
    // 集合也可以包含多态模型，通过用构造函数重写这个属性，返回一个模型。 可以add, create,和 reset
    model: App.Models.Todo,
    // localStorage 存储数据
    localStorage: new Backbone.LocalStorage('todos-backbone'),
    // url: '/notes',
    done: function () {
        // 筛选已完成的
        return this.where({ done: true });
    },
    remaining: function () {
        // 筛选未完成的
        return this.where({ done: false });
    },
    nextOrder: function () {
        if (!this.length) return 1;
        // 获取集合中最后一个元素的order属性
        return this.last().get('order') + 1;
    },
    comparator: 'order'
});
