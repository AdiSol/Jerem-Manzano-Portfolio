'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../styles/mixins';
import DOMPurify from 'dompurify';

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

interface InputProps {
    $hasError?: boolean;
}

const Input = styled.input<InputProps>`
  padding: 1rem;
  background-color: #1e1e24;
  border: 1px solid ${props => props.$hasError ? '#ff5252' : '#2c2c34'};
  border-radius: 4px;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ff5252' : props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea<InputProps>`
  padding: 1rem;
  background-color: #1e1e24;
  border: 1px solid ${props => props.$hasError ? '#ff5252' : '#2c2c34'};
  border-radius: 4px;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ff5252' : props.theme.colors.primary};
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

const FieldError = styled.div`
  font-size: 0.85rem;
  color: #ff5252;
  margin-top: 0.25rem;
`;

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactContent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [submitTime, setSubmitTime] = useState<number | null>(null);

    const accessKey = 'ec9d7a60-b89a-4416-874f-e8962266dc49';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined
        }));
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    const validateEmail = (email: string): boolean => {
        // RFC 5322 compliant email regex
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
      };
      
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;
        
        // Validate name
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
          isValid = false;
        } else if (formData.name.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
          isValid = false;
        }
        
        // Validate email
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!validateEmail(formData.email.trim())) {
          newErrors.email = 'Please enter a valid email address';
          isValid = false;
        }
        
        // Validate message
        if (!formData.message.trim()) {
          newErrors.message = 'Message is required';
          isValid = false;
        } else if (formData.message.trim().length < 10) {
          newErrors.message = 'Message must be at least 10 characters';
          isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };
      
    const sanitizeData = (data: FormData): FormData => {
        return {
          name: DOMPurify.sanitize(data.name.trim()),
          email: DOMPurify.sanitize(data.email.trim().toLowerCase()),
          message: DOMPurify.sanitize(data.message.trim())
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Record submit time for anti-spam timing check
        const currentTime = Date.now();
        const timeSincePageLoad = submitTime ? currentTime - submitTime : null;
        
        // If form was submitted too quickly (less than 3 seconds), likely a bot
        if (submitTime === null) {
          setSubmitTime(currentTime);
        } else if (timeSincePageLoad && timeSincePageLoad < 3000) {
          console.log('Form submitted too quickly, likely a bot');
          setStatus('error');
          return;
        }
        
        // Validate form
        if (!validateForm()) {
          return;
        }
        
        // Sanitize data
        const sanitizedData = sanitizeData(formData);
        
        setStatus('loading');
        
        try {
          // Add a timestamp to request body for rate limiting and analysis
          const requestBody = {
            access_key: accessKey,
            name: sanitizedData.name,
            email: sanitizedData.email,
            message: sanitizedData.message,
            subject: `New contact from ${sanitizedData.name} via Portfolio`,
            timestamp: new Date().toISOString(),
            from_page: window.location.href
          };
          
          // Log submission attempt (without sensitive data) for debugging
          console.log('Submitting form...', { 
            time: new Date().toISOString(),
            page: window.location.href
          });
          
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });
          
          const result = await response.json();
          
          if (result.success) {
            // Clear form and set success state
            setFormData({
              name: '',
              email: '',
              message: ''
            });
            setStatus('success');
            
            // Reset success message after 5 seconds
            setTimeout(() => {
              setStatus('idle');
            }, 5000);
          } else {
            console.error('Error submitting form:', result);
            setStatus('error');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          setStatus('error');
        }
      };
      
      const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        // Validate fields on blur for immediate feedback
        if (name === 'name' && !value.trim()) {
          setErrors(prev => ({ ...prev, name: 'Name is required' }));
        } else if (name === 'email') {
          if (!value.trim()) {
            setErrors(prev => ({ ...prev, email: 'Email is required' }));
          } else if (!validateEmail(value)) {
            setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
          }
        } else if (name === 'message' && !value.trim()) {
          setErrors(prev => ({ ...prev, message: 'Message is required' }));
        }
      };
  
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
            <input type="hidden" name="subject" value={`New contact from ${formData.name} via Portfolio`} />
            <input 
                type="checkbox" 
                name="botcheck" 
                style={{ display: 'none' }} 
                tabIndex={-1}
                aria-hidden="true"
            />
             <input 
                type="hidden" 
                name="timestamp" 
                value={submitTime?.toString() || ''} 
            />
            <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                $hasError={!!errors.name}
                maxLength={100}
                required
            />
            {errors.name && <FieldError>{errors.name}</FieldError>}
            </FormGroup>
          
            <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                $hasError={!!errors.email}
                maxLength={150}
                required
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
            </FormGroup>
            
            <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                $hasError={!!errors.message}
                maxLength={3000}
                required
            />
            {errors.message && <FieldError>{errors.message}</FieldError>}
            </FormGroup>
            
            <SubmitButton 
            type="submit" 
            disabled={status === 'loading' || Object.keys(errors).length > 0}
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