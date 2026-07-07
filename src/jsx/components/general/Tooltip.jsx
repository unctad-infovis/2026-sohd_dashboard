import './Tooltip.css';

function Tooltip({ text, children }) {
  return (
    <span className="tooltip-wrapper">
      {children}
      <span className="tooltip-bubble" role="tooltip">{text}</span>
    </span>
  );
}

export default Tooltip;
