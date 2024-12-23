import React, { useState, useRef, useEffect } from 'react';
import '../styles/tour-details.css';
import tourData from '../assets/data/tours';
import { useParams } from 'react-router-dom';
import { Col, Container, Form, ListGroup, Row } from 'reactstrap';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = () => {
      const foundTour = tourData.find(tour => tour.id === id);
      setTour(foundTour);
      setLoading(false);
    };
    fetchTour();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tour) {
    return <div>Tour not found</div>;
  }

  const { photo, title, desc, price, reviews, address, city, distance, maxGroupSize } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const submitHandler = e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    // Handle form submission
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">
              <img src={photo} alt={title} />
              <h2>{title}</h2>
              <p>{desc}</p>
              <div className="tour__info">
                <span>{address}</span>
                <span>{city}</span>
                <span>{distance} km</span>
                <span>{maxGroupSize} people</span>
                <span>${price}</span>
                <span>{totalRating} ({avgRating})</span>
              </div>
              <Form onSubmit={submitHandler}>
                <textarea ref={reviewMsgRef} placeholder="Write a review"></textarea>
                <button type="submit" className="primary__btn">Submit</button>
              </Form>
             
              <ListGroup className="review__container">
                {reviews.map((review, index) => (
                  <li key={index} className="review__item">
                    <img src={avatar} alt="avatar" />
                    <p>{review.text}</p>
                  </li>
                ))}
              </ListGroup>
            </div>
          </Col>
          <Col lg="4">
            <Booking tour={tour} />
          </Col>
        </Row>
        <Newsletter />
      </Container>
    </section>
  );
};

export default TourDetails;