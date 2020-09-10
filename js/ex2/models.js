App.Models.Todo = Backbone.Model.extend({
    // 用于为模型指定默认属性
    // 可以为对象或者函数
    defaults: function () {
        return {
            title: 'empty todo...',
            order: Todos.nextOrder(), //order值
            done: false
        };
    },
    toggle: function () {
        // 切换是否done
        this.save({ done: !this.get('done') });
    }
});
