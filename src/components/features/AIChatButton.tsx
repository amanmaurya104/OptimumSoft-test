import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from '../ui/icons';
import './AIChatButton.css';

interface ChatMessage {
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

type ChatStep = 'greeting' | 'name' | 'email' | 'phone' | 'message' | 'submitting' | 'complete';

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>('greeting');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && currentStep === 'greeting') {
      // Start conversation when chat opens
      setTimeout(() => {
        addBotMessage("Hi there! 👋 I'm here to help you. Let me gather some information so our team can assist you better.");
        setTimeout(() => {
          askQuestion('name');
        }, 1500);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current && currentStep !== 'complete' && currentStep !== 'submitting') {
      // Focus input after a short delay to ensure it's ready
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStep, messages]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: 'bot', text, timestamp: new Date() }]);
      setIsTyping(false);
      // Refocus input after bot message appears
      setTimeout(() => {
        if (inputRef.current && currentStep !== 'complete' && currentStep !== 'submitting') {
          inputRef.current.focus();
        }
      }, 100);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { type: 'user', text, timestamp: new Date() }]);
  };

  const askQuestion = (step: ChatStep) => {
    setCurrentStep(step);
    let question = '';

    switch (step) {
      case 'name':
        question = "What's your name?";
        break;
      case 'email':
        question = "Great! What's your email address?";
        break;
      case 'phone':
        question = "Perfect! Can you share your phone number?";
        break;
      case 'message':
        question = "Thanks! Now, could you please describe your issue, problem, or what you'd like help with?";
        break;
    }

    if (question) {
      addBotMessage(question);
    }
  };

  const validateInput = (step: ChatStep, value: string): boolean => {
    switch (step) {
      case 'name':
        return value.trim().length >= 2;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value.trim());
      case 'phone':
        return value.trim().length >= 10;
      case 'message':
        return value.trim().length >= 10;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateInput(currentStep, userInput)) {
      addBotMessage("I need a bit more information. Could you please provide a valid response?");
      return;
    }

    // Save the answer
    switch (currentStep) {
      case 'name':
        setFormData((prev) => ({ ...prev, name: userInput.trim() }));
        addUserMessage(userInput.trim());
        setUserInput('');
        setTimeout(() => {
          askQuestion('email');
          // Refocus input after question is asked
          setTimeout(() => inputRef.current?.focus(), 1000);
        }, 1000);
        break;
      case 'email':
        setFormData((prev) => ({ ...prev, email: userInput.trim() }));
        addUserMessage(userInput.trim());
        setUserInput('');
        setTimeout(() => {
          askQuestion('phone');
          setTimeout(() => inputRef.current?.focus(), 1000);
        }, 1000);
        break;
      case 'phone':
        setFormData((prev) => ({ ...prev, phone: userInput.trim() }));
        addUserMessage(userInput.trim());
        setUserInput('');
        setTimeout(() => {
          askQuestion('message');
          setTimeout(() => inputRef.current?.focus(), 1000);
        }, 1000);
        break;
      case 'message':
        const finalMessage = userInput.trim();
        setFormData((prev) => ({ ...prev, message: finalMessage }));
        addUserMessage(finalMessage);
        setUserInput('');
        setTimeout(() => submitForm(finalMessage), 500);
        break;
    }
  };

  const submitForm = async (userMessage?: string) => {
    setCurrentStep('submitting');
    setIsSubmitting(true);
    
    // Show the success message immediately after user sends their last message
    addBotMessage("Our Team will contact you shortly. Thank you for reaching out! 😊");

    try {
      // Wait a bit for the message to be added
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Use the passed message or fallback to formData.message
      const messageToSend = userMessage || formData.message;

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('subject', 'AI Chat Inquiry - ' + formData.name);
      formDataToSend.append('message', `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage/Issue:\n${messageToSend}`);
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_subject', 'New AI Chat Inquiry from OptimumSoft Website');
      formDataToSend.append('_template', 'table');

      const response = await fetch('https://formsubmit.co/ajax/mouryaaman640@gmail.com', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setCurrentStep('complete');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      addBotMessage("I'm sorry, there was an issue sending your information. Please try again or contact us directly.");
      setCurrentStep('message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && userInput.trim() && !isSubmitting && currentStep !== 'complete' && !isTyping) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset after a delay to allow close animation
    setTimeout(() => {
      setMessages([]);
      setCurrentStep('greeting');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setUserInput('');
    }, 300);
  };

  return (
    <>
      <button
        className={`ai-chat-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with AI"
        title="Chat with AI"
      >
        <div className="ai-chat-button-icon">
          <MessageCircle size={24} />
        </div>
        {!isOpen && <div className="ai-chat-button-pulse"></div>}
      </button>

      {isOpen && (
        <div className="ai-chat-modal">
          <div className="ai-chat-header">
            <div className="ai-chat-header-info">
              <div className="ai-chat-avatar">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3>AI Assistant</h3>
                <p className="ai-chat-status">Online</p>
              </div>
            </div>
            <button className="ai-chat-close" onClick={handleClose} aria-label="Close chat">
              <X size={20} />
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`ai-chat-message ${message.type === 'bot' ? 'bot' : 'user'}`}>
                {message.type === 'bot' && (
                  <div className="ai-chat-avatar-small">
                    <MessageCircle size={16} />
                  </div>
                )}
                <div className="ai-chat-message-content">
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-chat-message bot">
                <div className="ai-chat-avatar-small">
                  <MessageCircle size={16} />
                </div>
                <div className="ai-chat-message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {currentStep !== 'complete' && (
            <div className="ai-chat-input-container">
              <input
                ref={inputRef}
                type={currentStep === 'email' ? 'email' : currentStep === 'phone' ? 'tel' : 'text'}
                className="ai-chat-input"
                placeholder={
                  currentStep === 'name'
                    ? 'Type your name...'
                    : currentStep === 'email'
                    ? 'Type your email...'
                    : currentStep === 'phone'
                    ? 'Type your phone number...'
                    : 'Describe your issue or problem...'
                }
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                onKeyDown={(e) => {
                  // Allow Enter key to submit
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (userInput.trim() && !isSubmitting && !isTyping) {
                      handleSubmit();
                    }
                  }
                }}
                disabled={isSubmitting || isTyping}
                autoComplete={currentStep === 'email' ? 'email' : currentStep === 'name' ? 'name' : currentStep === 'phone' ? 'tel' : 'off'}
                aria-label={
                  currentStep === 'name'
                    ? 'Enter your name'
                    : currentStep === 'email'
                    ? 'Enter your email address'
                    : currentStep === 'phone'
                    ? 'Enter your phone number'
                    : 'Describe your issue or problem'
                }
                autoFocus
              />
              <button
                className="ai-chat-send"
                onClick={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!isSubmitting && !isTyping && userInput.trim()) {
                      handleSubmit();
                    }
                  }
                }}
                disabled={!userInput.trim() || isSubmitting || isTyping}
                aria-label="Send message"
                type="button"
              >
                <Send size={18} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

