$(function () {
    // 整个代码的入口
    // new一个TodoList
    window.Todos = new App.Collections.TodoList();
    // 路由入口
    new App.Routers.Main();
    //页面加载期间，当应用已经创建了所有的路由，
    //需要调用 Backbone.history.start()，或
    //Backbone.history.start({pushState: true})
    //来确保驱动初始化 URL 的路由。
    Backbone.history.start({ pushState: true });
});
