// app/dashboard/not-found.tsx
import Link from 'next/link'

export default function DashboardNotFound() {
  return (
    <div className="min-h-full bg-[#e8f5e9] flex items-center justify-center px-6 overflow-hidden relative rounded-xl">

      {/* Decorative background circles */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#2d5a35]/5 pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#7FC155]/10 pointer-events-none" />

      <div className="relative z-10 text-center max-w-md w-full py-12">

        {/* Animated waste bin illustration */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className="w-24 h-28 bg-[#2d5a35] rounded-b-2xl rounded-t-lg mx-auto relative shadow-2xl"
              style={{ animation: 'wobble 3s ease-in-out infinite' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 48 48" className="w-12 h-12 text-[#7FC155]" fill="none">
                  <path d="M24 8 L30 18 L26 18 L26 30 L30 30 L24 40 L18 30 L22 30 L22 18 L18 18 Z" fill="currentColor" />
                  <path d="M8 32 L18 26 L16 22 L28 18 L26 30 L22 27 L12 33 Z" fill="currentColor" opacity="0.7" />
                  <path d="M40 32 L30 26 L32 22 L20 18 L22 30 L26 27 L36 33 Z" fill="currentColor" opacity="0.5" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7FC155]/30 rounded-b-2xl" />
            </div>
            <div
              className="w-32 h-4 bg-[#1e3d24] rounded-lg mx-auto -mt-1 shadow-lg"
              style={{ animation: 'lidBounce 3s ease-in-out infinite' }}
            />
            <div className="w-10 h-3 bg-[#152e1a] rounded-full mx-auto -mt-1" />

            <span className="absolute -top-5 -right-3 text-xl text-[#7FC155] font-black select-none"
              style={{ animation: 'floatUp 2.5s ease-in-out infinite' }}>?</span>
            <span className="absolute -top-8 left-1 text-base text-[#2d5a35]/40 font-black select-none"
              style={{ animation: 'floatUp 2.5s ease-in-out infinite 0.8s' }}>?</span>
            <span className="absolute -top-3 -left-5 text-lg text-[#7FC155]/60 font-black select-none"
              style={{ animation: 'floatUp 2.5s ease-in-out infinite 1.4s' }}>?</span>
          </div>
        </div>

        {/* 404 */}
        <div
          className="text-[96px] font-black leading-none text-[#2d5a35] select-none tracking-tighter"
          style={{
            fontFamily: '"Georgia", serif',
            textShadow: '3px 3px 0px #7FC155',
            animation: 'fadeSlideUp 0.6s ease-out both',
          }}
        >
          404
        </div>

        <h1
          className="text-xl font-bold text-[#2d5a35] mt-2 mb-2"
          style={{ fontFamily: '"Georgia", serif', animation: 'fadeSlideUp 0.6s ease-out 0.15s both' }}
        >
          This page got recycled.
        </h1>
        <p
          className="text-gray-500 text-sm mb-7 leading-relaxed"
          style={{ animation: 'fadeSlideUp 0.6s ease-out 0.3s both' }}
        >
          The page you're looking for has been collected, composted, or never existed.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          style={{ animation: 'fadeSlideUp 0.6s ease-out 0.45s both' }}
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-[#2d5a35] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#7FC155] transition-colors duration-200 shadow-md"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Back to Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#2d5a35] border border-[#2d5a35]/20 px-5 py-2.5 rounded-xl font-semibold text-sm hover:border-[#7FC155] hover:text-[#7FC155] transition-colors duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes wobble {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes lidBounce {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-5px) rotate(1deg); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-24px); opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}