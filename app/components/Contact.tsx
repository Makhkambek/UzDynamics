"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormState {
  name:    string;
  email:   string;
  message: string;
}

export default function Contact() {
  const [form, setForm]   = useState<FormState>({ name: "", email: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#0d0d0d] font-mono">
      <div className="max-w-5xl mx-auto">

        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#00ff41]/40 text-xs tracking-widest mb-2">
            ── SECTION 04 ──────────────────────────────────
          </p>
          <div className="text-sm mb-1">
            <span className="text-[#00ff41]/50">root@uzdynamics:~$</span>{" "}
            <span className="text-[#00ff41]">compose --encrypt --recipient=uzdynamics --tls=1.3</span>
          </div>
          <div className="text-[#00ff41]/55 text-xs">
            encryption: AES-256-GCM · channel: SECURE
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {(["name", "email"] as const).map((field) => (
              <div key={field}>
                <label className="block text-[10px] text-[#00ff41]/70 tracking-[0.3em] uppercase mb-2">
                  &gt; {field === "name" ? "SENDER_NAME" : "SENDER_EMAIL"}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  required
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  placeholder={field === "email" ? "user@domain.mil" : "Your name"}
                  className="w-full bg-[#080808] border border-[#00ff41]/30 px-4 py-3 text-[#00ff41] text-sm placeholder-[#00ff41]/35 focus:outline-none focus:border-[#00ff41]/60 focus:shadow-[0_0_12px_rgba(0,255,136,0.15)] transition-all duration-200 tracking-wider"
                />
              </div>
            ))}

            <div>
              <label className="block text-[10px] text-[#00ff41]/70 tracking-[0.3em] uppercase mb-2">
                &gt; MESSAGE_BODY
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your mission parameters..."
                className="w-full bg-[#080808] border border-[#00ff41]/30 px-4 py-3 text-[#00ff41] text-sm placeholder-[#00ff41]/35 focus:outline-none focus:border-[#00ff41]/60 focus:shadow-[0_0_12px_rgba(0,255,136,0.15)] transition-all duration-200 resize-none tracking-wider leading-6"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 border border-[#00ff41]/50 text-[#00ff41] text-xs tracking-[0.3em] hover:bg-[#00ff41] hover:text-black hover:border-[#00ff41] transition-all duration-200 hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {sending ? (
                <>
                  <span className="blink">█</span> ENCRYPTING_MESSAGE...
                </>
              ) : (
                <>&gt;_ TRANSMIT_SECURE_MESSAGE</>
              )}
            </button>

            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-[#00ff41]/30 bg-[#00ff41]/5 px-4 py-3 text-xs text-[#00ff41] tracking-wider"
              >
                <span className="text-[#00ff41]/50 mr-2">&gt;</span>
                TRANSMISSION SENT · ENCRYPTED · DELIVERY CONFIRMED
              </motion.div>
            )}
          </motion.form>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="term-card p-6 space-y-4 text-xs">
              {[
                { label: "ENDPOINT",  value: "contact@uzdynamics.uz" },
                { label: "LOCATION",  value: "Tashkent, Uzbekistan" },
                { label: "RESPONSE",  value: "< 24h (business hours)" },
                { label: "PROTOCOL",  value: "TLS 1.3 · AES-256-GCM" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-[#00ff41]/55 w-24 flex-shrink-0 tracking-widest">{item.label}</span>
                  <span className="text-[#00ff41]/40">:</span>
                  <span className="text-[#e5e5e5]/75 font-sans">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="term-card p-6">
              <p className="text-[10px] text-[#00ff41]/60 tracking-widest mb-4">EXTERNAL_CHANNELS</p>
              <div className="flex gap-3 flex-wrap">
                {["GITHUB", "LINKEDIN", "TWITTER"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-[10px] border border-[#00ff41]/35 text-[#00ff41]/65 px-3 py-2 tracking-widest hover:border-[#00ff41]/70 hover:text-[#00ff41] transition-all duration-200"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Join the team */}
            <div className="term-card p-4 text-xs leading-5">
              <span className="text-[#00ff41]/25 mr-2 font-mono">{'//'}</span>
              <span className="text-[#e5e5e5]/50 font-sans">{' Want to join the team? Use the same form or email above — just mention it in your message.'}</span>
            </div>

            {/* ASCII border decoration */}
            <div className="text-[#00ff41]/10 text-[10px] leading-5 select-none">
              <div>┌────────────────────────────────┐</div>
              <div>│  ALL TRANSMISSIONS ENCRYPTED   │</div>
              <div>│  MONITORED · LOGGED · SECURED  │</div>
              <div>└────────────────────────────────┘</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
