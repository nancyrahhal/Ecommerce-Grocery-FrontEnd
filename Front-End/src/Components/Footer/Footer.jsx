import "./Footer.css";
const Footer = () => {
  return (
    <footer path="/about">
      <div className="footerTest">
        <div id="footerTest">
          <div className="footerWrap">
            <div className="toe">
              <h3>Our Mission:</h3>
              <h5>
                What we wanted to achieve throughout this website was helping
                customers search for what grocery,from any store they want,from
                anywhere they want{" "}
              </h5>
            </div>
            <div className="toe">
              <h3>About</h3>
              <p>
                We are a beginner programming team, TEAM AMA,currently members
                of codi 10th cohort
              </p>
            </div>
            <div className="toe">
              <h3>Follow</h3>
              <div id="social">
                <a id="fb" href="#" title="Facebook"></a>
                <a id="twitter" href="#" title="Twitter"></a>
                <a id="blog" href="#" title="Blog"></a>
                <a id="pinterest" href="#" title="Pinterest"></a>
                <a id="instagram" href="#" title="Instagram"></a>
                <a id="ravelry" href="#" title="Ravelry"></a>
                <a id="rss" href="#" title="RSS"></a>
              </div>
            </div>
          </div>
        </div>
        <div id="legal">
          <p>we have no copy right here</p>
          <p>as if we have anything to be stolen lol</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
