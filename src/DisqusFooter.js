const path = require('path');
const GitBook = require('gitbook-core');
const DisqusThread = require('react-disqus-thread');
const { React, Immutable } = GitBook;

/**
 * Footer for a page with disqus comment.
 * @type {[type]}
 */
const DisqusFooter = React.createClass({
    propTypes: {
        defaultIdentifier: React.PropTypes.string,
        page:              GitBook.PropTypes.Page,
        shortName:         React.PropTypes.string.isRequired,
        useIdentifier:     React.PropTypes.bool
    },

    render() {
        const { defaultIdentifier, page, shortName, useIdentifier } = this.props;

        // Get disqus config for this page
        const pageConfig = page.attributes.get('disqus', Immutable.Map());

        // Disqus is disabled for this page
        if (!shortName || pageConfig === false || pageConfig.get('enabled') === false) {
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

function mapStateToProps({ config, file, page, languages }) {
    const defaultIdentifier = languages.current ?
        path.join(languages.current, file.url) : file.url;
    const pluginConfig = config.getForPlugin('disqus');

    return {
        page,
        defaultIdentifier,
        shortName: pluginConfig.get('shortName'),
        useIdentifier: pluginConfig.get('useIdentifier')
    };
}

module.exports = GitBook.connect(DisqusFooter, mapStateToProps);
