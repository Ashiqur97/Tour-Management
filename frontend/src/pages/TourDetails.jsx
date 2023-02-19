import React,{useRef,useState} from 'react'
import '../styles/tour-details.css';
import {useParams} from 'react-router-dom'
import tourData from '../assets/data/tours'
import { Container,Row,Col, ListGroup,Form } from 'reactstrap';
import calculateAvgRating from './../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter'

const TourDetails = () => {
  const {id} = useParams()
  const reviewMsgRef = useRef('')
  const [tourRating,setTourRating]=useState(null)

  const tour = tourData.find(tour=> tour.id === id)

  const {photo,title,desc,price,reviews,address,city,distance,maxGroupSize} = tour;

  const {totalRating,avgRating} = calculateAvgRating(reviews)

  const options = {day: "numeric", month: "long", year: "numeric"};

  const submitHandler = e=>{
    e.preventDefault()
    const reviewText = reviewMsgRef.current.value;

    alert(`${reviewText}, ${tourRating}`);

  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
                <div className='tour__content'>
                  <img src={photo} alt="" />

                  <div className="tour__info">
                    <h2>{title}</h2>

                    <div className='d-flex align-items-center gap-5'>

            <span className='tour__rating d-flex align-items-center gap-1'>
            <i class="ri-star-line" style={{color: "var(--secondary-color)"}}></i> 
            {avgRating === 0 ? null : avgRating} 
            {totalRating === 0 ? 
            ('Not rated')
            : ( 
            <span>({reviews?.length})</span>

            )}
            </span>

            <span>
              <i class="ri-map-pin-fill"></i> {address}
            </span>
                    </div>

                    <div className='tour__extra-details'>
                    <span><i class="ri-map-pin-2-line"></i>{city}</span>
                      <span><i class="ri-money-dollar-circle-line"></i>${price} /per person</span>
                      <span><i class="ri-map-pin-time-line"></i>{distance} k/m</span>
                      <span><i class="ri-group-line"></i>{maxGroupSize}</span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>
                  <div className='tour__reviews mt-4'>
                      <h4>Reviews ({reviews?.length} reviews)</h4>

                      <Form onSubmit={submitHandler}>
                        <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                            <span onClick={() => setTourRating(1)}><i class="ri-star-half-fill"></i></span>
                            <span onClick={() => setTourRating(2)}><i class="ri-star-half-fill"></i></span>
                            <span onClick={() => setTourRating(3)}><i class="ri-star-half-fill"></i></span>
                            <span onClick={() => setTourRating(4)}><i class="ri-star-half-fill"></i></span>
                        </div>

                        <div className='review__input'>
                          <input type="text" 
                          ref={reviewMsgRef} 
                          required
                          placeholder='share your thoughts' />

                          <button className='btn primary__btn text-white' type='submit'>
                            Submit
                          </button>
                        </div>
                      </Form>

                      <ListGroup className='user__reviews'>
                          {
                            reviews?.map(review=>(
                              <div className='review__item'>
                                <img src={avatar} alt="" />
                                <div className='w-100'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                      <div>
                                        <h5>muhib</h5>
                                        <p>
                                          {new Date ("01-18-2023").toLocaleDateString(
                                            "en-US", options
                                          )}
                                        </p>
                                      </div>
                                      <span className='d-flex align-items-center'>
                                        <i class="ri-star-s-fill"></i>
                                      </span>
                                    </div>

                                    <h6>Amazing tour</h6>
                                </div>
                              </div>
                            ))
                          }
                      </ListGroup>
                  </div>
                </div>
            </Col>

            <Col lg='4'>
                <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default TourDetails
