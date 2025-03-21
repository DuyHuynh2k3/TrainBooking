export const getTotalProfitSVGBase64 = (fillColor) => {
  const svg = `
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11 2V22C5.93 21.5 2 17.21 2 12C2 6.79 5.93 2.5 11 2ZM13.03 2V10.99H22C21.53 6.25 17.76 2.47 13.03 2ZM13.03 13.01V22C17.77 21.53 21.53 17.75 22 13.01H13.03Z"
                fill="${fillColor}"
            />
        </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
