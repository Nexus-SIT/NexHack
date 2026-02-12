import React from 'react';

const speakers = [
    { name: 'Dr. Ananya Rao', role: 'AI Researcher, IISc', initial: 'AR' },
    { name: 'Karthik Menon', role: 'CTO, TechNova', initial: 'KM' },
    { name: 'Priya Sharma', role: 'Lead SDE, Google', initial: 'PS' },
    { name: 'Ravi Kumar', role: 'Founder, BuildStack', initial: 'RK' },
];

const SpeakersSection = () => {
    return (
        <section id="tracks" className="block-ink py-20 sm:py-28 relative">
            <div className="absolute inset-0 pattern-kolam"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-12">
                    <span className="font-header text-xs text-[#1A5FCF] tracking-[0.3em]">// SPEAKERS &amp; JUDGES</span>
                    <h2 className="font-mega text-4xl sm:text-5xl lg:text-6xl text-white mt-2">
                        THE JURY
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {speakers.map((speaker, idx) => (
                        <div
                            key={idx}
                            className="card-nex p-6 text-center transition-transform hover:-translate-y-1"
                        >
                            {/* Avatar placeholder */}
                            <div className="w-20 h-20 mx-auto mb-4 bg-[#0E46A3] border-3 border-white flex items-center justify-center">
                                <span className="font-mega text-2xl text-white">{speaker.initial}</span>
                            </div>
                            <h3 className="font-header text-sm text-white mb-1">
                                {speaker.name}
                            </h3>
                            <p className="font-body text-white/50 text-xs">
                                {speaker.role}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SpeakersSection;
