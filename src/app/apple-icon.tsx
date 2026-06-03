import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  const sizeValue = 180;
  const targetHeight = sizeValue * 0.55;
  const targetWidth = targetHeight * (269 / 243);

  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Apple Touch Icons should generally not have embedded border-radius.
          // iOS applies its own mask natively.
        }}
      >
        <svg width={targetWidth} height={targetHeight} viewBox="0 0 269 243" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M188.215 0H68.7741C60.5218 0 44.1258 4.13339 34.8963 10.6598C23.8209 18.4915 14.9172 26.3232 9.48809 36.7654C2.10442 50.0358 1.01861 59.6079 0.150001 69.8326C-0.654357 79.301 1.67009 95.7207 9.70525 109.209C17.2211 121.825 25.6926 128.624 34.4621 135.097C42.7143 141.188 63.5621 147.279 71.3801 145.974H145.216C167.15 147.062 174.316 185.35 145.216 190.354H52.0523L3.62457 243H42.9314L63.5621 221.245H148.256C167.801 219.07 176.594 211.116 181.048 206.017C191.689 193.834 195.877 183.371 196.901 168.599C197.987 152.936 187.998 134.009 176.488 125.307C171.421 121.681 159.766 115.3 153.251 115.517H68.5569C32.7247 113.995 11.8334 49.4267 67.2539 32.197H162.589L188.215 0Z" fill="white"/>
          <path d="M73.986 73.7484L100.263 102.682H108.298L132.186 73.966L73.986 73.7484Z" fill="white"/>
          <path d="M166.715 31.5443L192.992 0H239.9L210.365 31.5443H166.715Z" fill="#FFE500"/>
          <path d="M111.99 102.682L136.095 73.966H269L242.289 102.682H111.99Z" fill="#FFE500"/>
          <path d="M212.103 178.389V148.367H264.222L235.557 178.389H212.103Z" fill="#FFE500"/>
          <path d="M174.533 243L197.987 217.112H234.688L211.017 243H174.533Z" fill="#FFE500"/>
        </svg>
      </div>
    ),
    { ...size }
  );
}
