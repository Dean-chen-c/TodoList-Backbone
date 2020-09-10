App.Routers.Main = Backbone.Router.extend({
    routes: {
        '': 'index',
        'teams': 'getTeam'
    },
    initialize: function () {
        //route的监听  可有可无？
        this.on('route', function (route, params) {
            this.route = route;
            this.params = params;
        });
    },
    index: function () {
        // 对应的route
        new App.Views.AppView();
        return {};
    }
});
