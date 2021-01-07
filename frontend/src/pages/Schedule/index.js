/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import './styles.css'
import strapi from '../../services/strapi';

export default function Schedule() {
  const [events, setEvents] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [months, setMonths] = useState([]);

  useEffect(() => {
    strapi.get(`/months`).then(({ data }) => setMonths(data));
    strapi.get(`/events?month.id=${month}&date_gte=${year}-01-01&date_lte=${year}-12-31&_sort=date:asc`)
      .then(({ data }) => setEvents(data));
  }, []);

  async function handleClick(i) {
    let newMonth = month + i;
    if (newMonth === 0) {
      newMonth = 12;
      setYear(year - 1);
    } else if (newMonth === 13) {
      newMonth = 1;
      setYear(year + 1);
    }
    const {data} = await strapi.get(`/events?month.id=${newMonth}&date_gte=${year}-01-01&date_lte=${year}-12-31&_sort=date:asc`);
    setMonth(newMonth);
    setEvents(data);  
  }

  return (
    <div className="home-container" >
      <Container className="home-content" style={{ backgroundColor: '#fff', padding: 0 }}>
        <Row>
          <Col lg={12}>
            <div>
              <h4 className="title max-home">AGENDA MENSAL</h4>
              <div className="slt-buttons">
                <div>
                  <button onClick={() => handleClick(-1)} className="arrow-left">
                    <img src={require('../../assets/seta.svg')} height="20px" alt="" />
                  </button>
                </div>
                <div style={{ marginLeft: 10, marginRight: 10, backgroundColor: '#efefef', padding: '3px 15px', height: 34, display: 'flex', alignItems: 'center' }}>
                  {months.length > 0 ? `${months[month - 1].name} - ${year}` : ''}
                </div>
                <div>
                  <button onClick={() => handleClick(1)} className="arrow-right">
                    <img src={require('../../assets/seta.svg')} height="20px" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="home-content list-events">
          {
            events.map(event => (
              <Col xs={12} lg={6} xl={6} key={event.id}>
                <div className="events">
                  <div>
                    <p className="event-day">
                      {`0${new Date(event.date).getDate()}`.slice(-2)}
                    </p>
                  </div>
                  <div>
                    <h5 className="event-title">{event.title}</h5>
                    <p className="event-intro">{event.description}</p>
                  </div>
                </div>
              </Col>
            ))
            }
        </Row>
        <Row>
          <Col lg={12}>
            <div className="slt-buttons">
              <span>
                <button onClick={() => handleClick(-1)} className="arrow-left">
                  <img src={require('../../assets/seta.svg')} height="20px" alt="" />
                </button>
              </span>
              <span style={{ marginLeft: 10, marginRight: 10, backgroundColor: '#efefef', padding: '3px 15px', height: 34, display: 'flex', alignItems: 'center' }}>
                {months.length > 0 ? `${months[month - 1].name} - ${year}` : ''}
              </span>
              <span>
                <button onClick={() => handleClick(1)} className="arrow-right">
                  <img src={require('../../assets/seta.svg')} height="20px" alt="" />
                </button>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
