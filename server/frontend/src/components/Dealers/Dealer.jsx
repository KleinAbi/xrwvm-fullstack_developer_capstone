import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from '../Header/Header';

const Dealer = () => {
    // Initialize state to null to handle loading state properly
    const [dealer, setDealer] = useState(null); 
    const [reviews, setReviews] = useState([]);
    const [unreviewed, setUnreviewed] = useState(false);
    const [postReview, setPostReview] = useState(<></>);

    const { id } = useParams();

    // Use relative paths, they are simpler and more robust
    const dealer_url = `/djangoapp/dealer/${id}`;
    const reviews_url = `/djangoapp/reviews/dealer/${id}`;
    const post_review = `/postreview/${id}`;

    const get_dealer = async () => {
        try {
            const res = await fetch(dealer_url, { method: "GET" });
            if (!res.ok) {
                console.error(`Failed to fetch dealer data: ${res.status}`);
                setDealer(null); // Set to null on failure to trigger loading message
                return;
            }
            const retobj = await res.json();
            
            // Check for a valid response
            if (retobj.status === 200 && retobj.dealer) {
                // If the dealer object is an array, take the first element
                if (Array.isArray(retobj.dealer) && retobj.dealer.length > 0) {
                    setDealer(retobj.dealer[0]);
                } else if (retobj.dealer) {
                    // If it's a single object, use it directly
                    setDealer(retobj.dealer);
                } else {
                    setDealer(null);
                }
            } else {
                console.error("API returned a non-200 status or no dealer data.");
                setDealer(null);
            }
        } catch (error) {
            console.error("Error fetching dealer data:", error);
            setDealer(null);
        }
    };

    const get_reviews = async () => {
        try {
            const res = await fetch(reviews_url, { method: "GET" });
            if (!res.ok) {
                console.error(`Failed to fetch reviews: ${res.status}`);
                setReviews([]); // Set to empty array on failure
                setUnreviewed(true);
                return;
            }
            const retobj = await res.json();

            if (retobj.status === 200) {
                if (Array.isArray(retobj.reviews) && retobj.reviews.length > 0) {
                    setReviews(retobj.reviews);
                } else {
                    setReviews([]);
                    setUnreviewed(true);
                }
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setReviews([]);
            setUnreviewed(true);
        }
    };

    const senti_icon = (sentiment) => {
        return sentiment === "positive" ? positive_icon : sentiment === "negative" ? negative_icon : neutral_icon;
    };

    useEffect(() => {
        get_dealer();
        get_reviews();
        if (sessionStorage.getItem("username")) {
            setPostReview(<a href={post_review}><img src={review_icon} style={{ width: '10%', marginLeft: '10px', marginTop: '10px' }} alt='Post Review' /></a>);
        }
    }, [id]);

    // THE GUARD CLAUSE: Prevents rendering before data is available
    if (!dealer) {
        return <div>Loading dealer details...</div>;
    }

    return (
        <div style={{ margin: "20px" }}>
            <Header />
            <div style={{ marginTop: "10px" }}>
                <h1 style={{ color: "grey" }}>{dealer.full_name}{postReview}</h1>
                <h4 style={{ color: "grey" }}>{dealer.city},{dealer.address}, Zip - {dealer.zip}, {dealer.state}</h4>
            </div>
            <div className="reviews_panel">
                {/* Conditional rendering for reviews */}
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className='review_panel'>
                            <img src={senti_icon(review.sentiment)} className="emotion_icon" alt='Sentiment' />
                            <div className='review'>{review.review}</div>
                            <div className="reviewer">{review.name} {review.car_make} {review.car_model} {review.car_year}</div>
                        </div>
                    ))
                ) : unreviewed ? (
                    <div>No reviews yet! </div>
                ) : (
                    <text>Loading Reviews....</text>
                )}
            </div>
        </div>
    );
};

export default Dealer;