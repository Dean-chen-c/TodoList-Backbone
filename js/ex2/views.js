App.Views.TodoView = Backbone.View.extend({
    tagName: 'li', // template外层元素
    className: 'mo', // tagName class
    template: _.template($('#item-template').html()),
    events: {
        'click .toggle': 'toggleDone',
        'dblclick .view': 'edit',
        'click a.destroy': 'clear',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },
    initialize: function () {
        // change set 会触发change
        this.listenTo(this.model, 'change', this.render);
        // 从 DOM 中移除一个视图。
        this.listenTo(this.model, 'destroy', this.remove);

        this.input = this.$('.edit');
    },
    render: function () {
        // render 默认实现是没有操作的。 重载本函数可以实现从模型数据
        // 渲染视图模板，并可用新的 HTML 更新 this.el。 推荐的做法是
        // 在 render 函数的末尾 return this 以开启链式调用。

        // 返回一个模型的 attributes 浅拷贝副本的 JSON 字符串化形式。
        this.$el.html(this.template(this.model.toJSON()));
        // done改变触发render
        this.$el.toggleClass('done', this.model.get('done'));

        return this;
    },
    toggleDone: function () {
        // 点击input框
        this.model.toggle();
    },
    edit: function () {
        // 添加editing class
        this.$el.addClass('editing');
        this.input.focus();
    },
    close: function () {
        // 移除editing
        var value = this.input.val();
        // 无值直接删除
        if (!value) {
            this.clear();
        } else {
            //通过新的属性调用save 将立即触发一个"change"事件，一个
            //"request"事件作为Ajax请求开始到服务器， 并且当服务器
            //确认成功修改后立即触发 一个"sync"事件。 如果你想在模
            //型上等待服务器设置新的属性，请传递{ wait: true } 。
            this.model.save({ title: value });
            this.$el.removeClass('editing');
        }
    },
    updateOnEnter: function (e) {
        // 按enter编辑结束
        if (e.keyCode == 13) this.close();
    },
    clear: function () {
        // 删除数据模型
        this.model.destroy();
    }
});
App.Views.AppView = Backbone.View.extend({
    el: '#todoapp',
    events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-completed': 'clearCompleted',
        'click #toggle-all': 'toggleAllComplete'
    },
    template: _.template($('#stats-template').html()),

    initialize: function () {
        // INPUT
        this.input = this.$('#new-todo');
        this.list = this.$('#todo-list');
        //  ALL
        this.allCheckbox = this.$('#toggle-all')[0];
        // 绑定this
        // _.bindAll(this, 'addOne', 'addAll', 'render');

        // 集合监听
        // 向集合中增加一个模型
        this.listenTo(Todos, 'add', this.addOne);
        //将一个新的模型（或属性散列）列表替换集合
        this.listenTo(Todos, 'reset', this.addAll);
        // 任何事件的发生都会触发该回调函数
        this.listenTo(Todos, 'all', this.render);

        this.footer = this.$('footer');
        this.main = $('#main');
        //获取数据模型 localStorage里面数据
        Todos.fetch();
    },
    render: function (eventName) {
        // 打印触发的事件名
        console.log('app render', eventName);

        if (Todos.length) {
            this.main.show();
            this.footer.show();
            this.footer.html(
                this.template({ done: Todos.done().length, remaining: Todos.remaining().length })
            );
        } else {
            this.main.hide();
            this.footer.hide();
        }
        // 初始化checkall状态
        this.allCheckbox.checked = !Todos.remaining().length;

        return this;
    },
    addOne: function (todo) {
        // 这传给TodoView model
        var view = new App.Views.TodoView({ model: todo });
        this.list.append(view.render().el);
    },
    addAll: function () {
        Todos.each(this.addOne, this);
    },
    createOnEnter: function (e) {
        // input 框 enter
        if (e.keyCode != 13) return;
        if (!this.input.val()) return;

        Todos.create({ title: this.input.val() });
        this.input.val('');
    },
    clearCompleted: function () {
        // 在list的每个元素上执行methodName方法;
        _.invoke(Todos.done(), 'destroy');
        return false;
    },
    toggleAllComplete: function () {
        // 正反选
        var done = this.allCheckbox.checked;
        Todos.each(function (todo) {
            todo.save({ done: done });
        });
    }
});
