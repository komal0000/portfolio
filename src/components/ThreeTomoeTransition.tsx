"use client";

import { motion } from "framer-motion";
import { SharinganIcon } from "@/components/SharinganIcon";

export function ThreeTomoeTransition() {
  return (
    <div className="relative h-28 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-red-900/25 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute inset-[-100%] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(200,0,0,0.15) 0%, transparent 70%)",
            }}
          />
          <SharinganIcon size={44} spinDuration={7.5} />
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="absolute left-[10%] right-[10%] top-1/2 h-[1px] -translate-y-1/2 origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(200,0,0,0.12) 30%, rgba(200,0,0,0.12) 70%, transparent)",
        }}
      />
    </div>
  );
}
