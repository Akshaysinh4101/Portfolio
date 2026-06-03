import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheckCircle } from "react-icons/fi";
import { DEVELOPER_INFO } from "../constants";
import { useMagnetic } from "../hooks/useMagnetic";
import { fadeInUp, staggerContainer, scaleUp } from "../animations/variants";

export const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const gitRef = useMagnetic(0.2);
  const lnRef = useMagnetic(0.2);
  const mailRef = useMagnetic(0.2);
  const submitRef = useMagnetic(0.15);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in the required fields.");
      return;
    }

    setIsSubmitting(true);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      // Fallback preview mode when key is not configured
      console.warn("Web3Forms access key is not set. Simulating form submission.");
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1200);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          Inquiry_Subject: formData.subject || "Not Specified",
          message: formData.message
        })
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to send message. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full select-none"
    >
      {/* Header */}
      <div className="text-center mb-20 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="heading-font text-xs md:text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase mb-3"
        >
          Get In Touch
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="heading-font text-3xl md:text-4xl font-extrabold text-white tracking-tight"
        >
          Let's Build Scale Together
        </motion.h3>
      </div>

      <motion.div
        variants={staggerContainer(0.15, 0.2)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch"
      >
        {/* Left Side: Contact Information */}
        <div className="lg:col-span-5 flex flex-col justify-between text-left">
          <div className="space-y-8">
            <motion.h4
              variants={fadeInUp(0.1)}
              className="heading-font font-bold text-xl text-white mb-2"
            >
              Contact Information
            </motion.h4>
            <motion.p
              variants={fadeInUp(0.2)}
              className="text-slate-400 text-sm md:text-base font-light max-w-sm mb-8 leading-relaxed"
            >
              Have a project in mind, need architecture consulting, or simply want to talk tech? Drop a message!
            </motion.p>

            {/* Coordinates Grid */}
            <div className="space-y-6">
              {/* Email */}
              <motion.div variants={fadeInUp(0.3)} className="flex items-center gap-4 group">
                <div
                  ref={mailRef}
                  className="magnetic-btn w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-md"
                >
                  <FiMail />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Email</span>
                  <a href={`mailto:${DEVELOPER_INFO.email}`} className="text-sm text-slate-200 hover:text-purple-400 transition-colors">
                    {DEVELOPER_INFO.email}
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div variants={fadeInUp(0.4)} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-md">
                  <FiMapPin />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Location</span>
                  <span className="text-sm text-slate-200">{DEVELOPER_INFO.location}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Social Links */}
          <motion.div
            variants={fadeInUp(0.5)}
            className="flex items-center gap-4 mt-12 lg:mt-0 pt-8 border-t border-white/5"
          >
            <a
              ref={gitRef}
              href={DEVELOPER_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full p-3 shadow-md flex items-center justify-center transition-all text-lg"
            >
              <FiGithub />
            </a>
            <a
              ref={lnRef}
              href={DEVELOPER_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn border border-purple-500/20 hover:border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/15 text-purple-300 rounded-full p-3 shadow-md flex items-center justify-center transition-all text-lg"
            >
              <FiLinkedin />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Form Card */}
        <div className="lg:col-span-7 w-full flex">
          <motion.div
            variants={scaleUp(0.1)}
            className="w-full glass-panel border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative flex flex-col justify-center min-h-[400px]"
          >
            {isSubmitted ? (
              /* Success screen anim */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 text-3xl mb-2 shadow-lg shadow-green-500/5"
                >
                  <FiCheckCircle />
                </motion.div>
                <h4 className="heading-font font-bold text-xl text-white">Message Transmitted!</h4>
                <p className="text-slate-400 text-xs md:text-sm font-light max-w-xs leading-relaxed">
                  Thank you for reaching out. I'll evaluate and follow up with your request as soon as possible.
                </p>
              </motion.div>
            ) : (
              /* Normal Form content */
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <label htmlFor="name" className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      Name <span className="text-purple-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                      placeholder="Your Name"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <label htmlFor="email" className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      Email <span className="text-purple-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <label htmlFor="subject" className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                {/* Message field */}
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <label htmlFor="message" className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Message <span className="text-purple-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all resize-none"
                    placeholder="Describe your project, timeline, or query..."
                  />
                </div>

                {/* Submit button */}
                <button
                  ref={submitRef}
                  type="submit"
                  disabled={isSubmitting}
                  className="magnetic-btn w-full bg-white hover:bg-slate-200 text-darkBg text-xs font-semibold uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none mt-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 rounded-full border-2 border-slate-400 border-t-darkBg animate-spin" />
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <FiSend />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
