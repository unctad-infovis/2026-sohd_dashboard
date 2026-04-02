import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import { InfoCircle, CalendarCheck } from 'react-bootstrap-icons';

function ReferenceDateContainer({
  className, children, setCustomDate
}) {
  return (
    <div style={{ padding: '16px', background: '#009EDB', color: '#fff' }}>
      <Alert key="info" variant="info">
        <InfoCircle size={20} className="me-2" />
        <strong>
          Select a reference date for analysis.
          If data for the chosen date is unavailable, the dashboard automatically displays the closest available prior date.
        </strong>
      </Alert>
      <div className={className} style={{ display: 'flex' }}>
        {/* Left Column for Preset Dates */}
        <div className="preset_dates_container">
          <div className="alert_instructions">Preset dates:</div>
          <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item onClick={() => setCustomDate('2019-01-01')}>
              <div className="d-flex align-items-center">
                <CalendarCheck size={20} className="me-2" />
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Beginning of pre-COVID year</div>
                  1 January 2019
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => setCustomDate('2020-03-11')}>
              <div className="d-flex align-items-center">
                <CalendarCheck size={20} className="me-2" />
                <div className="ms-2 me-auto">
                  <div className="fw-bold">WHO declares COVID 19 Pandemic</div>
                  11 March 2020
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => setCustomDate('2022-02-24')}>
              <div className="d-flex align-items-center">
                <CalendarCheck size={20} className="me-2" />
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Onset War in Ukraine</div>
                  24 February 2022
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => setCustomDate('2023-05-05')}>
              <div className="d-flex align-items-center">
                <CalendarCheck size={20} className="me-2" />
                <div className="ms-2 me-auto">
                  <div className="fw-bold">WHO declares end of COVID-19 pandemic</div>
                  5 May 2023
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => setCustomDate('2023-10-07')}>
              <div className="d-flex align-items-center">
                <CalendarCheck size={20} className="me-2" />
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Onset Israel-Palestine conflict</div>
                  7 October 2023
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => setCustomDate('2026-02-28')}>
              <div className="d-flex align-items-center">
                <CalendarCheck size={20} className="me-2" />
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Start of military escalation in the Middle East</div>
                  28 February 2026
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>

        {/* Right Column for Instructions and Calendar */}
        <div className="date_picker_container">
          <div className="alert_instructions">
            Custom date:
          </div>
          <div style={{ position: 'relative' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

ReferenceDateContainer.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  setCustomDate: PropTypes.func.isRequired,
};

export default ReferenceDateContainer;
