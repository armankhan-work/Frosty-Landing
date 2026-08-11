'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function ProblemConclusion() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const wordVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="relative w-full flex flex-col items-center text-center pt-24 pb-20 bg-transparent z-10 overflow-hidden ">
            <motion.h3
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ margin: "-100px", once: true }}
                className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-6"
            >
                <span className="inline-block">
                    <motion.span variants={wordVariants} className="inline-block mr-[0.25em]">The</motion.span>
                    <motion.span variants={wordVariants} className="inline-block mr-[0.25em]">customer</motion.span>
                    <motion.span variants={wordVariants} className="inline-block mr-[0.25em]">was</motion.span>
                    <motion.span variants={wordVariants} className="inline-block text-[#8B5CF6] font-semibold drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">ready.</motion.span>
                </span>
                <br className="hidden md:block" />
                <span className="inline-block md:mt-2 mb-16">
                    <motion.span variants={wordVariants} className="inline-block mr-[0.25em]">The</motion.span>
                    <motion.span variants={wordVariants} className="inline-block mr-[0.25em]">business</motion.span>
                    <motion.span variants={wordVariants} className="inline-block text-[#8B5CF6] font-semibold drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">wasn't.</motion.span>
                </span>
            </motion.h3>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px", once: true }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="text-[#8B5CF6] text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-16"
            >
                There has to be a better way.
            </motion.p>

            {/* Glowing Dot and Connecting Line */}
            <div className="relative flex flex-col items-center h-[160px] z-20 mt-10">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ margin: "0px", once: true }}
                    transition={{ duration: 0.5, type: "spring", delay: 2.4 }}
                    className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_20px_6px_rgba(139,92,246,0.9)] relative z-10"
                />
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: '100%', opacity: 1 }}
                    viewport={{ margin: "0px", once: true }}
                    transition={{ duration: 1, delay: 2.7 }}
                    className="w-[1.5px] bg-gradient-to-b from-white via-[#8B5CF6] to-transparent relative z-0 -mt-[1px]"
                />
            </div>
        </section>
    );
}
