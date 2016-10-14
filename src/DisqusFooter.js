const GitBook = require('gitbook-core');
const DisqusThread = require('react-disqus-thread');
const { React } = GitBook;

const DisqusFooter = React.createClass({
    propTypes: {
        page:          GitBook.Shapes.Page,
        shortName:     React.PropTypes.string.isRequired,
        useIdentifier: React.PropTypes.bool
    },

    render() {
        const { page, shortName } = this.props;
        const identifier = page.attributes.getIn(['disqus', 'identifier']);

        return (
            <GitBook.Panel>
                <DisqusThread
                    shortname={shortName}
                    title={page.title}
                    identifier={identifier}
                    url={(typeof window !== 'undefined') ? window.location.href : null}
                />
            </GitBook.Panel>
        );
    }
});

function mapStateToProps({ config, page }) {
    return {
        shortName: config.getIn(['pluginsConfig', 'disqus', 'shortName']),
        useIdentifier: config.getIn(['pluginsConfig', 'disqus', 'useIdentifier']),
        page
    };
}

module.exports = GitBook.connect(DisqusFooter, mapStateToProps);
