import React from 'react';
import PropTypes from 'prop-types';

function CardIndicatorMini({
  items,
  activeSection,
  visible,
  onSelect,
}) {
  return (
    <nav
      className={`mobile-detail-menu${visible ? ' visible' : ''}`}
      aria-label="Indicator detail sections"
    >
      {items.map((item) => {
        const { Icon } = item;
        const isActive = activeSection === item.section;

        return (
          <button
            key={item.section}
            type="button"
            className={`mobile-detail-menu-button${isActive ? ' active' : ''}`}
            aria-label={`Show ${item.navLabel}`}
            aria-pressed={isActive}
            onClick={() => onSelect(item)}
          >
            <Icon />
          </button>
        );
      })}
    </nav>
  );
}

CardIndicatorMini.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    section: PropTypes.string.isRequired,
    navLabel: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
  })).isRequired,
  activeSection: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

CardIndicatorMini.defaultProps = {
  activeSection: null,
};

export default CardIndicatorMini;
