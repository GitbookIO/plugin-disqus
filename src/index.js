const GitBook = require('gitbook-core');
const DisqusFooter = require('./DisqusFooter');

module.exports = GitBook.createPlugin({
    activate: (dispatch, getState, { Components }) => {
        dispatch(Components.registerComponent(DisqusFooter, { role: 'page:footer' }));
    }
});
