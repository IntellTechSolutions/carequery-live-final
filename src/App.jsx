import React, { useState, useEffect } from 'react';
import { Menu, X, Check, Brain, Shield, Users, Globe, Database, Zap, ArrowRight, Mail, Phone, MapPin, Award, TrendingUp, Clock } from 'lucide-react';

const CareQueryWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'features', 'technology', 'impact', 'team', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      alert('Thank you for subscribing! We\'ll keep you updated on Care Query developments.');
      setEmail('');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'technology', label: 'Technology' },
    { id: 'impact', label: 'Impact' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Care Query</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  AI-Powered Healthcare Navigation
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transforming NHS Navigation with Intelligent AI
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Care Query simplifies complex NHS pathways, making healthcare accessible to everyone through conversational AI that understands your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('about')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Learn More <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Get in Touch
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 text-white">
                <div className="space-y-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <p className="font-semibold mb-2">User Query:</p>
                    <p className="text-sm">I have been having chest pains. What should I do?</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <p className="font-semibold mb-2">Care Query Response:</p>
                    <p className="text-sm">Based on NHS guidelines, chest pain requires immediate attention. You should call 111 for urgent advice or 999 if severe. Here are your nearest A&amp;E locations...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Care Query
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Developed by Intell Tech Solutions Limited, Care Query is revolutionizing how UK patients interact with the NHS through cutting-edge AI technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To make NHS navigation simple, accessible, and personalized for every patient in the UK, reducing confusion and empowering informed healthcare decisions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Patient-Centered</h3>
              <p className="text-gray-600">
                Built with patients in mind, combining official NHS data with real-world experiences to provide comprehensive, practical guidance.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure &amp; Compliant</h3>
              <p className="text-gray-600">
                Fully compliant with UK GDPR and Data Protection Act 2018, ensuring patient data privacy and security at every level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful capabilities designed to transform healthcare navigation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group hover:shadow-xl transition-shadow duration-300 bg-gray-50 rounded-xl p-6">
              <Brain className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Natural Language Understanding</h3>
              <p className="text-gray-600 mb-4">
                Ask questions in everyday language - our AI understands context and intent, not just keywords.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm text-gray-600">Conversational interface</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm text-gray-600">Multi-language support</span>
                </li>
              </ul>
            </div>

            <div className="group hover:shadow-xl transition-shadow duration-300 bg-gray-50 rounded-xl p-6">
              <Database className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Dual Data Sources</h3>
              <p className="text-gray-600 mb-4">
                Combines official NHS information with real-time patient experiences for comprehensive guidance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm text-gray-600">Official NHS data</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm text-gray-600">Crowdsourced insights</span>
                </li>
              </ul>
            </div>

            <div className="group hover:shadow-xl transition-shadow duration-300 bg-gray-50 rounded-xl p-6">
              <Zap className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Real-Time Intelligence</h3>
              <p className="text-gray-600 mb-4">
                Continuously learns and improves from user interactions and feedback.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm text-gray-600">Live updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm text-gray-600">Adaptive responses</span>
                </li>
              </ul>
            </div>

            <div className="group hover:shadow-xl transition-shadow duration-300 bg-gray-50 rounded-xl p-6">
              <Shield className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
              <p className="text-gray-600 mb-4">
                Built on Google Cloud with Model Armor protection and comprehensive audit trails.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm text-gray-600">De-identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm text-gray-600">GDPR compliant</span>
                </li>
              </ul>
            </div>

            <div className="group hover:shadow-xl transition-shadow duration-300 bg-gray-50 rounded-xl p-6">
              <Clock className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
              <p className="text-gray-600 mb-4">
                Always available to answer questions and provide guidance when patients need it most.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm text-gray-600">Instant responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm text-gray-600">No waiting times</span>
                </li>
              </ul>
            </div>

            <div className="group hover:shadow-xl transition-shadow duration-300 bg-gray-50 rounded-xl p-6">
              <Award className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">NHS Integration</h3>
              <p className="text-gray-600 mb-4">
                Seamlessly integrates with NHS systems through FHIR APIs and NHS login.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm text-gray-600">NHS authentication</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm text-gray-600">FHIR standards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on Google Cloud Platform with cutting-edge AI and data technologies
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">AI &amp; Machine Learning</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Retrieval Augmented Generation (RAG)</h4>
                      <p className="text-gray-600 text-sm">Advanced AI that understands context and provides accurate, personalized responses</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Vertex AI &amp; Gemini Models</h4>
                      <p className="text-gray-600 text-sm">Google's latest AI models for natural language understanding and generation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Agentic AI Components</h4>
                      <p className="text-gray-600 text-sm">Intelligent agents that can plan tasks and maintain conversational context</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6">Data Infrastructure</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Apache Iceberg on GCS</h4>
                      <p className="text-gray-600 text-sm">Open-format data storage preventing vendor lock-in with schema evolution</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold mb-1">BigLake &amp; BigQuery</h4>
                      <p className="text-gray-600 text-sm">Unified data access and real-time analytics for instant insights</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Vector Database</h4>
                      <p className="text-gray-600 text-sm">Semantic search capabilities for understanding meaning beyond keywords</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t">
              <h3 className="text-xl font-semibold mb-4">Security &amp; Compliance</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <p className="font-semibold">UK GDPR Compliant</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <p className="font-semibold">Data Protection Act 2018</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <p className="font-semibold">NHS Data Standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expected Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming healthcare access for millions of UK patients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">68M+</div>
              <p className="text-gray-600">Potential UK Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">Availability</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50%</div>
              <p className="text-gray-600">Reduction in NHS Calls</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
              <p className="text-gray-600">User Satisfaction Target</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-semibold mb-6">Benefits for Stakeholders</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="text-blue-600" size={24} />
                  For Patients
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 mt-0.5" size={20} />
                    <span>Instant access to personalized healthcare guidance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 mt-0.5" size={20} />
                    <span>Reduced anxiety through clear information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 mt-0.5" size={20} />
                    <span>Better healthcare decisions and outcomes</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-blue-600" size={24} />
                  For NHS
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 mt-0.5" size={20} />
                    <span>Reduced burden on 111 and GP services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 mt-0.5" size={20} />
                    <span>Improved patient flow and resource allocation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 mt-0.5" size={20} />
                    <span>Data insights for service improvement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experts in healthcare technology and AI innovation
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-4">Intell Tech Solutions Limited</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A UK-based technology company specializing in AI-driven healthcare solutions. Our team combines expertise in artificial intelligence, healthcare systems, and user experience design to create transformative digital health tools.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Brain className="text-blue-600" size={32} />
                </div>
                <h4 className="font-semibold mb-2">AI &amp; ML Engineers</h4>
                <p className="text-sm text-gray-600">Expert team in RAG systems and NLP</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Shield className="text-blue-600" size={32} />
                </div>
                <h4 className="font-semibold mb-2">Healthcare Specialists</h4>
                <p className="text-sm text-gray-600">Deep understanding of NHS systems</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Database className="text-blue-600" size={32} />
                </div>
                <h4 className="font-semibold mb-2">Cloud Architects</h4>
                <p className="text-sm text-gray-600">Google Cloud certified professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interested in partnering with us or learning more about Care Query?
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Company Address:</h4>
                      <div className="flex items-start gap-3">
                        <MapPin className="text-blue-600 mt-1" size={20} />
                        <div>
                          <p className="font-semibold">Intell Tech Solutions Limited</p>
                          <p className="text-gray-600">Bartle House, 9 Oxford Court</p>
                          <p className="text-gray-600">Manchester, M2 3WQ</p>
                          <p className="text-gray-600">United Kingdom</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">E-Contact:</h4>
                      <div className="flex items-start gap-3">
                        <Mail className="text-blue-600 mt-1" size={20} />
                        <div>
                          <p className="text-gray-600 mb-1">Having questions? Email directly to:</p>
                          <a href="mailto:info@intelltechsolutions.co.uk" className="font-semibold text-blue-600 hover:text-blue-700">
                            info@intelltechsolutions.co.uk
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="text-blue-600" size={20} />
                      <span>+44 (0) 20 1234 5678</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-6">Partnership Opportunities</h3>
                  <p className="text-gray-600 mb-4">
                    We're actively seeking partnerships with NHS trusts, healthcare providers, and technology companies to expand Care Query's reach and impact.
                  </p>
                  <button 
                    onClick={() => window.open('mailto:info@intelltechsolutions.co.uk?subject=Partnership%20Inquiry', '_blank')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Partner With Us
                  </button>
                </div>
              </div>
              
              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold mb-6">Stay Updated</h3>
                <p className="text-gray-600 mb-4">
                  Subscribe to our newsletter for the latest updates on Care Query development and healthcare AI innovations.
                </p>
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Care Query</h3>
              <p className="text-gray-400">
                Transforming NHS navigation through intelligent AI technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Technology</li>
                <li>Security</li>
                <li>Integration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Team</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>GDPR Compliance</li>
                <li>Data Protection</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Intell Tech Solutions Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareQueryWebsite;