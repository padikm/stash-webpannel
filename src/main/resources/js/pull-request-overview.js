(function($) {
    // Set up our namespace
    window.MyCompany = window.MyCompany || {};
    MyCompany.TODO = MyCompany.TODO || {};

    // Deal with the nitty-gritty of localStorage
    function storageKey(pullRequest) {
        var repo = pullRequest.toRef.repository;
        var proj = repo.project;
        return 'mycompany.todo.pullrequest.' + proj.key + '/' + repo.slug + '/' + pullRequest.id;
    }
    var storage = window.localStorage ? {
        getTODOs : function(pullRequest) {
            localStorage.getItem(storageKey(pullRequest));
        },
        putTODOs : function(pullRequest, todos) {
            localStorage.setItem(storageKey(pullRequest), todos);
        }
    } : {
        getTODOs : function() {},
        putTODOs : function() {}
    };

    /**
     * The client-condition function takes in the context
     * before it is transformed by the client-context-provider.
     * If it returns a truthy value, the panel will be displayed.
     */
    function hasAnyTODOs(context) {
        var todos = storage.getTODOs(context['pull-request']);
        return todos && todos.length;
    }

    /**
     * The client-context-provider function takes in context and transforms
     * it to match the shape our template requires.
     */
    function getTODOStats(context) {
        var todos = storage.getTODOs(context['pull-request']) || [];
        return {
            count : todos.length
        };
    }

    /* Expose the client-condition function */
    MyCompany.TODO.hasAnyTODOs = hasAnyTODOs;

    /* Expose the client-context-provider function */
    MyCompany.TODO.getTODOStats = getTODOStats;

    /* use a live event to handle the link being clicked. */
    $(document).on('click', '.mycompany-todos-link', function(e) {
        e.preventDefault();

        console.log('TODO: open a dialog to show the TODO details.');
    });
}(AJS.$));
