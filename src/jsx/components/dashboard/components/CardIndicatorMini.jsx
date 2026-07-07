function CardIndicatorMini({ items, activeSection = null, visible, onSelect }) {
  return (
    <nav className={`mobile-detail-menu${visible ? ' visible' : ''}`} aria-label="Indicator detail sections">
      {items.map(item => {
        const { Icon } = item;
        const isActive = activeSection === item.section;

        return (
          <button key={item.section} type="button" className={`mobile-detail-menu-button${isActive ? ' active' : ''}`} aria-label={`Show ${item.navLabel}`} aria-pressed={isActive} onClick={() => onSelect(item)}>
            <Icon />
          </button>
        );
      })}
    </nav>
  );
}

export default CardIndicatorMini;
