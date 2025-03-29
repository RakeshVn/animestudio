import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StarSvg = ({ className }) => (
    <svg className={className} width="21" height="21" viewBox="0 0 21 21">
        <path d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z" />
    </svg>
);

const Upload = () => {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const sampleImages = [
        { id: 1, src: '/samples/anime1.jpeg', alt: 'Anime Style Sample 1' },
        { id: 2, src: '/samples/anime2.jpeg', alt: 'Anime Style Sample 2' },
        { id: 3, src: '/samples/anime3.jpeg', alt: 'Anime Style Sample 3' },
        { id: 4, src: '/samples/anime4.jpeg', alt: 'Anime Style Sample 4' },
        { id: 5, src: '/samples/anime5.jpeg', alt: 'Anime Style Sample 5' },
        { id: 5, src: '/samples/anime6.jpeg', alt: 'Anime Style Sample 6' },
    ];

    // Create duplicated array for infinite scroll
    const duplicatedImages = [...sampleImages, ...sampleImages];

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                // Reset to start when reaching the original array length
                if (nextIndex >= sampleImages.length) {
                    return 0;
                }
                return nextIndex;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/webp')) {
            setImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const handleSubmit = async (email) => {
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('email', email);
            formData.append('file', imageFile);
            await axios.post('https://animestudio.in/api/requests', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Thank you for submitting! We\'ll process your image soon.');
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error creating order:', err);
            setError('Failed to process payment. Please try again.');
            toast.error('Failed to process payment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-ghibli landscape-bg">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    Make Your Photos Look Like a
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F3B664] drop-shadow-lg">
                    Scene from an Anime
                </h2>
            </div>

            <div className="ghibli-card w-64 sm:w-80 md:w-96 backdrop-blur-md">
                <h3 className="text-lg sm:text-xl font-semibold text-[#2A4858] mb-3">Upload Your Image</h3>
                <div
                    className="border-dashed border-2 border-[#7CD1C7] rounded-lg h-40 sm:h-48 flex items-center justify-center cursor-pointer hover:bg-[#4AB8C1]/10 transition-all duration-300"
                >
                    {image ? (
                        <img src={image} alt="Uploaded" className="h-full w-full object-cover rounded-lg" />
                    ) : (
                        <label className="flex flex-col items-center justify-center cursor-pointer p-4 sm:p-6 text-center">
                            <FaUpload className="text-2xl sm:text-3xl text-[#4AB8C1] mb-2 sm:mb-3" />
                            <span className="text-xs sm:text-sm text-[#2A4858]/70">
                                Drag & drop an image here, or click to select
                            </span>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/webp"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    )}
                </div>
                <p className="text-[10px] sm:text-xs text-[#2A4858]/50 mt-2">
                    Supports PNG, JPG, WEBP (max 10MB)
                </p>
            </div>

            <button
                className={`mt-6 sm:mt-8 ghibli-button text-sm sm:text-base`}
                disabled={!image}
                onClick={() => setIsModalOpen(true)}
            >
                <StarSvg className="magic-star left pink" />
                <StarSvg className="magic-star right purple" />
                <span>See the Magic</span>
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />

            <div className="mt-12 w-full max-w-[90vw]">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 text-center">
                    Sample Transformations
                </h3>
                <div className="overflow-hidden pb-4">
                    <div
                        className="flex gap-4 transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (256 + 16)}px)`,
                            width: `${duplicatedImages.length * (256 + 16)}px`
                        }}
                        onTransitionEnd={() => {
                            // When reaching the end of original set, quickly reset without animation
                            if (currentIndex >= sampleImages.length) {
                                const element = document.querySelector('.flex.gap-4');
                                element.style.transition = 'none';
                                setCurrentIndex(0);
                                // Re-enable transition after reset
                                setTimeout(() => {
                                    element.style.transition = 'transform 500ms ease-in-out';
                                }, 50);
                            }
                        }}
                    >
                        {duplicatedImages.map((image, index) => (
                            <div
                                key={`${image.id}-${index}`}
                                className="flex-shrink-0 w-64 h-40 rounded-lg overflow-hidden shadow-lg"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <footer className="w-full text-center py-4 mt-8">
                <p className="text-white/80 text-sm">
                    © {new Date().getFullYear()} Peace Bruh LLC. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Upload;
