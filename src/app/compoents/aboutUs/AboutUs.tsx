import styles from "./aboutUs.module.css";


export default function AboutUs() {
  return (
    <>
      <h1 className={styles["about-us-container-name"]}>About us</h1>
      <div className={styles["about-us-container"]}>
        <div className={styles["about-us-container-intro"]}>
          <div className={styles["about-us-container-intro-left-part"]}>
            <h3>Our vision</h3>
            <p>
              &ldquo;We envision a world where sustainable economic systems fuel
              progress, empower communities, and protect the planet.
              <br />
              By blending innovation with equity, we aim to inspire a new
              standard of development that benefits everyone.&rdquo;
            </p>
          </div>
          <div className={styles["about-us-container-intro-right-part"]}>
            <div
              className={
                styles["about-us-container-intro-right-paart-first-image"]
              }
            >
              <img
                src=""
                className={
                  styles["about-us-container-intro-right-part-first-img"]
                }
              />
            </div>
            <div
              className={
                styles["about-us-container-intro-right-part-second-images"]
              }
            >
              <img
                src=""
                className={
                  styles["about-us-container-intro-right-part-second-imgs"]
                }
              />
              <img
                src=""
                className={
                  styles["about-us-container-intro-right-part-second-imgs"]
                }
              />
            </div>
          </div>
        </div>
        <div className={styles["about-us-container-main-part"]}>
          <p>
            At the Sustainable Economic Development and Innovation Platform, we
            are committed to fostering a future where progress and
            sustainability go hand in hand. Our mission is to create a space for
            bold ideas, open dialogue, and transformative solutions to address
            the unspoken challenges facing our world today.
          </p>
          <p>
            What We Do: Shine a Light on Overlooked Issues: We uncover and
            amplify the often-unspoken problems that hinder sustainable growth
            and innovation. Promote Collaborative Solutions: By bringing
            together thought leaders, changemakers, and innovators from diverse
            fields, we co-create strategies that drive lasting impact. Inspire
            Action: Through thought-provoking discussions, insights, and case
            studies, we empower individuals and organizations to take meaningful
            steps toward a sustainable future.
          </p>
          <p>
            Why We Exist: The challenges of our time—climate change, social
            inequities, and economic disparities—require fresh perspectives and
            creative solutions. Our platform exists to catalyze these solutions,
            sparking a global conversation that redefines what&apos;s possible
            in sustainable development and innovation. Join us in transforming
            challenges into opportunities. Together, we can build a more
            sustainable, equitable, and innovative world.
          </p>
        </div>
      </div>
    </>
  );
}
