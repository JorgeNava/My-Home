import BouncyText from "./_componets/bouncy-text";
import "./style.scss";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="title">My Home</h1>
            <BouncyText
              text="A software developer site to share thoughts,"
              fontSize="hero-size"
              bounceDuration="0.5s
            "
            />
            <BouncyText
              text="ideas and share daily life moments."
              fontSize="hero-size"
              bounceDuration="0.5s
            "
            />
          </div>
        </div>
      </section>
    </main>
  );
}
