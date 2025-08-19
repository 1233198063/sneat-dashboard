import React from 'react';
import Card from '../../components/ui/Card/Card';
import Button from '../../components/ui/Button/Button';
import FixedButtons from '../../components/ui/FixedButtons/FixedButtons';
import './BasicCards.less';

const BasicCards = () => {
  return (
    <div className="basic-cards-page">
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">Basic Cards</h1>
            <p className="page-subtitle">Display content in organized, visually appealing card layouts</p>
          </div>
        </div>
      </div>

      <div className="cards-grid">
        {/* First Row - Three Cards */}

        {/* Influencer Card */}
        <Card className="influencer-card">
          <div className="card-image-top">
            <div className="image-placeholder blue-gradient" aria-hidden="true"></div>
          </div>
          <div className="card-content">
            <h3>Influencing The Influencer</h3>
            <p>
              Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state
              tourism minister predicts Cancun will draw as many visitors in 2006 as it did two years ago.
            </p>
          </div>
        </Card>

        {/* Profile Card */}
        <Card className="profile-card">
          <div className="profile-background">
            <div className="image-placeholder purple-gradient" aria-hidden="true"></div>
          </div>
          <div className="profile-content">
            <div className="profile-avatar">
              <div className="avatar-circle" aria-hidden="true">RM</div>
            </div>
            <h3>Robert Meyer</h3>
            <p className="location">London, UK</p>
            <Button variant="primary" size="small" className="send-request-btn">
              SEND REQUEST
            </Button>
            <div className="mutual-friends">
              <span className="friends-count">18 mutual friends</span>
              <div className="friends-avatars" aria-hidden="true">
                <div className="friend-avatar">A</div>
                <div className="friend-avatar">B</div>
                <div className="friend-avatar">C</div>
                <span className="more-count">+4</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Internet Usage Card */}
        <Card className="internet-card">
          <div className="card-image-top">
            <div className="image-placeholder light-blue-gradient">
              <span className="paper-boat" aria-hidden="true">📋</span>
            </div>
          </div>
          <div className="card-content">
            <h3>Popular Uses Of The Internet</h3>
            <p>Although cards can support multiple actions, UI controls, and an overflow menu.</p>
            <details className="details-dropdown">
              <summary>DETAILS</summary>
              <div className="details-content">
                <p>More detailed information about internet usage statistics and trends.</p>
              </div>
            </details>
          </div>
        </Card>

        {/* Second Row - Two Cards */}

        {/* iPhone Product Card */}
        <Card className="product-card iphone-card">
          <div className="product-layout">
            <div className="product-image">
              <div className="image-placeholder phone-bg" aria-hidden="true">📱</div>
            </div>
            <div className="product-details">
              <h3>Apple iPhone 11 Pro</h3>
              <p>
                Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features 5.8" display, Apple A13 Bionic
              </p>
              <div className="product-price">
                Price: <strong>$899</strong>
              </div>
              <div className="product-actions">
                <Button variant="outline" size="small" className="add-cart-btn">
                  🛒 ADD TO CART
                </Button>
                <button className="share-btn" type="button" aria-label="Share product">
                  ⚪
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stumptown Business Card */}
        <Card className="business-card stumptown-card">
          <div className="stumptown-layout">
            <div className="business-content">
              <div className="business-header">
                <h3>Stumptown Roasters</h3>
                <div className="rating">
                  <div className="stars" aria-hidden="true">⭐⭐⭐⭐⭐</div>
                  <span className="rating-text">5 Star | 98 reviews</span>
                </div>
              </div>
              <p className="business-description">
                Clock clock clock, pink background and a clock.
                Clock clock clock, pink background and a clock.
                Clock clock clock, pink background and a clock.
              </p>
              <div className="business-actions">
                <Button variant="outline" size="small">LOCATION</Button>
                <Button variant="outline" size="small">REVIEWS</Button>
              </div>
            </div>
            <div className="business-image">
              <div className="image-placeholder coffee-gradient">
                <span className="clock-icon" aria-hidden="true">⏰</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <FixedButtons />
    </div>
  );
};

export default BasicCards;
