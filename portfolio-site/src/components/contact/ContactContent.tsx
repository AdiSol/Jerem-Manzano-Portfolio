'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../styles/mixins';

const ContactSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 160px);
  background-color: ${props => props.theme.colors.background};
  
  
  ${mediaQueries.md} {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const ContactInfo = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  ${mediaQueries.lg} {
    padding: 3rem;
  }
  
  ${mediaQueries.md} {
    padding: 3rem 2rem;
  }
  
  ${mediaQueries.sm} {
    padding: 2rem 1.5rem;
  }
`;

const ContactTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  
  ${mediaQueries.lg} {
    font-size: 3rem;
  }
  
  ${mediaQueries.md} {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  ${mediaQueries.sm} {
    font-size: 2rem;
  }
`;

const ContactSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  opacity: 0.8;
  max-width: 500px;
  line-height: 1.6;
  
  ${mediaQueries.sm} {
    font-size: 1rem;
  }
`;

const FormContainer = styled.div`
  padding: 5rem;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  ${mediaQueries.lg} {
    padding: 3rem;
  }
  
  ${mediaQueries.md} {
    padding: 1rem 2rem 3rem;
  }
  
  ${mediaQueries.sm} {
    padding: 0.5rem 1.5rem 2rem;
  }
`;

const ContactForm = styled.form.attrs({
    action: 'https://api.web3forms.com/submit',
    method: 'POST'
  })`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 500px;
    
    ${mediaQueries.sm} {
      gap: 1rem;
    }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  padding: 1rem;
  background-color: #1e1e24;
  border: 1px solid #2c2c34;
  border-radius: 4px;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  background-color: #1e1e24;
  border: 1px solid #2c2c34;
  border-radius: 4px;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 1rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
  }
  
  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background-color: rgba(0, 128, 0, 0.1);
  border: 1px solid green;
  border-radius: 4px;
  color: #00c853;
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid red;
  border-radius: 4px;
  color: #ff5252;
  margin-top: 1rem;
`;

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactContent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const accessKey = 'ec9d7a60-b89a-4416-874f-e8962266dc49';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: accessKey,
                name: formData.name,
                email: formData.email,
                message: formData.message,
                subject: `New contact from ${formData.name} via Jerem Portfolio`,
            }),
        });
        const result = await response.json();
        if (result.success) {
              setFormData({
                name: '',
                email: '',
                message: ''
              });
            setStatus('success');
        }

        // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };
  
  const isFormValid = formData.name && formData.email && formData.message;
  
  return (
    <ContactSection>
      <ContactInfo>
        <ContactTitle>Let's talk business</ContactTitle>
        <ContactSubtitle>
          Now that you know a lot about me, let me know if you are interested to work with me.
        </ContactSubtitle>
      </ContactInfo>
      
      <FormContainer>
        <ContactForm onSubmit={handleSubmit}>
        <input type="hidden" name="access_key" value={accessKey} />
        <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <SubmitButton 
            type="submit" 
            disabled={!isFormValid || status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Let\'s get started'}
          </SubmitButton>
          
          {status === 'success' && (
            <SuccessMessage>
              Your message has been sent successfully! I'll get back to you soon.
            </SuccessMessage>
          )}
          
          {status === 'error' && (
            <ErrorMessage>
              There was an error sending your message. Please try again later.
            </ErrorMessage>
          )}
        </ContactForm>
      </FormContainer>
    </ContactSection>
  );
};

export default ContactContent;