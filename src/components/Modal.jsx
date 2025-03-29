import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsValidEmail(validateEmail(newEmail));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="ghibli-card w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#2A4858]/50 hover:text-[#2A4858] transition-colors"
                >
                    ✕
                </button>

                <h3 className="text-xl font-semibold text-[#2A4858] mb-4">Enter Your Email</h3>

                <p className="text-sm text-[#2A4858]/70 mb-6">
                    Enter your email and we'll send you the ANIME version of your image once it's ready.
                </p>

                <div className="bg-[#4AB8C1]/10 rounded-lg p-4 mb-6">
                    <p className="text-sm text-[#2A4858]/70 mb-2">
                        We're experiencing high volume right now!
                    </p>
                    <div className="space-y-2">
                        <p className="text-sm text-[#2A4858]">
                            <span className="font-semibold">Estimated time:</span> 30-45 minutes
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        className="ghibli-input w-full"
                        required
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={() => onSubmit(email)}
                            className="ghibli-button flex-1"
                            disabled={!isValidEmail}
                        >
                            <span>Submit</span>
                        </button>
                        <button
                            onClick={onClose}
                            className="ghibli-button flex-1 bg-white/50 hover:bg-white/70"
                        >
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal; 