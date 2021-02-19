import {
  SiGithub,
  SiFacebook,
  SiTwitter,
  SiLinkedin,
  SiInstagram,
} from "react-icons/si";
import "./our-team.css";

const OurTeam = () => {
  document.title = "Our Team";
  return (
    <section
      id="team"
      style={{
        marginTop: "70px", // Header Height
      }}
    >
      <div className="container">
        <div className="row justify-content-center text-center">
          <span className="header">Our Team</span>
        </div>
        <div className="row mt-4 text-center justify-content-center">
          <span className="about-team">
            Full Stack web Developers using MEARN stack
          </span>
        </div>
        <div className="teams row justify-content-center p-4">
          <div className="member col-12 col-md-6  col-lg-4 text-center ">
            <div
              className=" div-image"
              style={{
                backgroundImage: `url(images/team_Images/Alaa.jpg)`,
              }}
            >
              {/* <img className="rounded-circle img-circle" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/regaine-for-men-minoxidil-1584286450.jpg" width="100%"/> */}
            </div>
            <div className="name-div">
              <span className="name">Alaa El-Menshawy</span>
            </div>
            <div className="role-div">
              <span className="role">Leader</span>
            </div>
            <div className="about-div text-center">
              <p>
                Hi, My name is Alaa and I work in Backend and Frontend in the
                project. I am a highly motivated and Well-Qualified Web
                Developer.
              </p>
            </div>
            <div className="icons text-center">
              <a className="Link" href="https://github.com/AlaaMensh">
                <SiGithub className="icon" />
              </a>
              <a className="Link" href="https://facebook.com/lole.mashy/">
                <SiFacebook className="icon" />
              </a>
              {/* <a className="Link" href="">
                    <SiTwitter className="icon" />
                  </a> */}
              <a
                className="Link"
                href="https://www.linkedin.com/mwlite/in/alaa-el-menshawy-4565a8190"
              >
                <SiLinkedin className="icon" />
              </a>
              {/* <a className="Link" href="">
                    <SiInstagram className="icon"/>
                  </a> */}
            </div>
          </div>
          <div className=" member col-12 col-md-6  col-lg-4 text-center ">
            <div
              className=" div-image"
              style={{
                backgroundImage: `url(images/team_Images/Sondos-Sami.jpg)`,
              }}
            >
              {/* <img className="rounded-circle img-circle" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/regaine-for-men-minoxidil-1584286450.jpg" width="100%"/> */}
            </div>
            <div className="name-div">
              <span className="name">Sondos Sami</span>
            </div>
            <div className="role-div">
              <span className="role">Frontend Developer</span>
            </div>
            <div className="about-div text-center">
              <p>
                Hello World, I am a Frontend Developer. I am willing to learn
                new technologies all time.
              </p>
            </div>
            <div className="icons text-center">
              <a className="Link" href="https://github.com/SondosSamii">
                <SiGithub className="icon" />
              </a>
              <a className="Link" href="https://facebook.com/SondosSamii">
                <SiFacebook className="icon" />
              </a>
              <a className="Link" href="https://twitter.com/SondosSamii">
                <SiTwitter className="icon" />
              </a>
              <a
                className="Link"
                href="https://www.linkedin.com/in/sondossamii/"
              >
                <SiLinkedin className="icon" />
              </a>
              <a className="Link" href="https://instagram.com/SondosSamii">
                <SiInstagram className="icon" />
              </a>
            </div>
          </div>
          <div className=" member col-12 col-md-6  col-lg-4 text-center ">
            <div
              className=" div-image"
              style={{
                backgroundImage: `url(images/team_Images/Moataz-Gad.jfif)`,
              }}
            >
              {/* <img className="rounded-circle img-circle" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/regaine-for-men-minoxidil-1584286450.jpg" width="100%"/> */}
            </div>
            <div className="name-div">
              <span className="name">Moataz Gad</span>
            </div>
            <div className="role-div">
              <span className="role">Backend Developer</span>
            </div>
            <div className="about-div text-center">
              <p>
                Hello there, I am a junior Fullstack Web Developer, experienced
                in MEA/RN stack technologies.
              </p>
            </div>
            <div className="icons text-center">
              <a className="Link" href="https://github.com/moatazgad">
                <SiGithub className="icon" />
              </a>
              <a className="Link" href="https://www.facebook.com/M.Gad96">
                <SiFacebook className="icon" />
              </a>
              {/* <a className="Link" href="">
                    <SiTwitter className="icon" />
                  </a> */}
              <a
                className="Link"
                href="https://www.linkedin.com/in/moataz-gad-250743183/"
              >
                <SiLinkedin className="icon" />
              </a>
              <a className="Link" href="https://www.instagram.com/moatazgaad/">
                <SiInstagram className="icon" />
              </a>
            </div>
          </div>
          <div className=" member col-12 col-md-6  col-lg-4 text-center ">
            <div
              className=" div-image"
              style={{
                backgroundImage: `url(images/team_Images/Aya-Ali.jfif)`,
              }}
            >
              {/* <img className="rounded-circle img-circle" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/regaine-for-men-minoxidil-1584286450.jpg" width="100%"/> */}
            </div>
            <div className="name-div">
              <span className="name">Aya Ali</span>
            </div>
            <div className="role-div">
              <span className="role">Frontend Developer</span>
            </div>
            <div className="about-div text-center">
              <p>
                Hello, I've been working in this project as a Frontend Developer
                and looking for the position of Entry Level Web Developer.
              </p>
            </div>
            <div className="icons text-center">
              <a className="Link" href="https://github.com/ayaali466">
                <SiGithub className="icon" />
              </a>
              <a className="Link" href="https://www.facebook.com/aya.ali466">
                <SiFacebook className="icon" />
              </a>
              <a className="Link" href="https://twitter.com/ayaali00">
                <SiTwitter className="icon" />
              </a>
              <a
                className="Link"
                href="https://www.linkedin.com/in/aya-ali-769059144/"
              >
                <SiLinkedin className="icon" />
              </a>
              <a className="Link" href="https://www.instagram.com/aya.ali466/">
                <SiInstagram className="icon" />
              </a>
            </div>
          </div>
          <div className=" member col-12 col-md-6  col-lg-4 text-center ">
            <div
              className=" div-image"
              style={{
                backgroundImage: `url(images/team_Images/Esraa-Khattab.jfif)`,
              }}
            >
              {/* <img className="rounded-circle img-circle" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/regaine-for-men-minoxidil-1584286450.jpg" width="100%"/> */}
            </div>
            <div className="name-div">
              <span className="name">Esraa Khattab</span>
            </div>
            <div className="role-div">
              <span className="role">Frontend Developer</span>
            </div>
            <div className="about-div text-center">
              <p>
                Hi, I'm Frontend Developer and Graphic Designer who is seeking
                challenging opportunity to utillize my knowledge and background
                in MEA/RN stack.
              </p>
            </div>
            <div className="icons text-center">
              <a className="Link" href="https://github.com/EsraaKhattab-hub">
                <SiGithub className="icon" />
              </a>
              <a
                className="Link"
                href="https://www.facebook.com/esraakhatab.roka/"
              >
                <SiFacebook className="icon" />
              </a>
              {/* <a className="Link" href="">
                    <SiTwitter className="icon" />
                  </a> */}
              <a
                className="Link"
                href="https://www.linkedin.com/in/esraa-khattab-323140199/"
              >
                <SiLinkedin className="icon" />
              </a>
              <a
                className="Link"
                href="https://www.instagram.com/esraa_khattab_40/"
              >
                <SiInstagram className="icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
