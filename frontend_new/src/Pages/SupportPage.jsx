import React from 'react';
import './CSS/SupportPage.css';

export const SupportPage = () => {
  return (
    <div className="support-container">
      <h1>Support Page</h1>
      <p>Welcome to our support page. How can we assist you today?</p>
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
      </div>
      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>If you couldn't find the answer to your question in our FAQ section, please feel free to contact us using the form below:</p>
      </div>
    </div>
  );
}
