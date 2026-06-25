/* global React, Wordmark, Icon */
function Footer() {
  return (
    <footer className="lmg-footer">
      <div className="lmg-container">
        <div className="lmg-footer-grid">
          <div className="lmg-footer-brand">
            <Wordmark size={20} />
            <p>Where quality brands meet iconic influence.</p>
            <div className="lmg-footer-social">
              <a href="#" aria-label="Instagram"><Icon name="instagram" size={18} /></a>
              <a href="#" aria-label="YouTube"><Icon name="youtube" size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
              <a href="#" aria-label="X / Twitter"><Icon name="twitter" size={18} /></a>
            </div>
          </div>
          <div>
            <div className="lmg-footer-h">For Brands</div>
            <a href="#">Strategic Campaigns</a>
            <a href="#">Influencer Sourcing</a>
            <a href="#">Performance Analytics</a>
            <a href="#">Case Studies</a>
          </div>
          <div>
            <div className="lmg-footer-h">For Influencers</div>
            <a href="#">Personal Branding</a>
            <a href="#">Monetization</a>
            <a href="#">Apply to Join</a>
            <a href="#">Creator Resources</a>
          </div>
          <div>
            <div className="lmg-footer-h">Company</div>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Press</a>
            <a href="#">Careers</a>
          </div>
        </div>
        <div className="lmg-footer-fine">
          <span>© 2025 LMG Media. All rights reserved.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
