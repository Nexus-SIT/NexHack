import React from 'react';
import { Clock } from 'lucide-react';

const schedule = [
    { time: '09:00 AM', event: 'Check-in & Breakfast', type: 'START' },
    { time: '10:30 AM', event: 'Opening Ceremony', type: 'STAGE' },
    { time: '12:00 PM', event: 'Hacking Begins!', type: 'HACK' },
    { time: '01:00 PM', event: 'Lunch Served', type: 'FOOD' },
    { time: '06:00 PM', event: 'Workshop: AI in Production', type: 'LEARN' },
    { time: '09:00 PM', event: 'Dinner & Networking', type: 'FOOD' },
    { time: '12:00 AM', event: 'Midnight Snacks & Gaming', type: 'FUN' },
    { time: '10:00 AM', event: 'Final Submissions', type: 'HACK' },
];

const ScheduleSection = () => {
    return (
        <section id="schedule" className="block-blue py-20 sm:py-28 relative">
            <div className="absolute inset-0 pattern-mandala"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-12">
                    <span className="font-header text-xs text-white/50 tracking-[0.3em]">// TIMELINE</span>
                    <h2 className="font-mega text-4xl sm:text-5xl lg:text-6xl text-white mt-2">
                        EVENT SCHEDULE
                    </h2>
                </div>

                <div className="space-y-3">
                    {schedule.map((item, idx) => (
                        <div
                            key={idx}
                            className="card-nex-outline p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-white/[0.04] transition-all hover:translate-x-2"
                        >
                            <div className="flex items-center gap-3 sm:min-w-[140px]">
                                <Clock className="w-4 h-4 text-white/40" />
                                <span className="font-header text-sm text-white/60">{item.time}</span>
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-header text-sm text-white">{item.event}</h4>
                            </div>
                            <span className="badge-nex-outline self-start sm:self-auto text-[0.6rem]">
                                {item.type}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ScheduleSection;
