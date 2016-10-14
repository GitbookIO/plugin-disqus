const GitBook = require('gitbook-core');
const DisqusThread = require('react-disqus-thread');
const { React, Immutable } = GitBook;

const DisqusFooter = React.createClass({
    propTypes: {
        page:          GitBook.Shapes.Page,
        shortName:     React.PropTypes.string.isRequired,
        useIdentifier: React.PropTypes.bool
    },

    render() {
        const { page, shortName, useIdentifier } = this.props;

        // Default identifier
        const defaultIdentifier = '';

        // Get disqus config for this page
        const pageConfig = page.attributes.get(['disqus'], Immutable.Map());

        // Disqus is disabled for this page
        if (pageConfig === false) {
            return null;
        }

        // Page frontmatter can define a custom identifier or use the default one
        const identifier = useIdentifier ?
            pageConfig.get('identifier', defaultIdentifier)
            : null;

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
