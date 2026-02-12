import React from 'react';
import { ChevronRight } from 'lucide-react';

const faqs = [
    {
        question: 'Who can participate?',
        answer: 'Any student or recent graduate can apply. We welcome developers, designers, and product managers of all skill levels.',
    },
    {
        question: 'Do I need a team?',
        answer: 'You can join solo and form a team at the event, or come with a pre-formed team of up to 4 members.',
    },
    {
        question: 'What about food?',
        answer: 'All meals are included! Pay the entry fee to get your meal pass QR code for breakfast, lunch, dinner, and midnight snacks.',
    },
    {
        question: 'What tracks are available?',
        answer: 'We have AI/ML, Web3, IoT, FinTech, and Open Innovation tracks. Choose the one that matches your passion.',
    },
    {
        question: 'What should I bring?',
        answer: 'Bring your laptop, charger, and your best ideas. We provide the venue, Wi-Fi, power outlets, and all the energy you need.',
    },
];

const FAQSection = () => {
    return (
        <section id="faq" className="block-ink py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <span className="font-header text-xs text-[#1A5FCF] tracking-[0.3em]">// GOT QUESTIONS?</span>
                    <h2 className="font-mega text-3xl sm:text-4xl lg:text-5xl text-white mt-2">
                        FAQ
                    </h2>
                </div>
                <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                        <details key={idx} className="card-nex-outline p-4 group">
                            <summary className="font-header text-sm text-white cursor-pointer flex justify-between items-center">
                                {faq.question}
                                <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90 text-white/40" />
                            </summary>
                            <p className="font-body text-white/60 mt-3 text-sm">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
