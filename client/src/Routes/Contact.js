import React from "react";
import ContactForm from "../components/ContactForm";
import Slideshow from "../components/Slideshow";

export default function Contact() {
  return (
    <div className="page">
      <div className="container">
        <div className="column">
          <ContactForm />
        </div>
      </div>
      <Slideshow/>
    </div>
  );
}