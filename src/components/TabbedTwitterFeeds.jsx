import React from 'react';
import PropTypes from 'prop-types';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

class TabbedTwitterFeeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };

    // This binding is necessary to make 'this' work in the callback
    this.updateActiveIndex = this.updateActiveIndex.bind(this);
  }

  updateActiveIndex(index) {
    this.setState({ activeIndex: index });
  }

  indexIsActive(index) {
    const { activeIndex } = this.state;

    return activeIndex === index;
  }

  activeButtonClass(index) {
    if (this.indexIsActive(index)) {
      return 'active';
    }
    return '';
  }

  ariaSelected(index) {
    if (this.indexIsActive(index)) {
      return 'true';
    }
    return 'false';
  }

  render() {
    const { feeds } = this.props;
    return (
      <div>
        <div className="graphTabs">
          {
            feeds.map((feed, i) => (
              <button
                type="button"
                role="tab"
                className={this.activeButtonClass(i)}
                aria-selected={this.ariaSelected(i)}
                key={JSON.stringify(feed.label)}
                onClick={() => this.updateActiveIndex(i)}
              >
                { feed.label }
              </button>
            ))
          }
        </div>
        <div aria-live="polite">
          {
            feeds.filter((feed, i) => (this.indexIsActive(i))).map(feed => (
              <TwitterTimelineEmbed
                sourceType="profile"
                key={feed.feedId}
                screenName={feed.feedId}
                options={{
                  chrome: 'noheader nofooter',
                  width: 600,
                  height: 600,
                }}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

TabbedTwitterFeeds.propTypes = {
  feeds: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};


export default TabbedTwitterFeeds;