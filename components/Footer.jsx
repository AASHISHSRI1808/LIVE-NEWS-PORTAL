export default function Footer() {
  return (
    <footer className="lh-footer mt-5">
      <div className="container py-4">

        {/* Logo + Name */}
        <div className="d-flex justify-content-center align-items-center mb-3">
          <svg width="42" height="42" viewBox="0 0 48 48" className="lh-footer-logo">
            <rect width="48" height="48" rx="8" fill="#d80000"/>
            <text
              x="24"
              y="30"
              textAnchor="middle"
              fontFamily="Noto Sans Devanagari, Mukta, sans-serif"
              fontWeight="700"
              fontSize="20"
              fill="#fff"
            >
              न
            </text>
          </svg>
          <h4 className="lh-footer-title ms-2">न्यूज़पोर्टल</h4>
        </div>

        {/* Links */}
        <div className="lh-footer-links mb-3">
          <a href="/">होम</a>
          <a href="/#topnews">टॉप न्यूज़</a>
          <a href="/#sports">खेल</a>
          <a href="/#business">बिजनेस</a>
          <a href="/#technology">टेक्नोलॉजी</a>
          <a href="/#entertainment">मनोरंजन</a>
        </div>

        <p className="lh-footer-copy mb-0">
          © 2025 न्यूज़पोर्टल — सर्वाधिकार सुरक्षित।
        </p>
      </div>
    </footer>
  );
}
