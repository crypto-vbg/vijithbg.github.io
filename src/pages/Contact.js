import React, { useState } from "react";
import styled from "styled-components";
import emailjs from "emailjs-com"; // Import emailjs

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f0f0f0;
  min-height: 80vh;
`;

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 2rem;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #3498db;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  resize: vertical;
  height: 150px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #3498db;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 1rem;
  margin-top: 1rem;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = () => {
    emailjs
      .send(
        "service_5dqfnwl", // Replace with your service ID
        "template_og66z1m", // Replace with your template ID
        formData,
        "5gV6eAoxpKm-XWgDz" // Replace with your user ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSuccess(true);
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log("FAILED...", error);
          setSuccess(false);
        }
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      sendEmail(); // Call the sendEmail function on successful validation
    } else {
      setSuccess(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <ContactContainer>
      <ContactTitle>Contact Me</ContactTitle>
      <ContactForm onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </FormField>

        <FormField>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </FormField>

        <FormField>
          <Label htmlFor="message">Message</Label>
          <TextArea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleInputChange}
          />
          {errors.message && <ErrorText>{errors.message}</ErrorText>}
        </FormField>

        <SubmitButton type="submit">Send Message</SubmitButton>
        {success && (
          <SuccessMessage>
            Your message has been sent successfully!
          </SuccessMessage>
        )}
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact;
