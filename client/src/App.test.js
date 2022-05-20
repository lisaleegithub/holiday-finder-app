import { render, screen } from '@testing-library/react';
import App from './App';
import ContactForm from './components/ContactForm';
import TripForm from './components/TripForm';


// First Test
describe("App", () => {
  test("renders App component", () => {
    render(<App />);
  });
});

// Second Test
describe("ContactForm", () => {
  test("render the ContactForm component", () => {
    render(<ContactForm />);
  });
});

// Third Test
describe("TripForm", () => {
  test("render the TripForm component", () => {
    render(<TripForm />);
  });
});