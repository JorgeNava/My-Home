import { headers } from "next/headers";
import BouncyText from "./_componets/bouncy-text";
import FloatingYoutubePlayer from "./_componets/youtube-player";

import "./style.scss";

export default function Home() {
  const userAgent = headers().get("user-agent") || "";
  const isMobile = /Mobi|Android/i.test(userAgent);

  return (
    <main>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="title">My Home</h1>
            {!isMobile && (
              <>
                <BouncyText
                  text="A software developer site to share thoughts,"
                  fontSize="hero-size"
                  bounceDuration="0.5s"
                />
                <BouncyText
                  text="ideas and share daily life moments."
                  fontSize="hero-size"
                  bounceDuration="0.5s"
                />
                <FloatingYoutubePlayer playlistId="PLHzRbEzKjBGxMM2v74n2MbMM9KDRhO1Ky" />
              </>
            )}
            {isMobile && (
              <>
                <p className="phrase">A software developer site to share thoughts,</p>
                <p className="phrase">ideas and share daily life moments.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
